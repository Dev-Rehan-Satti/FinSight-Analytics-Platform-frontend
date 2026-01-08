<template>
    <div>
        <div class="pt-5 space-y-8">
            <div class="grid xl:grid-cols-1 gap-6">
                <!-- Basic -->
                <div class="panel">
                    <div class="flex items-center justify-between mb-5">
                        <h5 class="font-semibold text-lg dark:text-white-light">Balance Sheet Data Details</h5>
                    </div>
                    <div class="space-y-8">
                        <!-- Date and Type and Portfolio in a row -->
                        <div class="card p-5 shadow rounded-xl">
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <p class="text-gray-500 text-sm">Date</p>
                                    <p class="font-medium">{{ formatDate(form.date) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Type</p>
                                    <p class="font-medium">{{ form.type }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Portfolio</p>
                                    <p class="font-medium">{{ form.portfolio_record }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- ASSETS -->
                        <div class="card p-5 shadow rounded-xl">
                            <h3 class="text-lg font-semibold mb-4">Assets</h3>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <p class="text-gray-500 text-sm">Cash and Equivalents</p>
                                    <p class="font-medium">{{ formatCurrency(form.cash_and_equivalents) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Trading Asset Securities</p>
                                    <p class="font-medium">{{ formatCurrency(form.trading_asset_securities) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Total Cash and Equivalents</p>
                                    <p class="font-medium">{{ formatCurrency(form.total_cash_and_equivalents) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Accounts Receivable</p>
                                    <p class="font-medium">{{ formatCurrency(form.accounts_receivable) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Other Receivables</p>
                                    <p class="font-medium">{{ formatCurrency(form.other_receivables) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Total Accounts Receivable</p>
                                    <p class="font-medium">{{ formatCurrency(form.total_accounts_receivable) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Inventory</p>
                                    <p class="font-medium">{{ formatCurrency(form.inventory) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Prepaid Expenses</p>
                                    <p class="font-medium">{{ formatCurrency(form.prepaid_expenses) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Total Current Assets</p>
                                    <p class="font-medium">{{ formatCurrency(form.total_current_assets) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Gross Property, Plant & Equipment</p>
                                    <p class="font-medium">{{ formatCurrency(form.gross_property_plant_equipment) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Accumulated Depreciation</p>
                                    <p class="font-medium">{{ formatCurrency(form.accumulated_depreciation) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Net Property, Plant & Equipment</p>
                                    <p class="font-medium">{{ formatCurrency(form.net_property_plant_equipment) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Other Intangibles</p>
                                    <p class="font-medium">{{ formatCurrency(form.other_intangibles) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Long Term Assets</p>
                                    <p class="font-medium">{{ formatCurrency(form.long_term_assets) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Total Assets</p>
                                    <p class="font-medium">{{ formatCurrency(form.total_assets) }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- LIABILITIES -->
                        <div class="card p-5 shadow rounded-xl">
                            <h3 class="text-lg font-semibold mb-4">Liabilities</h3>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <p class="text-gray-500 text-sm">Accounts Payable</p>
                                    <p class="font-medium">{{ formatCurrency(form.accounts_payable) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Accrued Expenses</p>
                                    <p class="font-medium">{{ formatCurrency(form.accrued_expenses) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Current Portion of Long Term Debt</p>
                                    <p class="font-medium">{{ formatCurrency(form.current_portion_of_long_term_debt) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Current Income Taxes Payable</p>
                                    <p class="font-medium">{{ formatCurrency(form.current_income_taxes_payable) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Unearned Revenue Current</p>
                                    <p class="font-medium">{{ formatCurrency(form.unearned_revenue_current) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Other Current Liabilities</p>
                                    <p class="font-medium">{{ formatCurrency(form.other_current_liabilities) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Total Current Liabilities</p>
                                    <p class="font-medium">{{ formatCurrency(form.total_current_liabilities) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Long Term Debt</p>
                                    <p class="font-medium">{{ formatCurrency(form.long_term_debt) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Unearned Revenue Non-Current</p>
                                    <p class="font-medium">{{ formatCurrency(form.unearned_revenue_non_current) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Pension Other Post Retirement Benefits</p>
                                    <p class="font-medium">{{ formatCurrency(form.pension_other_post_retire_benefits) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Defined Tax Liability Non-Current</p>
                                    <p class="font-medium">{{ formatCurrency(form.defined_tax_liability_non_current) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Other Non-Current Liabilities</p>
                                    <p class="font-medium">{{ formatCurrency(form.other_non_current_liabilities) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Total Liabilities</p>
                                    <p class="font-medium">{{ formatCurrency(form.total_liabilities) }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- EQUITY -->
                        <div class="card p-5 shadow rounded-xl">
                            <h3 class="text-lg font-semibold mb-4">Equity</h3>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <p class="text-gray-500 text-sm">Common Stock</p>
                                    <p class="font-medium">{{ formatCurrency(form.common_stock) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Additional Paid In Capital</p>
                                    <p class="font-medium">{{ formatCurrency(form.additional_paid_in_capital) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Retained Earnings</p>
                                    <p class="font-medium">{{ formatCurrency(form.retained_earnings) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Treasury Stock</p>
                                    <p class="font-medium">{{ formatCurrency(form.treasury_stock) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Comprehensive Income and Other</p>
                                    <p class="font-medium">{{ formatCurrency(form.comprehensive_income_and_other) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Total Common Equity</p>
                                    <p class="font-medium">{{ formatCurrency(form.total_common_equity) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Total Equity</p>
                                    <p class="font-medium">{{ formatCurrency(form.total_equity) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Total Liabilities and Equity</p>
                                    <p class="font-medium">{{ formatCurrency(form.total_liabilities_and_equity) }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-end items-center mt-8 space-x-4">
                        <router-link :to="{
                            name: 'balance-sheet-list',
                            query: { type: route.query.type }
                        }" class="group">
                            <button type="button" class="btn btn-outline-danger">Back</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useMeta } from '../../../composables/use-meta';
import { useBalanceSheetStore } from '@/stores/configuration/balance-sheet';

useMeta({ title: 'Balance Sheet Data Details' });

const route = useRoute()
const router = useRouter()
const balanceSheetStore = useBalanceSheetStore();

// Reactive form data matching balance sheet structure
const form = reactive({
    id: '',
    date: '',
    type: '',
    portfolio_record: '',
    portfolio_record_id: null,

    // ASSETS
    cash_and_equivalents: null as number | null,
    trading_asset_securities: null as number | null,
    total_cash_and_equivalents: null as number | null,
    accounts_receivable: null as number | null,
    other_receivables: null as number | null,
    total_accounts_receivable: null as number | null,
    inventory: null as number | null,
    prepaid_expenses: null as number | null,
    total_current_assets: null as number | null,
    gross_property_plant_equipment: null as number | null,
    accumulated_depreciation: null as number | null,
    net_property_plant_equipment: null as number | null,
    other_intangibles: null as number | null,
    long_term_assets: null as number | null,
    total_assets: null as number | null,

    // LIABILITIES
    accounts_payable: null as number | null,
    accrued_expenses: null as number | null,
    current_portion_of_long_term_debt: null as number | null,
    current_income_taxes_payable: null as number | null,
    unearned_revenue_current: null as number | null,
    other_current_liabilities: null as number | null,
    total_current_liabilities: null as number | null,
    long_term_debt: null as number | null,
    unearned_revenue_non_current: null as number | null,
    pension_other_post_retire_benefits: null as number | null,
    defined_tax_liability_non_current: null as number | null,
    other_non_current_liabilities: null as number | null,
    total_liabilities: null as number | null,

    // EQUITY
    common_stock: null as number | null,
    additional_paid_in_capital: null as number | null,
    retained_earnings: null as number | null,
    treasury_stock: null as number | null,
    comprehensive_income_and_other: null as number | null,
    total_common_equity: null as number | null,
    total_equity: null as number | null,

    // FINAL TOTAL
    total_liabilities_and_equity: null as number | null,
})

// Format currency values
const formatCurrency = (value: number | null) => {
    if (value === null || value === undefined) return '-';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}

const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US');
};

onMounted(async () => {
    const balanceSheetId = route.params.id
    balanceSheetStore.showBalanceSheetError = ''

    // Fetch the balance sheet data
    const balanceSheet = await balanceSheetStore.showBalanceSheetData(Number(balanceSheetId))

    if (balanceSheet) {
        form.id = balanceSheet.id.toString()
        form.date = balanceSheet.date
        form.type = balanceSheet.type
        form.portfolio_record = balanceSheet.portfolio_record?.name || '-'
        form.portfolio_record_id = balanceSheet.portfolio_record_id

        // ASSETS
        form.cash_and_equivalents = balanceSheet.cash_and_equivalents
        form.trading_asset_securities = balanceSheet.trading_asset_securities
        form.total_cash_and_equivalents = balanceSheet.total_cash_and_equivalents
        form.accounts_receivable = balanceSheet.accounts_receivable
        form.other_receivables = balanceSheet.other_receivables
        form.total_accounts_receivable = balanceSheet.total_accounts_receivable
        form.inventory = balanceSheet.inventory
        form.prepaid_expenses = balanceSheet.prepaid_expenses
        form.total_current_assets = balanceSheet.total_current_assets
        form.gross_property_plant_equipment = balanceSheet.gross_property_plant_equipment
        form.accumulated_depreciation = balanceSheet.accumulated_depreciation
        form.net_property_plant_equipment = balanceSheet.net_property_plant_equipment
        form.other_intangibles = balanceSheet.other_intangibles
        form.long_term_assets = balanceSheet.long_term_assets
        form.total_assets = balanceSheet.total_assets

        // LIABILITIES
        form.accounts_payable = balanceSheet.accounts_payable
        form.accrued_expenses = balanceSheet.accrued_expenses
        form.current_portion_of_long_term_debt = balanceSheet.current_portion_of_long_term_debt
        form.current_income_taxes_payable = balanceSheet.current_income_taxes_payable
        form.unearned_revenue_current = balanceSheet.unearned_revenue_current
        form.other_current_liabilities = balanceSheet.other_current_liabilities
        form.total_current_liabilities = balanceSheet.total_current_liabilities
        form.long_term_debt = balanceSheet.long_term_debt
        form.unearned_revenue_non_current = balanceSheet.unearned_revenue_non_current
        form.pension_other_post_retire_benefits = balanceSheet.pension_other_post_retire_benefits
        form.defined_tax_liability_non_current = balanceSheet.defined_tax_liability_non_current
        form.other_non_current_liabilities = balanceSheet.other_non_current_liabilities
        form.total_liabilities = balanceSheet.total_liabilities

        // EQUITY
        form.common_stock = balanceSheet.common_stock
        form.additional_paid_in_capital = balanceSheet.additional_paid_in_capital
        form.retained_earnings = balanceSheet.retained_earnings
        form.treasury_stock = balanceSheet.treasury_stock
        form.comprehensive_income_and_other = balanceSheet.comprehensive_income_and_other
        form.total_common_equity = balanceSheet.total_common_equity
        form.total_equity = balanceSheet.total_equity

        // FINAL TOTAL
        form.total_liabilities_and_equity = balanceSheet.total_liabilities_and_equity
    } else {
        await router.push({
            name: 'balance-sheet-list'
        })
        toast.error(balanceSheetStore.showBalanceSheetError || 'Balance Sheet data not found')
    }
})
</script>