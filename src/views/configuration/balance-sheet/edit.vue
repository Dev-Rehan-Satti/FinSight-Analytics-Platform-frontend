<template>
  <div>
    <div class="pt-5 space-y-8">
      <div class="grid xl:grid-cols-1 gap-6">
        <!-- Basic -->
        <div class="panel">
          <div class="flex items-center justify-between mb-5">
            <h5 class="font-semibold text-lg dark:text-white-light">Edit Balance Sheet Data</h5>
          </div>
          <div class="mb-5">
            <form class="space-y-8" @submit.prevent="submitForm">

              <!-- Date Picker Row -->
              <div class="card p-5 shadow rounded-xl">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <!-- Date Picker -->
                <div :class="{
                  'has-error': $v.form.date.$error,
                  'has-success': isSubmitForm && !$v.form.date.$error
                }">
                  <label for="date" class="font-semibold">Date</label>
                  <flat-pickr 
                    id="date"
                    v-model="form.date" 
                    class="form-input mt-2" 
                    :config="datePickerConfig"
                    placeholder="Select date"
                  ></flat-pickr>
                  <span v-if="isSubmitForm && $v.form.date.$error" class="text-danger text-sm">
                    <span v-if="$v.form.date.$errors[0].$validator === 'required'">
                      Date is required
                    </span>
                  </span>
                </div>

                <!-- Portfolio Dropdown -->
               <div :class="{
                  'has-error': $v.form.portfolio_record_id.$error,
                  'has-success': isSubmitForm && !$v.form.portfolio_record_id.$error
                }">
                  <label for="portfolio" class="font-semibold">Portfolio</label>
                  <multiselect
                    v-model="selectedPortfolio"
                    :options="portfolioOptions"
                    :searchable="true"
                    placeholder="Select a portfolio"
                    label="name"
                    track-by="id"
                    class="custom-multiselect mt-2"
                    selected-label=""
                    select-label=""
                    deselect-label=""
                    @update:modelValue="onPortfolioChange"
                  >
                    <template v-slot:noResult>
                      <div class="multiselect__option">
                        <span class="text-gray-500">No portfolios found</span>
                      </div>
                    </template>
                  </multiselect>

                  <span v-if="isSubmitForm && $v.form.portfolio_record_id.$error" class="text-danger text-sm">
                    <span v-if="$v.form.portfolio_record_id.$errors[0].$validator === 'required'">
                      Portfolio is required
                    </span>
                  </span>
                </div>
              </div>
            </div>

              <!-- ASSETS -->
              <div class="card p-5 shadow rounded-xl mb-6">
                <h3 class="text-lg font-semibold mb-4">Assets</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

                  <!-- Cash and Equivalents -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.cash_and_equivalents.$error, 
                    'has-success': isSubmitForm && !$v.form.cash_and_equivalents.$error 
                  }">
                    <label for="cash_and_equivalents">Cash and Equivalents</label>
                    <input id="cash_and_equivalents" type="text" placeholder="Cash And Equivalents" class="form-input" v-model="form.cash_and_equivalents" />
                    <template v-if="isSubmitForm && !$v.form.cash_and_equivalents.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.cash_and_equivalents.$error">
                      <p v-for="error in $v.form.cash_and_equivalents.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Cash and Equivalents is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Trading Asset Securities -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.trading_asset_securities.$error, 
                    'has-success': isSubmitForm && !$v.form.trading_asset_securities.$error 
                  }">
                    <label for="trading_asset_securities">Trading Asset Securities</label>
                    <input id="trading_asset_securities" type="text" placeholder="Trading Asset Securities" class="form-input" v-model="form.trading_asset_securities" />
                    <template v-if="isSubmitForm && !$v.form.trading_asset_securities.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.trading_asset_securities.$error">
                      <p v-for="error in $v.form.trading_asset_securities.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Trading Asset Securities is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Total Cash and Equivalents -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.total_cash_and_equivalents.$error, 
                    'has-success': isSubmitForm && !$v.form.total_cash_and_equivalents.$error 
                  }">
                    <label for="total_cash_and_equivalents">Total Cash and Equivalents</label>
                    <input id="total_cash_and_equivalents" type="text" placeholder="Total Cash And Equivalents" class="form-input" v-model="form.total_cash_and_equivalents" />
                    <template v-if="isSubmitForm && !$v.form.total_cash_and_equivalents.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.total_cash_and_equivalents.$error">
                      <p v-for="error in $v.form.total_cash_and_equivalents.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Total Cash and Equivalents is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Accounts Receivable -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.accounts_receivable.$error, 
                    'has-success': isSubmitForm && !$v.form.accounts_receivable.$error 
                  }">
                    <label for="accounts_receivable">Accounts Receivable</label>
                    <input id="accounts_receivable" type="text" placeholder="Accounts Receivable" class="form-input" v-model="form.accounts_receivable" />
                    <template v-if="isSubmitForm && !$v.form.accounts_receivable.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.accounts_receivable.$error">
                      <p v-for="error in $v.form.accounts_receivable.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Accounts Receivable is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Other Receivables -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.other_receivables.$error, 
                    'has-success': isSubmitForm && !$v.form.other_receivables.$error 
                  }">
                    <label for="other_receivables">Other Receivables</label>
                    <input id="other_receivables" type="text" placeholder="Other Receivables" class="form-input" v-model="form.other_receivables" />
                    <template v-if="isSubmitForm && !$v.form.other_receivables.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.other_receivables.$error">
                      <p v-for="error in $v.form.other_receivables.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Other Receivables is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Total Accounts Receivable -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.total_accounts_receivable.$error, 
                    'has-success': isSubmitForm && !$v.form.total_accounts_receivable.$error 
                  }">
                    <label for="total_accounts_receivable">Total Accounts Receivable</label>
                    <input id="total_accounts_receivable" type="text" placeholder="Total Accounts Receivable" class="form-input" v-model="form.total_accounts_receivable" />
                    <template v-if="isSubmitForm && !$v.form.total_accounts_receivable.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.total_accounts_receivable.$error">
                      <p v-for="error in $v.form.total_accounts_receivable.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Total Accounts Receivable is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Inventory -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.inventory.$error, 
                    'has-success': isSubmitForm && !$v.form.inventory.$error 
                  }">
                    <label for="inventory">Inventory</label>
                    <input id="inventory" type="text" placeholder="Inventory" class="form-input" v-model="form.inventory" />
                    <template v-if="isSubmitForm && !$v.form.inventory.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.inventory.$error">
                      <p v-for="error in $v.form.inventory.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Inventory is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Prepaid Expenses -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.prepaid_expenses.$error, 
                    'has-success': isSubmitForm && !$v.form.prepaid_expenses.$error 
                  }">
                    <label for="prepaid_expenses">Prepaid Expenses</label>
                    <input id="prepaid_expenses" type="text" placeholder="Prepaid Expenses" class="form-input" v-model="form.prepaid_expenses" />
                    <template v-if="isSubmitForm && !$v.form.prepaid_expenses.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.prepaid_expenses.$error">
                      <p v-for="error in $v.form.prepaid_expenses.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Prepaid Expenses is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Total Current Assets -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.total_current_assets.$error, 
                    'has-success': isSubmitForm && !$v.form.total_current_assets.$error 
                  }">
                    <label for="total_current_assets">Total Current Assets</label>
                    <input id="total_current_assets" type="text" placeholder="Total Current Assets" class="form-input" v-model="form.total_current_assets" />
                    <template v-if="isSubmitForm && !$v.form.total_current_assets.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.total_current_assets.$error">
                      <p v-for="error in $v.form.total_current_assets.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Total Current Assets is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Gross Property, Plant & Equipment -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.gross_property_plant_equipment.$error, 
                    'has-success': isSubmitForm && !$v.form.gross_property_plant_equipment.$error 
                  }">
                    <label for="gross_property_plant_equipment">Gross Property, Plant & Equipment</label>
                    <input id="gross_property_plant_equipment" type="text" placeholder="Gross Property Plant & Equipment" class="form-input" v-model="form.gross_property_plant_equipment" />
                    <template v-if="isSubmitForm && !$v.form.gross_property_plant_equipment.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.gross_property_plant_equipment.$error">
                      <p v-for="error in $v.form.gross_property_plant_equipment.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Gross Property, Plant & Equipment is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Accumulated Depreciation -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.accumulated_depreciation.$error, 
                    'has-success': isSubmitForm && !$v.form.accumulated_depreciation.$error 
                  }">
                    <label for="accumulated_depreciation">Accumulated Depreciation</label>
                    <input id="accumulated_depreciation" type="text" placeholder="Accumulated Depreciation" class="form-input" v-model="form.accumulated_depreciation" />
                    <template v-if="isSubmitForm && !$v.form.accumulated_depreciation.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.accumulated_depreciation.$error">
                      <p v-for="error in $v.form.accumulated_depreciation.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Accumulated Depreciation is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Net Property, Plant & Equipment -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.net_property_plant_equipment.$error, 
                    'has-success': isSubmitForm && !$v.form.net_property_plant_equipment.$error 
                  }">
                    <label for="net_property_plant_equipment">Net Property, Plant & Equipment</label>
                    <input id="net_property_plant_equipment" type="text" placeholder="Net Property Plant & Equipment" class="form-input" v-model="form.net_property_plant_equipment" />
                    <template v-if="isSubmitForm && !$v.form.net_property_plant_equipment.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.net_property_plant_equipment.$error">
                      <p v-for="error in $v.form.net_property_plant_equipment.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Net Property, Plant & Equipment is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Other Intangibles -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.other_intangibles.$error, 
                    'has-success': isSubmitForm && !$v.form.other_intangibles.$error 
                  }">
                    <label for="other_intangibles">Other Intangibles</label>
                    <input id="other_intangibles" type="text" placeholder="Other Intangibles" class="form-input" v-model="form.other_intangibles" />
                    <template v-if="isSubmitForm && !$v.form.other_intangibles.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.other_intangibles.$error">
                      <p v-for="error in $v.form.other_intangibles.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Other Intangibles is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Long Term Assets -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.long_term_assets.$error, 
                    'has-success': isSubmitForm && !$v.form.long_term_assets.$error 
                  }">
                    <label for="long_term_assets">Long Term Assets</label>
                    <input id="long_term_assets" type="text" placeholder="Long Term Assets" class="form-input" v-model="form.long_term_assets" />
                    <template v-if="isSubmitForm && !$v.form.long_term_assets.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.long_term_assets.$error">
                      <p v-for="error in $v.form.long_term_assets.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Long Term Assets is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Total Assets -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.total_assets.$error, 
                    'has-success': isSubmitForm && !$v.form.total_assets.$error 
                  }">
                    <label for="total_assets">Total Assets</label>
                    <input id="total_assets" type="text" placeholder="Total Assets" class="form-input" v-model="form.total_assets" />
                    <template v-if="isSubmitForm && !$v.form.total_assets.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.total_assets.$error">
                      <p v-for="error in $v.form.total_assets.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Total Assets is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>
                </div>
              </div>

              <!-- LIABILITIES -->
              <div class="card p-5 shadow rounded-xl mb-6">
                <h3 class="text-lg font-semibold mb-4">Liabilities</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

                  <!-- Accounts Payable -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.accounts_payable.$error, 
                    'has-success': isSubmitForm && !$v.form.accounts_payable.$error 
                  }">
                    <label for="accounts_payable">Accounts Payable</label>
                    <input id="accounts_payable" type="text" placeholder="Accounts Payable" class="form-input" v-model="form.accounts_payable" />
                    <template v-if="isSubmitForm && !$v.form.accounts_payable.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.accounts_payable.$error">
                      <p v-for="error in $v.form.accounts_payable.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Accounts Payable is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Accrued Expenses -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.accrued_expenses.$error, 
                    'has-success': isSubmitForm && !$v.form.accrued_expenses.$error 
                  }">
                    <label for="accrued_expenses">Accrued Expenses</label>
                    <input id="accrued_expenses" type="text" placeholder="Accrued Expenses" class="form-input" v-model="form.accrued_expenses" />
                    <template v-if="isSubmitForm && !$v.form.accrued_expenses.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.accrued_expenses.$error">
                      <p v-for="error in $v.form.accrued_expenses.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Accrued Expenses is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Current Portion of Long Term Debt -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.current_portion_of_long_term_debt.$error, 
                    'has-success': isSubmitForm && !$v.form.current_portion_of_long_term_debt.$error 
                  }">
                    <label for="current_portion_of_long_term_debt">Current Portion of Long Term Debt</label>
                    <input id="current_portion_of_long_term_debt" type="text" placeholder="Current Portion of Long Term Debt" class="form-input" v-model="form.current_portion_of_long_term_debt" />
                    <template v-if="isSubmitForm && !$v.form.current_portion_of_long_term_debt.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.current_portion_of_long_term_debt.$error">
                      <p v-for="error in $v.form.current_portion_of_long_term_debt.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Current Portion of Long Term Debt is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Current Income Taxes Payable -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.current_income_taxes_payable.$error, 
                    'has-success': isSubmitForm && !$v.form.current_income_taxes_payable.$error 
                  }">
                    <label for="current_income_taxes_payable">Current Income Taxes Payable</label>
                    <input id="current_income_taxes_payable" type="text" placeholder="Current Income Taxes Payable" class="form-input" v-model="form.current_income_taxes_payable" />
                    <template v-if="isSubmitForm && !$v.form.current_income_taxes_payable.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.current_income_taxes_payable.$error">
                      <p v-for="error in $v.form.current_income_taxes_payable.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Current Income Taxes Payable is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Unearned Revenue Current -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.unearned_revenue_current.$error, 
                    'has-success': isSubmitForm && !$v.form.unearned_revenue_current.$error 
                  }">
                    <label for="unearned_revenue_current">Unearned Revenue Current</label>
                    <input id="unearned_revenue_current" type="text" placeholder="Unearned Revenue Current" class="form-input" v-model="form.unearned_revenue_current" />
                    <template v-if="isSubmitForm && !$v.form.unearned_revenue_current.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.unearned_revenue_current.$error">
                      <p v-for="error in $v.form.unearned_revenue_current.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Unearned Revenue Current is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Other Current Liabilities -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.other_current_liabilities.$error, 
                    'has-success': isSubmitForm && !$v.form.other_current_liabilities.$error 
                  }">
                    <label for="other_current_liabilities">Other Current Liabilities</label>
                    <input id="other_current_liabilities" type="text" placeholder="Other Current Liabilities" class="form-input" v-model="form.other_current_liabilities" />
                    <template v-if="isSubmitForm && !$v.form.other_current_liabilities.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.other_current_liabilities.$error">
                      <p v-for="error in $v.form.other_current_liabilities.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Other Current Liabilities is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Total Current Liabilities -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.total_current_liabilities.$error, 
                    'has-success': isSubmitForm && !$v.form.total_current_liabilities.$error 
                  }">
                    <label for="total_current_liabilities">Total Current Liabilities</label>
                    <input id="total_current_liabilities" type="text" placeholder="Total Current Liabilities" class="form-input" v-model="form.total_current_liabilities" />
                    <template v-if="isSubmitForm && !$v.form.total_current_liabilities.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.total_current_liabilities.$error">
                      <p v-for="error in $v.form.total_current_liabilities.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Total Current Liabilities is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Long Term Debt -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.long_term_debt.$error, 
                    'has-success': isSubmitForm && !$v.form.long_term_debt.$error 
                  }">
                    <label for="long_term_debt">Long Term Debt</label>
                    <input id="long_term_debt" type="text" placeholder="Long Term Debt" class="form-input" v-model="form.long_term_debt" />
                    <template v-if="isSubmitForm && !$v.form.long_term_debt.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.long_term_debt.$error">
                      <p v-for="error in $v.form.long_term_debt.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Long Term Debt is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Unearned Revenue Non-Current -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.unearned_revenue_non_current.$error, 
                    'has-success': isSubmitForm && !$v.form.unearned_revenue_non_current.$error 
                  }">
                    <label for="unearned_revenue_non_current">Unearned Revenue Non-Current</label>
                    <input id="unearned_revenue_non_current" type="text" placeholder="Unearned Revenue Non-Current" class="form-input" v-model="form.unearned_revenue_non_current" />
                    <template v-if="isSubmitForm && !$v.form.unearned_revenue_non_current.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.unearned_revenue_non_current.$error">
                      <p v-for="error in $v.form.unearned_revenue_non_current.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Unearned Revenue Non-Current is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Pension Other Post Retirement Benefits -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.pension_other_post_retire_benefits.$error, 
                    'has-success': isSubmitForm && !$v.form.pension_other_post_retire_benefits.$error 
                  }">
                    <label for="pension_other_post_retire_benefits">Pension Other Post Retirement Benefits</label>
                    <input id="pension_other_post_retire_benefits" type="text" placeholder="Pension Other Post Retirement Benefits" class="form-input" v-model="form.pension_other_post_retire_benefits" />
                    <template v-if="isSubmitForm && !$v.form.pension_other_post_retire_benefits.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.pension_other_post_retire_benefits.$error">
                      <p v-for="error in $v.form.pension_other_post_retire_benefits.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Pension Other Post Retirement Benefits is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Defined Tax Liability Non-Current -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.defined_tax_liability_non_current.$error, 
                    'has-success': isSubmitForm && !$v.form.defined_tax_liability_non_current.$error 
                  }">
                    <label for="defined_tax_liability_non_current">Defined Tax Liability Non-Current</label>
                    <input id="defined_tax_liability_non_current" type="text" placeholder="Defined Tax Liability Non-Current" class="form-input" v-model="form.defined_tax_liability_non_current" />
                    <template v-if="isSubmitForm && !$v.form.defined_tax_liability_non_current.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.defined_tax_liability_non_current.$error">
                      <p v-for="error in $v.form.defined_tax_liability_non_current.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Defined Tax Liability Non-Current is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Other Non-Current Liabilities -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.other_non_current_liabilities.$error, 
                    'has-success': isSubmitForm && !$v.form.other_non_current_liabilities.$error 
                  }">
                    <label for="other_non_current_liabilities">Other Non-Current Liabilities</label>
                    <input id="other_non_current_liabilities" type="text" placeholder="Other Non-Current Liabilities" class="form-input" v-model="form.other_non_current_liabilities" />
                    <template v-if="isSubmitForm && !$v.form.other_non_current_liabilities.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.other_non_current_liabilities.$error">
                      <p v-for="error in $v.form.other_non_current_liabilities.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Other Non-Current Liabilities is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Total Liabilities -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.total_liabilities.$error, 
                    'has-success': isSubmitForm && !$v.form.total_liabilities.$error 
                  }">
                    <label for="total_liabilities">Total Liabilities</label>
                    <input id="total_liabilities" type="text" placeholder="Total Liabilities" class="form-input" v-model="form.total_liabilities" />
                    <template v-if="isSubmitForm && !$v.form.total_liabilities.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.total_liabilities.$error">
                      <p v-for="error in $v.form.total_liabilities.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Total Liabilities is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>
                </div>
              </div>

              <!-- EQUITY -->
              <div class="card p-5 shadow rounded-xl mb-6">
                <h3 class="text-lg font-semibold mb-4">Equity</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

                  <!-- Common Stock -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.common_stock.$error, 
                    'has-success': isSubmitForm && !$v.form.common_stock.$error 
                  }">
                    <label for="common_stock">Common Stock</label>
                    <input id="common_stock" type="text" placeholder="Common Stock" class="form-input" v-model="form.common_stock" />
                    <template v-if="isSubmitForm && !$v.form.common_stock.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.common_stock.$error">
                      <p v-for="error in $v.form.common_stock.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Common Stock is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Additional Paid In Capital -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.additional_paid_in_capital.$error, 
                    'has-success': isSubmitForm && !$v.form.additional_paid_in_capital.$error 
                  }">
                    <label for="additional_paid_in_capital">Additional Paid In Capital</label>
                    <input id="additional_paid_in_capital" type="text" placeholder="Additional Paid In Capital" class="form-input" v-model="form.additional_paid_in_capital" />
                    <template v-if="isSubmitForm && !$v.form.additional_paid_in_capital.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.additional_paid_in_capital.$error">
                      <p v-for="error in $v.form.additional_paid_in_capital.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Additional Paid In Capital is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Retained Earnings -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.retained_earnings.$error, 
                    'has-success': isSubmitForm && !$v.form.retained_earnings.$error 
                  }">
                    <label for="retained_earnings">Retained Earnings</label>
                    <input id="retained_earnings" type="text" placeholder="Retained Earnings" class="form-input" v-model="form.retained_earnings" />
                    <template v-if="isSubmitForm && !$v.form.retained_earnings.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.retained_earnings.$error">
                      <p v-for="error in $v.form.retained_earnings.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Retained Earnings is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Treasury Stock -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.treasury_stock.$error, 
                    'has-success': isSubmitForm && !$v.form.treasury_stock.$error 
                  }">
                    <label for="treasury_stock">Treasury Stock</label>
                    <input id="treasury_stock" type="text" placeholder="Treasury Stock" class="form-input" v-model="form.treasury_stock" />
                    <template v-if="isSubmitForm && !$v.form.treasury_stock.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.treasury_stock.$error">
                      <p v-for="error in $v.form.treasury_stock.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Treasury Stock is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Comprehensive Income and Other -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.comprehensive_income_and_other.$error, 
                    'has-success': isSubmitForm && !$v.form.comprehensive_income_and_other.$error 
                  }">
                    <label for="comprehensive_income_and_other">Comprehensive Income and Other</label>
                    <input id="comprehensive_income_and_other" type="text" placeholder="Comprehensive Income and Other" class="form-input" v-model="form.comprehensive_income_and_other" />
                    <template v-if="isSubmitForm && !$v.form.comprehensive_income_and_other.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.comprehensive_income_and_other.$error">
                      <p v-for="error in $v.form.comprehensive_income_and_other.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Comprehensive Income and Other is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Total Common Equity -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.total_common_equity.$error, 
                    'has-success': isSubmitForm && !$v.form.total_common_equity.$error 
                  }">
                    <label for="total_common_equity">Total Common Equity</label>
                    <input id="total_common_equity" type="text" placeholder="Total Common Equity" class="form-input" v-model="form.total_common_equity" />
                    <template v-if="isSubmitForm && !$v.form.total_common_equity.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.total_common_equity.$error">
                      <p v-for="error in $v.form.total_common_equity.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Total Common Equity is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Total Equity -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.total_equity.$error, 
                    'has-success': isSubmitForm && !$v.form.total_equity.$error 
                  }">
                    <label for="total_equity">Total Equity</label>
                    <input id="total_equity" type="text" placeholder="Total Equity" class="form-input" v-model="form.total_equity" />
                    <template v-if="isSubmitForm && !$v.form.total_equity.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.total_equity.$error">
                      <p v-for="error in $v.form.total_equity.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Total Equity is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- Total Liabilities and Equity -->
                  <div class="flex-1" :class="{ 
                    'has-error': $v.form.total_liabilities_and_equity.$error, 
                    'has-success': isSubmitForm && !$v.form.total_liabilities_and_equity.$error 
                  }">
                    <label for="total_liabilities_and_equity">Total Liabilities and Equity</label>
                    <input id="total_liabilities_and_equity" type="text" placeholder="Total Liabilities and Equity" class="form-input" v-model="form.total_liabilities_and_equity" />
                    <template v-if="isSubmitForm && !$v.form.total_liabilities_and_equity.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.total_liabilities_and_equity.$error">
                      <p v-for="error in $v.form.total_liabilities_and_equity.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Total Liabilities and Equity is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2 decimals</span>
                      </p>
                    </template>
                  </div>
                </div>
              </div>

              <!-- Form Actions -->
              <div class="flex justify-end items-center mt-8 space-x-4">
                <router-link :to="{
                  name: 'balance-sheet-list',
                  query: { type: selectedType }
                }" class="group">
                  <button type="button" class="btn btn-outline-danger">Cancel</button>
                </router-link>

                <div>
                  <span v-if="!balanceSheetStore.loading">
                    <button type="submit" class="btn btn-primary mt-0">Update</button>
                  </span>
                  <span v-else>
                    <button type="button" class="btn btn-primary mt-0" disabled>
                      Loading...
                    </button>
                  </span>
                </div>
              </div>

              <div class="text-danger mt-1" v-if="balanceSheetStore.editBalanceSheetError">
                {{ balanceSheetStore.editBalanceSheetError }}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { appRouter } from '@/router';
