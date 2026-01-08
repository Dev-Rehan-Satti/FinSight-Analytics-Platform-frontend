<template>
  <div>
    <div class="pt-5 space-y-8">
      <div class="grid xl:grid-cols-1 gap-6">
        <!-- Basic -->
        <div class="panel">
          <div class="flex items-center justify-between mb-5">
            <h5 class="font-semibold text-lg dark:text-white-light">Add Macro Economic Data</h5>
          </div>
          <div class="mb-5">
            <form class="space-y-8" @submit.prevent="submitForm">

               <!-- Date Picker Row -->
              <div class="card p-5 shadow rounded-xl">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Submission Date Picker -->
                  <div :class="{
                    'has-error': $v.form.submission_date.$error,
                    'has-success': isSubmitForm && !$v.form.submission_date.$error
                  }">
                    <label for="submission_date" class="font-semibold">Submission Date</label>
                    <flat-pickr 
                      id="submission_date"
                      v-model="form.submission_date" 
                      class="form-input mt-2" 
                      :config="datePickerConfig"
                      placeholder="Select submission date"
                    ></flat-pickr>
                    <span v-if="isSubmitForm && $v.form.submission_date.$error" class="text-danger text-sm">
                      <span v-if="$v.form.submission_date.$errors[0].$validator === 'required'">
                        Submission date is required
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <!-- Sector & Sub-Sector in Single Card -->
              <div class="card p-5 shadow rounded-xl">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <!-- Sector Dropdown -->
                  <div :class="{
                    'has-error': $v.form.sector_id.$error,
                    'has-success': isSubmitForm && !$v.form.sector_id.$error
                  }">
                    <label for="sector" class="font-semibold">Sector</label>
                    <multiselect v-model="form.sector_id" :options="sectorOptions" :searchable="true"
                      placeholder="Select a sector" label="name" track-by="id" class="custom-multiselect mt-2"
                      selected-label="" select-label="" deselect-label="" @update:modelValue="onSectorChange">
                    </multiselect>
                    <span v-if="isSubmitForm && $v.form.sector_id.$error" class="text-danger text-sm">
                      <span v-if="$v.form.sector_id.$errors[0].$validator === 'required'">
                        Sector is required
                      </span>
                    </span>
                  </div>

                  <!-- Sub-Sector Dropdown -->
                  <div :class="{
                    'has-error': $v.form.sub_sector_id.$error,
                    'has-success': isSubmitForm && !$v.form.sub_sector_id.$error
                  }">
                    <label for="sub_sector" class="font-semibold">Sub-Sector</label>
                    <multiselect v-model="form.sub_sector_id" :options="subSectorOptions" :searchable="true"
                      placeholder="Select a sub-sector" label="name" track-by="id" class="custom-multiselect mt-2"
                      :disabled="!form.sector_id" selected-label="" select-label="" deselect-label="">
                      <template v-slot:noResult>
                        <div class="multiselect__option">
                          <span class="text-gray-500">No sub-sectors available for the selected sector</span>
                        </div>
                      </template>
                      <template v-slot:noOptions>
                        <div class="multiselect__option">
                          <span class="text-gray-500">No sub-sectors available for the selected sector</span>
                        </div>
                      </template>
                    </multiselect>
                    <span v-if="isSubmitForm && $v.form.sub_sector_id.$error" class="text-danger text-sm">
                      <span v-if="$v.form.sub_sector_id.$errors[0].$validator === 'required'">
                        Sub-Sector is required
                      </span>
                    </span>
                  </div>

                </div>
              </div>


              <!-- Investment Funds -->
              <div class="card p-5 shadow rounded-xl">
                <h3 class="text-lg font-semibold mb-4">Investment Funds</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

                  <!-- mpile_high_yield_debt_fund -->
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.mpile_high_yield_debt_fund.$error, 'has-success': isSubmitForm && !$v.form.mpile_high_yield_debt_fund.$error }">
                    <label for="mpile_high_yield_debt_fund">Mpile High Yield Debt Fund</label>
                    <input id="mpile_high_yield_debt_fund" type="text" placeholder="Enter Mpile High Yield Debt Fund"
                      class="form-input" v-model="form.mpile_high_yield_debt_fund" />
                    <template v-if="isSubmitForm && !$v.form.mpile_high_yield_debt_fund.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.mpile_high_yield_debt_fund.$error">
                      <p v-for="error in $v.form.mpile_high_yield_debt_fund.$errors" :key="error.$uid"
                        class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals
                        </span>
                      </p>
                    </template>
                  </div>

                  <!-- mpile_money_market_fund -->
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.mpile_money_market_fund.$error, 'has-success': isSubmitForm && !$v.form.mpile_money_market_fund.$error }">
                    <label for="mpile_money_market_fund">Mpile Money Market Fund</label>
                    <input id="mpile_money_market_fund" type="text" placeholder="Enter Mpile Money Market Fund"
                      class="form-input" v-model="form.mpile_money_market_fund" />
                    <template v-if="isSubmitForm && !$v.form.mpile_money_market_fund.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.mpile_money_market_fund.$error">
                      <p v-for="error in $v.form.mpile_money_market_fund.$errors" :key="error.$uid"
                        class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- mpile_local_equity_fund -->
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.mpile_local_equity_fund.$error, 'has-success': isSubmitForm && !$v.form.mpile_local_equity_fund.$error }">
                    <label for="mpile_local_equity_fund">Mpile Local Equity Fund</label>
                    <input id="mpile_local_equity_fund" type="text" placeholder="Enter Mpile Local Equity Fund"
                      class="form-input" v-model="form.mpile_local_equity_fund" />
                    <template v-if="isSubmitForm && !$v.form.mpile_local_equity_fund.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.mpile_local_equity_fund.$error">
                      <p v-for="error in $v.form.mpile_local_equity_fund.$errors" :key="error.$uid"
                        class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- mpile_offshore_equity_fund -->
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.mpile_offshore_equity_fund.$error, 'has-success': isSubmitForm && !$v.form.mpile_offshore_equity_fund.$error }">
                    <label for="mpile_offshore_equity_fund">Mpile Offshore Equity Fund</label>
                    <input id="mpile_offshore_equity_fund" type="text" placeholder="Enter Mpile Offshore Equity Fund"
                      class="form-input" v-model="form.mpile_offshore_equity_fund" />
                    <template v-if="isSubmitForm && !$v.form.mpile_offshore_equity_fund.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.mpile_offshore_equity_fund.$error">
                      <p v-for="error in $v.form.mpile_offshore_equity_fund.$errors" :key="error.$uid"
                        class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals</span>
                      </p>
                    </template>
                  </div>

                  <!-- mpile_property_fund -->
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.mpile_property_fund.$error, 'has-success': isSubmitForm && !$v.form.mpile_property_fund.$error }">
                    <label for="mpile_property_fund">Mpile Property Fund</label>
                    <input id="mpile_property_fund" type="text" placeholder="Enter Mpile Property Fund"
                      class="form-input" v-model="form.mpile_property_fund" />
                    <template v-if="isSubmitForm && !$v.form.mpile_property_fund.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.mpile_property_fund.$error">
                      <p v-for="error in $v.form.mpile_property_fund.$errors" :key="error.$uid"
                        class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals</span>
                      </p>
                    </template>
                  </div>
                </div>
              </div>

              <!-- Stock Market Indices -->
              <div class="card p-5 shadow rounded-xl">
                <h3 class="text-lg font-semibold mb-4">Stock Market Indices</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- luse_free_float_index -->
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.luse_free_float_index.$error, 'has-success': isSubmitForm && !$v.form.luse_free_float_index.$error }">
                    <label for="luse_free_float_index">Luse Free Float Index</label>
                    <input id="luse_free_float_index" type="text" placeholder="Enter Luse Free Float Index"
                      class="form-input" v-model="form.luse_free_float_index" />
                    <template v-if="isSubmitForm && !$v.form.luse_free_float_index.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.luse_free_float_index.$error">
                      <p v-for="error in $v.form.luse_free_float_index.$errors" :key="error.$uid"
                        class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals</span>
                      </p>
                    </template>
                  </div>
                  <!-- luse_all_share_index -->
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.luse_all_share_index.$error, 'has-success': isSubmitForm && !$v.form.luse_all_share_index.$error }">
                    <label for="luse_all_share_index">Luse All Share Index</label>
                    <input id="luse_all_share_index" type="text" placeholder="Enter Luse All Share Index"
                      class="form-input" v-model="form.luse_all_share_index" />
                    <template v-if="isSubmitForm && !$v.form.luse_all_share_index.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.luse_all_share_index.$error">
                      <p v-for="error in $v.form.luse_all_share_index.$errors" :key="error.$uid"
                        class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals</span>
                      </p>
                    </template>
                  </div>
                </div>
              </div>

              <!-- Economic Indicators -->
              <div class="card p-5 shadow rounded-xl">
                <h3 class="text-lg font-semibold mb-4">Economic Indicators</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.stanbic_bank_zambia_composite_pmi.$error, 'has-success': isSubmitForm && !$v.form.stanbic_bank_zambia_composite_pmi.$error }">
                    <label for="stanbic_bank_zambia_composite_pmi">Stanbic Bank Zambia Composite PMI</label>
                    <input id="stanbic_bank_zambia_composite_pmi" type="text"
                      placeholder="Enter Stanbic Bank Zambia Composite PMI" class="form-input"
                      v-model="form.stanbic_bank_zambia_composite_pmi" />
                    <template v-if="isSubmitForm && !$v.form.stanbic_bank_zambia_composite_pmi.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.stanbic_bank_zambia_composite_pmi.$error">
                      <p v-for="error in $v.form.stanbic_bank_zambia_composite_pmi.$errors" :key="error.$uid"
                        class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals</span>
                      </p>
                    </template>
                  </div>
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.money_market_liquidity.$error, 'has-success': isSubmitForm && !$v.form.money_market_liquidity.$error }">
                    <label for="money_market_liquidity">Money Market Liquidity</label>
                    <input id="money_market_liquidity" type="text" placeholder="Enter Money Market Liquidity"
                      class="form-input" v-model="form.money_market_liquidity" />
                    <template v-if="isSubmitForm && !$v.form.money_market_liquidity.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.money_market_liquidity.$error">
                      <p v-for="error in $v.form.money_market_liquidity.$errors" :key="error.$uid"
                        class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals</span>
                      </p>
                    </template>
                  </div>
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.average_zmw_per_usd.$error, 'has-success': isSubmitForm && !$v.form.average_zmw_per_usd.$error }">
                    <label for="average_zmw_per_usd">Average ZMW Per USD</label>
                    <input id="average_zmw_per_usd" type="text" placeholder="Enter Average ZMW Per USD"
                      class="form-input" v-model="form.average_zmw_per_usd" />
                    <template v-if="isSubmitForm && !$v.form.average_zmw_per_usd.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.average_zmw_per_usd.$error">
                      <p v-for="error in $v.form.average_zmw_per_usd.$errors" :key="error.$uid"
                        class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals</span>
                      </p>
                    </template>
                  </div>
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.inflation.$error, 'has-success': isSubmitForm && !$v.form.inflation.$error }">
                    <label for="inflation">Inflation</label>
                    <input id="inflation" type="text" placeholder="Enter Inflation" class="form-input"
                      v-model="form.inflation" />
                    <template v-if="isSubmitForm && !$v.form.inflation.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.inflation.$error">
                      <p v-for="error in $v.form.inflation.$errors" :key="error.$uid" class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals</span>
                      </p>
                    </template>
                  </div>
                </div>
              </div>

              <!-- Interest Rates -->
              <div class="card p-5 shadow rounded-xl">
                <h3 class="text-lg font-semibold mb-4">Interest Rates</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.treasury_bill_rate_91_day.$error, 'has-success': isSubmitForm && !$v.form.treasury_bill_rate_91_day.$error }">
                    <label for="treasury_bill_rate_91_day">Treasury Bill Rate 91 Day</label>
                    <input id="treasury_bill_rate_91_day" type="text" placeholder="Enter Treasury Bill Rate 91 Day"
                      class="form-input" v-model="form.treasury_bill_rate_91_day" />
                    <template v-if="isSubmitForm && !$v.form.treasury_bill_rate_91_day.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.treasury_bill_rate_91_day.$error">
                      <p v-for="error in $v.form.treasury_bill_rate_91_day.$errors" :key="error.$uid"
                        class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals</span>
                      </p>
                    </template>
                  </div>
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.treasury_bill_rate_364_day.$error, 'has-success': isSubmitForm && !$v.form.treasury_bill_rate_364_day.$error }">
                    <label for="treasury_bill_rate_364_day">Treasury Bill Rate 364 Day</label>
                    <input id="treasury_bill_rate_364_day" type="text" placeholder="Enter Treasury Bill Rate 364 Day"
                      class="form-input" v-model="form.treasury_bill_rate_364_day" />
                    <template v-if="isSubmitForm && !$v.form.treasury_bill_rate_364_day.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.treasury_bill_rate_364_day.$error">
                      <p v-for="error in $v.form.treasury_bill_rate_364_day.$errors" :key="error.$uid"
                        class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals</span>
                      </p>
                    </template>
                  </div>
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.government_bond_rate_5_year.$error, 'has-success': isSubmitForm && !$v.form.government_bond_rate_5_year.$error }">
                    <label for="government_bond_rate_5_year">Government Bond Rate 5 Year</label>
                    <input id="government_bond_rate_5_year" type="text" placeholder="Enter Government Bond Rate 5 Year"
                      class="form-input" v-model="form.government_bond_rate_5_year" />
                    <template v-if="isSubmitForm && !$v.form.government_bond_rate_5_year.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.government_bond_rate_5_year.$error">
                      <p v-for="error in $v.form.government_bond_rate_5_year.$errors" :key="error.$uid"
                        class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals</span>
                      </p>
                    </template>
                  </div>
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.government_bond_rate_10_year.$error, 'has-success': isSubmitForm && !$v.form.government_bond_rate_10_year.$error }">
                    <label for="government_bond_rate_10_year">Government Bond Rate 10 Year</label>
                    <input id="government_bond_rate_10_year" type="text"
                      placeholder="Enter Government Bond Rate 10 Year" class="form-input"
                      v-model="form.government_bond_rate_10_year" />
                    <template v-if="isSubmitForm && !$v.form.government_bond_rate_10_year.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.government_bond_rate_10_year.$error">
                      <p v-for="error in $v.form.government_bond_rate_10_year.$errors" :key="error.$uid"
                        class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals</span>
                      </p>
                    </template>
                  </div>
                  <div class="flex-1"
                    :class="{ 'has-error': $v.form.government_bond_rate_15_year.$error, 'has-success': isSubmitForm && !$v.form.government_bond_rate_15_year.$error }">
                    <label for="government_bond_rate_15_year">Government Bond Rate 15 Year</label>
                    <input id="government_bond_rate_15_year" type="text"
                      placeholder="Enter Government Bond Rate 15 Year" class="form-input"
                      v-model="form.government_bond_rate_15_year" />
                    <template v-if="isSubmitForm && !$v.form.government_bond_rate_15_year.$error">
                      <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                    </template>
                    <template v-if="isSubmitForm && $v.form.government_bond_rate_15_year.$error">
                      <p v-for="error in $v.form.government_bond_rate_15_year.$errors" :key="error.$uid"
                        class="text-danger mt-1">
                        <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                        <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                          decimals</span>
                      </p>
                    </template>
                  </div>
                </div>
              </div>

              <!-- Commodities -->
              <div class="card p-5 shadow rounded-xl">
                <h3 class="text-lg font-semibold mb-4">Commodities</h3>
                <div class="flex-1"
                  :class="{ 'has-error': $v.form.copper_prices_usd_per_ton.$error, 'has-success': isSubmitForm && !$v.form.copper_prices_usd_per_ton.$error }">
                  <label for="copper_prices_usd_per_ton">Copper Prices USD Per Ton</label>
                  <input id="copper_prices_usd_per_ton" type="text" placeholder="Enter Copper Prices USD Per Ton"
                    class="form-input" v-model="form.copper_prices_usd_per_ton" />
                  <template v-if="isSubmitForm && !$v.form.copper_prices_usd_per_ton.$error">
                    <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                  </template>
                  <template v-if="isSubmitForm && $v.form.copper_prices_usd_per_ton.$error">
                    <p v-for="error in $v.form.copper_prices_usd_per_ton.$errors" :key="error.$uid"
                      class="text-danger mt-1">
                      <span v-if="error.$validator === 'required'">Mpile High Yield Debt Fund is required</span>
                      <span v-else-if="error.$validator === 'floatValidator'">Please enter a valid number with 2
                        decimals</span>
                    </p>
                  </template>
                </div>
              </div>

              <!-- Form Actions -->
              <div class="flex justify-end items-center mt-8 space-x-4">
                <router-link :to="{
                  name: 'macro-economic-data-list',
                  query: { 
                    type: selectedType
                  }
                }" class="group">
                  <button type="button" class="btn btn-outline-danger">Cancel</button>
                </router-link>

                <div>
                  <span v-if="!economicSubmissionStore.loading">
                    <button type="submit" class="btn btn-primary mt-0">Add</button>
                  </span>
                  <span v-else>
                    <button type="button" class="btn btn-primary mt-0" disabled>
                      Loading...
                    </button>
                  </span>
                </div>
              </div>

              <div class="text-danger mt-1" v-if="economicSubmissionStore.addEconomicSubmissionError">
                {{ economicSubmissionStore.addEconomicSubmissionError }}
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
import { useMacroEconomicDataStore } from '@/stores/economic-and-capital-market-information/macro-economic-data';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import useVuelidate from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { computed, onMounted, reactive, ref } from 'vue';
import { toast } from 'vue3-toastify';
import { useMeta } from '../../../composables/use-meta';
import { useSectorStore } from '@/stores/configuration/sectors';
import { useSubSectorStore } from '@/stores/configuration/sectors/sub-sectors';
import { useRoute, useRouter } from 'vue-router';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

