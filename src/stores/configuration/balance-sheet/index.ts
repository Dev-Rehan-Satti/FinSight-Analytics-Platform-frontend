import { defineStore } from 'pinia';
import api from '../../../plugins/axios'; // your Axios instance

export const useBalanceSheetStore = defineStore('balance-sheet', {
  state: () => ({
    balanceSheets: [] as Array<{
      id: number;
      date: string;
      type: string;
      portfolio_record_id: number | null;

      // ASSETS
      cash_and_equivalents: number | null;
      trading_asset_securities: number | null;
      total_cash_and_equivalents: number | null;
      accounts_receivable: number | null;
      other_receivables: number | null;
      total_accounts_receivable: number | null;
      inventory: number | null;
      prepaid_expenses: number | null;
      total_current_assets: number | null;
      gross_property_plant_equipment: number | null;
      accumulated_depreciation: number | null;
      net_property_plant_equipment: number | null;
      other_intangibles: number | null;
      long_term_assets: number | null;
      total_assets: number | null;

      // LIABILITIES
      accounts_payable: number | null;
      accrued_expenses: number | null;
      current_portion_of_long_term_debt: number | null;
      current_income_taxes_payable: number | null;
      unearned_revenue_current: number | null;
      other_current_liabilities: number | null;
      total_current_liabilities: number | null;
      long_term_debt: number | null;
      unearned_revenue_non_current: number | null;
      pension_other_post_retire_benefits: number | null;
      defined_tax_liability_non_current: number | null;
      other_non_current_liabilities: number | null;
      total_liabilities: number | null;

      // EQUITY
      common_stock: number | null;
      additional_paid_in_capital: number | null;
      retained_earnings: number | null;
      treasury_stock: number | null;
      comprehensive_income_and_other: number | null;
      total_common_equity: number | null;
      total_equity: number | null;

      // FINAL TOTAL
      total_liabilities_and_equity: number | null;
    }>,

    loading: false,

    error: '',
    addBalanceSheetError: '',
    editBalanceSheetError: '',
    showBalanceSheetError: '',
    deleteBalanceSheetError: '',

    importErrors: [] as Array<{ row: number; attribute: string; errors: string[] }>,

    hasFetchedBalanceSheets: false,
  }),

  actions: {
    // fetch balance sheet data
    async fetchBalanceSheetData(type: string | null = null) {
      this.loading = true;
      this.error = '';
      try {
        const url = type
          ? `/configuration/portfolio-record/balance-sheet/list?type=${type}`
          : `/configuration/portfolio-record/balance-sheet/list`;

        const res = await api.get(url);
        this.balanceSheets = res.data.data;
        this.hasFetchedBalanceSheets = true;
      } catch (err: any) {
        if (err.response?.status === 401) {
          this.error = 'You are not authorized to view balance sheet data.';
        } else {
          this.error = err.response?.data?.message || 'Failed to fetch balance sheet data';
        }
      } finally {
        this.loading = false;
      }
    },

    // add balance sheet data
    async addBalanceSheetData(data) {
      this.addBalanceSheetError = '';
      this.loading = true;
      try {
        const res = await api.post('/configuration/portfolio-record/balance-sheet/store', data);
        if (res.data.success) {
          this.balanceSheets.push(res.data.data);
          return res.data.success;
        } else {
          this.addBalanceSheetError = res.data.message;
          return false;
        }
      } catch (err: any) {
        this.addBalanceSheetError = err.response?.data?.message || 'Failed to add balance sheet data';
        return false;
      } finally {
        this.loading = false;
      }
    },

    // edit balance sheet data
    async editBalanceSheetData(id: number) {
      this.editBalanceSheetError = '';
      this.loading = true;
      try {
        const res = await api.get(`/configuration/portfolio-record/balance-sheet/edit/${id}`);
        if (res.data.success) {
          return res.data.data;
        } else {
          this.editBalanceSheetError = res.data.message;
          return false;
        }
      } catch (err: any) {
        this.editBalanceSheetError = err.response?.data?.message || 'Failed to edit balance sheet data';
        return false;
      } finally {
        this.loading = false;
      }
    },

    // show balance sheet data
    async showBalanceSheetData(id: number) {
      this.showBalanceSheetError = '';
      this.loading = true;
      try {
        const res = await api.get(`/configuration/portfolio-record/balance-sheet/edit/${id}`);
        if (res.data.success) {
          return res.data.data;
        } else {
          this.showBalanceSheetError = res.data.message;
          return false;
        }
      } catch (err: any) {
        this.showBalanceSheetError = err.response?.data?.message || 'Failed to show balance sheet data';
        return false;
      } finally {
        this.loading = false;
      }
    },

    // update balance sheet data
    async updateBalanceSheetData(data) {
      this.editBalanceSheetError = '';
      this.loading = true;
      try {
        const res = await api.put(`/configuration/portfolio-record/balance-sheet/update/${data.id}`, data);
        if (res.data.success) {
          this.balanceSheets = this.balanceSheets.map((sheet) =>
            sheet.id === data.id ? res.data.data : sheet
          );
          return res.data.success;
        } else {
          this.editBalanceSheetError = res.data.message;
          return false;
        }
      } catch (err: any) {
        this.editBalanceSheetError = err.response?.data?.message || 'Failed to update balance sheet data';
        return false;
      } finally {
        this.loading = false;
      }
    },

    // delete balance sheet data
    async deleteBalanceSheetData(id: number) {
      this.deleteBalanceSheetError = '';
      this.loading = true;
      try {
        const res = await api.delete(`/configuration/portfolio-record/balance-sheet/delete/${id}`);
        if (res.data.success) {
          this.balanceSheets = this.balanceSheets.filter((sheet) => sheet.id !== id);
          return res.data.success;
        } else {
          this.deleteBalanceSheetError = res.data.message;
          return false;
        }
      } catch (err: any) {
        this.deleteBalanceSheetError = err.response?.data?.message || 'Failed to delete balance sheet data';
        return false;
      } finally {
        this.loading = false;
      }
    },

    // import balance sheet data
    async importBalanceSheetData(file: FormData, type: string) {
      this.importErrors = [];
      try {
        file.append('type', type);
        const res = await api.post('/configuration/portfolio-record/balance-sheet/import', file, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log(JSON.stringify(res.data, null, 2));
        if (res.data.success) {
         if (res.data.data) {
        this.balanceSheets = res.data.data;
      } 
      // Option 2: Ya phir manually fetch karein
      else {
        await this.fetchBalanceSheetData(type);
      }
          return true;
        } else {
          this.importErrors = res.data.errors || [];
          return false;
        }
      } catch (err: any) {
        this.importErrors = err.response?.data?.errors || [];
        return false;
      } finally {
        this.loading = false;
      }
    },

    // download import template
    async downloadTemplate() {
      this.loading = true;
      this.error = '';
      try {
        const response = await api.get(
          '/configuration/portfolio-record/balance-sheet/download-import-template',
          { responseType: 'blob' }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'portfolio_balance_sheet_template.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        return true;
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Failed to download template';
        return false;
      } finally {
        this.loading = false;
      }
    },
  },
});