import { useBalanceSheetStore } from '@/stores/configuration/balance-sheet';
import { useListedCompanyInformationStore } from '@/stores/configuration/portfolio-record/listed-company-information';
import { usePrivateCompanyInformationStore } from '@/stores/configuration/portfolio-record/private-company-information';
import useVuelidate from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { reactive, ref, onMounted, computed } from 'vue';
import { toast } from 'vue3-toastify';
import { useMeta } from '../../../composables/use-meta';
import { useRoute, useRouter } from 'vue-router';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';

useMeta({ title: 'Edit Balance Sheet Data' });

// Get the current route
const route = useRoute();
const router = useRouter();

// Initialize store
const balanceSheetStore = useBalanceSheetStore();
const listedStore = useListedCompanyInformationStore();
const privateStore = usePrivateCompanyInformationStore();

// Get the type from route query, default to 'Monthly' if not provided
const selectedType = ref<string>(route.query.type as string || 'Monthly');

// Float validator for numbers with 2 decimal places
const floatValidator = helpers.regex(/^\d+(\.\d{1,2})?$/);

// Define interface for portfolio option
interface PortfolioOption {
  id: number;
  name: string;
}

// Separate reactive property for Multiselect
const selectedPortfolio = ref<PortfolioOption | null>(null);