useMeta({ title: 'Add Macro Economic Data' });

// Get the current route
const route = useRoute();
const router = useRouter();
// Define types for sector and sub-sector
interface Sector {
  id: number;
  name: string;
}

interface SubSector {
  id: number;
  name: string;
  sector_id: number;
}

// Initialize stores
const sectorStore = useSectorStore();
const subSectorStore = useSubSectorStore();
const economicSubmissionStore = useMacroEconomicDataStore();

// Get the type from route query, default to 'Daily' if not provided
const selectedType = ref<string>(route.query.type as string || 'Daily');

// Reactive form data with proper typing
const form = reactive({
  sector_id: null as Sector | number | null,
  sub_sector_id: null as SubSector | number | null,
  mpile_high_yield_debt_fund: '',
  mpile_money_market_fund: '',
  mpile_local_equity_fund: '',
  mpile_offshore_equity_fund: '',
  mpile_property_fund: '',
  luse_free_float_index: '',
  luse_all_share_index: '',
  stanbic_bank_zambia_composite_pmi: '',
  copper_prices_usd_per_ton: '',
  money_market_liquidity: '',
  average_zmw_per_usd: '',
  treasury_bill_rate_91_day: '',
  treasury_bill_rate_364_day: '',
  government_bond_rate_5_year: '',
  government_bond_rate_10_year: '',
  government_bond_rate_15_year: '',
  inflation: '',
  submission_date: '',
});