// Reactive form data matching the balance sheet structure
const form = reactive({
  id: '',
  date: '',
  type: selectedType.value,
  portfolio_record_id: null as number | null,

  // ASSETS
  cash_and_equivalents: '',
  trading_asset_securities: '',
  total_cash_and_equivalents: '',
  accounts_receivable: '',
  other_receivables: '',
  total_accounts_receivable: '',
  inventory: '',
  prepaid_expenses: '',
  total_current_assets: '',
  gross_property_plant_equipment: '',
  accumulated_depreciation: '',
  net_property_plant_equipment: '',
  other_intangibles: '',
  long_term_assets: '',
  total_assets: '',

  // LIABILITIES
  accounts_payable: '',
  accrued_expenses: '',
  current_portion_of_long_term_debt: '',
  current_income_taxes_payable: '',
  unearned_revenue_current: '',
  other_current_liabilities: '',
  total_current_liabilities: '',
  long_term_debt: '',
  unearned_revenue_non_current: '',
  pension_other_post_retire_benefits: '',
  defined_tax_liability_non_current: '',
  other_non_current_liabilities: '',
  total_liabilities: '',

  // EQUITY
  common_stock: '',
  additional_paid_in_capital: '',
  retained_earnings: '',
  treasury_stock: '',
  comprehensive_income_and_other: '',
  total_common_equity: '',
  total_equity: '',

  // FINAL TOTAL
  total_liabilities_and_equity: '',
});

// Portfolio change handler
const onPortfolioChange = (selectedOption: PortfolioOption | null) => {
  form.portfolio_record_id = selectedOption ? selectedOption.id : null;
};

// Fetch portfolio records
const fetchPortfolioRecords = async () => {
  await listedStore.fetchListedCompanyInformation();
  await privateStore.fetchPrivateCompanyInformation();
};

// Combine portfolios that are "listed" and "private"
const portfolioOptions = computed(() => {
  const listed = listedStore.portfolioRecords?.map(p => ({
    id: p.id,
    name: `${p.name} (Listed)`
  })) || [];

  const privateOnes = privateStore.portfolioRecords?.map(p => ({
    id: p.id,
    name: `${p.name} (Private)`
  })) || [];

  return [...listed, ...privateOnes];
});

// Find portfolio option by ID
const findPortfolioOptionById = (id: number) => {
  return portfolioOptions.value.find(option => option.id === id);
};

// Date picker configuration
const datePickerConfig = ref({
  dateFormat: 'Y-m-d',
  maxDate: new Date(),
  position: 'auto left' as const,
});

// Validation rules - all fields are required and must be valid numbers
const rules = {
  form: {
    date: { required },
    type: { required },
    portfolio_record_id: {
      required,
      $validator: (value: number | null) => {
        return value !== null && value !== undefined;
      },
      $message: 'Portfolio is required'
    },
    // ASSETS
    cash_and_equivalents: { required, floatValidator },
    trading_asset_securities: { required, floatValidator },
    total_cash_and_equivalents: { required, floatValidator },
    accounts_receivable: { required, floatValidator },
    other_receivables: { required, floatValidator },
    total_accounts_receivable: { required, floatValidator },
    inventory: { required, floatValidator },
    prepaid_expenses: { required, floatValidator },
    total_current_assets: { required, floatValidator },
    gross_property_plant_equipment: { required, floatValidator },
    accumulated_depreciation: { required, floatValidator },
    net_property_plant_equipment: { required, floatValidator },
    other_intangibles: { required, floatValidator },
    long_term_assets: { required, floatValidator },
    total_assets: { required, floatValidator },

    // LIABILITIES
    accounts_payable: { required, floatValidator },
    accrued_expenses: { required, floatValidator },
    current_portion_of_long_term_debt: { required, floatValidator },
    current_income_taxes_payable: { required, floatValidator },
    unearned_revenue_current: { required, floatValidator },
    other_current_liabilities: { required, floatValidator },
    total_current_liabilities: { required, floatValidator },
    long_term_debt: { required, floatValidator },
    unearned_revenue_non_current: { required, floatValidator },
    pension_other_post_retire_benefits: { required, floatValidator },
    defined_tax_liability_non_current: { required, floatValidator },
    other_non_current_liabilities: { required, floatValidator },
    total_liabilities: { required, floatValidator },

    // EQUITY
    common_stock: { required, floatValidator },
    additional_paid_in_capital: { required, floatValidator },
    retained_earnings: { required, floatValidator },
    treasury_stock: { required, floatValidator },
    comprehensive_income_and_other: { required, floatValidator },
    total_common_equity: { required, floatValidator },
    total_equity: { required, floatValidator },

    // FINAL TOTAL
    total_liabilities_and_equity: { required, floatValidator },
  },
};