// Date picker configuration
const datePickerConfig = ref({
  dateFormat: 'Y-m-d',
  maxDate: new Date(),
  position: 'auto left' as
    | 'auto right'
    | 'auto left'
    | 'auto'
    | 'above'
    | 'below'
    | 'auto center'
    | 'above left'
    | 'above center'
    | 'above right'
    | 'below left'
    | 'below center'
    | 'below right',
});

const floatValidator = helpers.regex(/^\d+(\.\d{1,2})?$/);

// Validation rules
const rules = {
  form: {
    sector_id: { required },
    sub_sector_id: { required },
    mpile_high_yield_debt_fund: { required, floatValidator },
    mpile_money_market_fund: { required, floatValidator },
    mpile_local_equity_fund: { required, floatValidator },
    mpile_offshore_equity_fund: { required, floatValidator },
    mpile_property_fund: { required, floatValidator },
    luse_free_float_index: { required, floatValidator },
    luse_all_share_index: { required, floatValidator },
    stanbic_bank_zambia_composite_pmi: { required, floatValidator },
    copper_prices_usd_per_ton: { required, floatValidator },
    money_market_liquidity: { required, floatValidator },
    average_zmw_per_usd: { required, floatValidator },
    treasury_bill_rate_91_day: { required, floatValidator },
    treasury_bill_rate_364_day: { required, floatValidator },
    government_bond_rate_5_year: { required, floatValidator },
    government_bond_rate_10_year: { required, floatValidator },
    government_bond_rate_15_year: { required, floatValidator },
    inflation: { required, floatValidator },
    submission_date: { required },
  },
};

const isSubmitForm = ref(false);
const $v = useVuelidate(rules, { form });

// Fetch sectors on component mount
onMounted(async () => {
  await sectorStore.fetchSectors();
});

// Computed properties for dropdown options
const sectorOptions = computed(() => {
  return sectorStore.sectors;
});

const subSectorOptions = computed(() => {
  return subSectorStore.sectors;
});

// Handle sector change
const onSectorChange = async (sector: Sector | null) => {
  form.sub_sector_id = null; // Reset sub-sector when sector changes

  if (sector && sector.id) {
    await subSectorStore.fetchSubSectors(false, sector.id);
  }
};

// Helper function to extract ID from object or value
const extractId = (value: Sector | SubSector | number | null): number | null => {
  if (!value) return null;
  if (typeof value === 'object' && 'id' in value) {
    return value.id;
  }
  if (typeof value === 'number') {
    return value;
  }
  return null;
};

// Form submit handler
const submitForm = async () => {
  isSubmitForm.value = true;
  await $v.value.$validate();

  if (!$v.value.$invalid) {
    // Prepare data for submission - extract IDs from selected objects
    const submissionData = {
      ...form,
      // Extract just the ID values from the selected objects
      sector_id: extractId(form.sector_id),
      sub_sector_id: extractId(form.sub_sector_id),
      // Hardcoded values
      type: selectedType.value,
      submission_date: form.submission_date
    };

    try {
      const res = await economicSubmissionStore.addMacroEconomicData(submissionData);
      if (res) {
        // Reset form
        Object.assign(form, {
          sector_id: null,
          sub_sector_id: null,
          mpile_high_yield_debt_fund: '',
          mpile_money_market_fund: '',
          mpile_local_equity_fund: '',
          mpile_offshore_equity_fund: '',
          mpile_property_fund: '',
          luse_free_float_index: '',
          luse_all_share_index: '',
          stanbic_bank_zambia_composite_pmi: '',
          copper_prices_usd_per_ton: '',
          money_market_liquidity: '',
          average_zmw_per_usd: '',
          treasury_bill_rate_91_day: '',
          treasury_bill_rate_364_day: '',
          government_bond_rate_5_year: '',
          government_bond_rate_10_year: '',
          government_bond_rate_15_year: '',
          inflation: '',
        });

        // Reset validation
        $v.value.$reset();
        isSubmitForm.value = false;

        await router.push({
          name: 'macro-economic-data-list',
          query: { 
            type: selectedType.value,
          }
        });

        // Show success message
        toast.success("Macro Economic Data added successfully");
      }
    } catch (error: any) {
      if (error.response?.data) {
        toast.error(`API Error: ${error.response.data.message || 'Failed to submit data'}`);
      } else {
        toast.error('Network error or server unavailable');
      }
    }
  } else {
    toast.error('Validation Failed');
  }
};
</script>