const isSubmitForm = ref(false);
const $v = useVuelidate(rules, { form });

// Form submit handler
const submitForm = async () => {
  isSubmitForm.value = true;
  await $v.value.$validate();

  if (!$v.value.$invalid) {
    try {
      // Convert string values to numbers for numeric fields
      const submissionData = {
        ...form,
        id: Number(form.id),
        // Convert numeric fields from string to number
        cash_and_equivalents: form.cash_and_equivalents ? parseFloat(form.cash_and_equivalents) : null,
        trading_asset_securities: form.trading_asset_securities ? parseFloat(form.trading_asset_securities) : null,
        total_cash_and_equivalents: form.total_cash_and_equivalents ? parseFloat(form.total_cash_and_equivalents) : null,
        accounts_receivable: form.accounts_receivable ? parseFloat(form.accounts_receivable) : null,
        other_receivables: form.other_receivables ? parseFloat(form.other_receivables) : null,
        total_accounts_receivable: form.total_accounts_receivable ? parseFloat(form.total_accounts_receivable) : null,
        inventory: form.inventory ? parseFloat(form.inventory) : null,
        prepaid_expenses: form.prepaid_expenses ? parseFloat(form.prepaid_expenses) : null,
        total_current_assets: form.total_current_assets ? parseFloat(form.total_current_assets) : null,
        gross_property_plant_equipment: form.gross_property_plant_equipment ? parseFloat(form.gross_property_plant_equipment) : null,
        accumulated_depreciation: form.accumulated_depreciation ? parseFloat(form.accumulated_depreciation) : null,
        net_property_plant_equipment: form.net_property_plant_equipment ? parseFloat(form.net_property_plant_equipment) : null,
        other_intangibles: form.other_intangibles ? parseFloat(form.other_intangibles) : null,
        long_term_assets: form.long_term_assets ? parseFloat(form.long_term_assets) : null,
        total_assets: form.total_assets ? parseFloat(form.total_assets) : null,
        accounts_payable: form.accounts_payable ? parseFloat(form.accounts_payable) : null,
        accrued_expenses: form.accrued_expenses ? parseFloat(form.accrued_expenses) : null,
        current_portion_of_long_term_debt: form.current_portion_of_long_term_debt ? parseFloat(form.current_portion_of_long_term_debt) : null,
        current_income_taxes_payable: form.current_income_taxes_payable ? parseFloat(form.current_income_taxes_payable) : null,
        unearned_revenue_current: form.unearned_revenue_current ? parseFloat(form.unearned_revenue_current) : null,
        other_current_liabilities: form.other_current_liabilities ? parseFloat(form.other_current_liabilities) : null,
        total_current_liabilities: form.total_current_liabilities ? parseFloat(form.total_current_liabilities) : null,
        long_term_debt: form.long_term_debt ? parseFloat(form.long_term_debt) : null,
        unearned_revenue_non_current: form.unearned_revenue_non_current ? parseFloat(form.unearned_revenue_non_current) : null,
        pension_other_post_retire_benefits: form.pension_other_post_retire_benefits ? parseFloat(form.pension_other_post_retire_benefits) : null,
        defined_tax_liability_non_current: form.defined_tax_liability_non_current ? parseFloat(form.defined_tax_liability_non_current) : null,
        other_non_current_liabilities: form.other_non_current_liabilities ? parseFloat(form.other_non_current_liabilities) : null,
        total_liabilities: form.total_liabilities ? parseFloat(form.total_liabilities) : null,
        common_stock: form.common_stock ? parseFloat(form.common_stock) : null,
        additional_paid_in_capital: form.additional_paid_in_capital ? parseFloat(form.additional_paid_in_capital) : null,
        retained_earnings: form.retained_earnings ? parseFloat(form.retained_earnings) : null,
        treasury_stock: form.treasury_stock ? parseFloat(form.treasury_stock) : null,
        comprehensive_income_and_other: form.comprehensive_income_and_other ? parseFloat(form.comprehensive_income_and_other) : null,
        total_common_equity: form.total_common_equity ? parseFloat(form.total_common_equity) : null,
        total_equity: form.total_equity ? parseFloat(form.total_equity) : null,
        total_liabilities_and_equity: form.total_liabilities_and_equity ? parseFloat(form.total_liabilities_and_equity) : null,
      };

      const res = await balanceSheetStore.updateBalanceSheetData(submissionData);
      if (res) {
        // Reset validation
        $v.value.$reset();
        isSubmitForm.value = false;

        await router.push({
        name: 'balance-sheet-list',
        query: { type: selectedType.value } // Preserve the tab type
      });

        // Show success message
        toast.success("Balance Sheet data updated successfully");
      } else {
        toast.error(balanceSheetStore.editBalanceSheetError || 'Failed to update balance sheet data');
      }
    } catch (error: any) {
      if (error.response?.data) {
        toast.error(`API Error: ${error.response.data.message || 'Failed to update data'}`);
      } else {
        toast.error('Network error or server unavailable');
      }
    }
  } else {
    toast.error('Please fill in all required fields with valid numbers');
  }
};

// Load balance sheet data on component mount
onMounted(async () => {
  const balanceSheetId = route.params.id;
  balanceSheetStore.editBalanceSheetError = '';

  // Fetch portfolio records first
  await fetchPortfolioRecords();

  // Fetch the balance sheet data
  const balanceSheet = await balanceSheetStore.editBalanceSheetData(Number(balanceSheetId));

  if (balanceSheet) {
    // Helper function to convert null to empty string
    const formatValue = (value: any) => {
      return value === null || value === undefined ? '' : value.toString();
    };

    // Set form values from the fetched data
    form.id = balanceSheet.id.toString();
    form.date = balanceSheet.date;
    form.type = balanceSheet.type || selectedType.value;

    // Set portfolio record - use the separate selectedPortfolio ref
    if (balanceSheet.portfolio_record_id) {
      // Find the portfolio option that matches the ID from the balance sheet data
      const portfolioOption = findPortfolioOptionById(balanceSheet.portfolio_record_id);
      if (portfolioOption) {
        selectedPortfolio.value = portfolioOption;
        form.portfolio_record_id = portfolioOption.id; // Store just the ID
      }
    }

    // ASSETS
    form.cash_and_equivalents = formatValue(balanceSheet.cash_and_equivalents);
    form.trading_asset_securities = formatValue(balanceSheet.trading_asset_securities);
    form.total_cash_and_equivalents = formatValue(balanceSheet.total_cash_and_equivalents);
    form.accounts_receivable = formatValue(balanceSheet.accounts_receivable);
    form.other_receivables = formatValue(balanceSheet.other_receivables);
    form.total_accounts_receivable = formatValue(balanceSheet.total_accounts_receivable);
    form.inventory = formatValue(balanceSheet.inventory);
    form.prepaid_expenses = formatValue(balanceSheet.prepaid_expenses);
    form.total_current_assets = formatValue(balanceSheet.total_current_assets);
    form.gross_property_plant_equipment = formatValue(balanceSheet.gross_property_plant_equipment);
    form.accumulated_depreciation = formatValue(balanceSheet.accumulated_depreciation);
    form.net_property_plant_equipment = formatValue(balanceSheet.net_property_plant_equipment);
    form.other_intangibles = formatValue(balanceSheet.other_intangibles);
    form.long_term_assets = formatValue(balanceSheet.long_term_assets);
    form.total_assets = formatValue(balanceSheet.total_assets);

    // LIABILITIES
    form.accounts_payable = formatValue(balanceSheet.accounts_payable);
    form.accrued_expenses = formatValue(balanceSheet.accrued_expenses);
    form.current_portion_of_long_term_debt = formatValue(balanceSheet.current_portion_of_long_term_debt);
    form.current_income_taxes_payable = formatValue(balanceSheet.current_income_taxes_payable);
    form.unearned_revenue_current = formatValue(balanceSheet.unearned_revenue_current);
    form.other_current_liabilities = formatValue(balanceSheet.other_current_liabilities);
    form.total_current_liabilities = formatValue(balanceSheet.total_current_liabilities);
    form.long_term_debt = formatValue(balanceSheet.long_term_debt);
    form.unearned_revenue_non_current = formatValue(balanceSheet.unearned_revenue_non_current);
    form.pension_other_post_retire_benefits = formatValue(balanceSheet.pension_other_post_retire_benefits);
    form.defined_tax_liability_non_current = formatValue(balanceSheet.defined_tax_liability_non_current);
    form.other_non_current_liabilities = formatValue(balanceSheet.other_non_current_liabilities);
    form.total_liabilities = formatValue(balanceSheet.total_liabilities);

    // EQUITY
    form.common_stock = formatValue(balanceSheet.common_stock);
    form.additional_paid_in_capital = formatValue(balanceSheet.additional_paid_in_capital);
    form.retained_earnings = formatValue(balanceSheet.retained_earnings);
    form.treasury_stock = formatValue(balanceSheet.treasury_stock);
    form.comprehensive_income_and_other = formatValue(balanceSheet.comprehensive_income_and_other);
    form.total_common_equity = formatValue(balanceSheet.total_common_equity);
    form.total_equity = formatValue(balanceSheet.total_equity);

    // FINAL TOTAL
    form.total_liabilities_and_equity = formatValue(balanceSheet.total_liabilities_and_equity);
    
  } else {
    await router.push({
      name: 'balance-sheet-list',
      query: { type: selectedType.value }
    });
    toast.error(balanceSheetStore.editBalanceSheetError || 'Balance Sheet data not found');
  }
});
</script>