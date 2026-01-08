<template>
    <div>
        <div class="panel pb-0 mt-6">
            <div class="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                <h5 class="font-semibold text-lg dark:text-white-light">Balance Sheet Data List</h5>
                <div class="ltr:ml-auto rtl:mr-auto">
                    <input v-model="search" type="text" class="form-input w-auto" placeholder="Search..." />
                </div>
                <div>
                    <button class="btn btn-primary" v-if="hasPermission('Add Portfolio Balance Sheet')" type="button"
                        @click="importBalanceSheetModal = true;">
                        Import
                    </button>
                </div>
                <router-link :to="{
                    name: 'balance-sheet-add',
                    query: { type: selectedType }
                }" v-if="hasPermission('Add Portfolio Balance Sheet')" class="btn btn-primary">
                    Add
                </router-link>
            </div>

            <!-- Tabs Section -->
             <TabGroup>
                <TabList class="flex font-semibold border-b border-[#ebedf2] dark:border-[#191e3a] mb-5 whitespace-nowrap overflow-y-auto">
                    <Tab as="template">
                        <a href="javascript:;" @click="onTabChange('Monthly')"
                            class="flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary !outline-none"
                            :class="{ '!border-primary text-primary': selectedType === 'Monthly' }">
                            Monthly
                        </a>
                    </Tab>

                    <Tab as="template">
                        <a href="javascript:;" @click="onTabChange('Quarterly')"
                            class="flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary !outline-none"
                            :class="{ '!border-primary text-primary': selectedType === 'Quarterly' }">
                            Quarterly
                        </a>
                    </Tab>

                    <Tab as="template">
                        <a href="javascript:;" @click="onTabChange('Bi-Annually')"
                            class="flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary !outline-none"
                            :class="{ '!border-primary text-primary': selectedType === 'Bi-Annually' }">
                            Bi-Annually
                        </a>
                    </Tab>

                    <Tab as="template">
                        <a href="javascript:;" @click="onTabChange('Annually')"
                            class="flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary !outline-none"
                            :class="{ '!border-primary text-primary': selectedType === 'Annually' }">
                            Annually
                        </a>
                    </Tab>
                </TabList>
            </TabGroup>
            <div class="datatable">
                <!-- Loading Spinner -->
                <Loader v-if="BalanceSheetStore.loading" size="64" color="#4361ee" />
                <!-- Error -->
                <div v-else-if="BalanceSheetStore.error" class="text-red-500 text-center py-4">
                    {{ BalanceSheetStore.error }}
                </div>

                <div v-else-if="BalanceSheetStore.balanceSheets?.length === 0"
                    class="flex flex-col items-center justify-center text-red-500 py-4">
                    <IconDatabaseOff :size="30" stroke-width="1.5" />
                    <p class="mt-2">No Balance Sheet Data Found</p>
                </div>
                <!-- DataTable -->
                <vue3-datatable v-else :rows="rows" :columns="columns"
                    :totalRows="BalanceSheetStore.balanceSheets?.length" :sortable="true" sortColumn="id"
                    :search="search" skin="whitespace-nowrap bh-table-hover"
                    firstArrow='<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-badge-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 17h6l-4 -5l4 -5h-6l-4 5z" /></svg>'
                    lastArrow='<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-badge-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 7h-6l4 5l-4 5h6l4 -5z" /></svg>'
                    previousArrow='<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-caret-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 6l-6 6l6 6v-12" /></svg>'
                    nextArrow='<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-caret-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 18l6 -6l-6 -6v12" /></svg>'>
                    <template #id="data">
                        <div class="flex items-center w-max">
                            {{ data.value.sn }}
                        </div>
                    </template>
                    <template #portfolio_record="data">
                        <div class="flex items-center w-max">
                            {{ data.value.portfolio_record?.name || '-' }}
                        </div>
                    </template>
                    <template #date="data">
                        <div class="flex items-center w-max">
                            {{ formatDate(data.value.date) }}
                        </div>
                    </template>
                    <template #cash_and_equivalents="data">
                        <div class="flex items-center w-max">
                            {{ formatCurrency(data.value.cash_and_equivalents) }}
                        </div>
                    </template>
                    <template #trading_asset_securities="data">
                        <div class="flex items-center w-max">
                            {{ formatCurrency(data.value.trading_asset_securities) }}
                        </div>
                    </template>
                    <template #total_cash_and_equivalents="data">
                        <div class="flex items-center w-max">
                            {{ formatCurrency(data.value.total_cash_and_equivalents) }}
                        </div>
                    </template>
                    <template #accounts_receivable="data">
                        <div class="flex items-center w-max">
                            {{ formatCurrency(data.value.accounts_receivable) }}
                        </div>
                    </template>
                    <template #other_receivables="data">
                        <div class="flex items-center w-max">
                            {{ formatCurrency(data.value.other_receivables) }}
                        </div>
                    </template>
                    <template #total_accounts_receivable="data">
                        <div class="flex items-center w-max">
                            {{ formatCurrency(data.value.total_accounts_receivable) }}
                        </div>
                    </template>
                    <template #action="data">
                        <div class="flex items-center">
                            <div>
                                <router-link v-if="hasPermission('View Portfolio Balance Sheet')"
                                    :to="{ name: 'balance-sheet-show', params: { id: data.value.id }, query: { type: selectedType } }"
                                    class="ltr:mr-2 rtl:ml-2 group flex items-center" v-tippy="'View Details'">
                                    <IconEye :size="20" stroke-width="1.5" />
                                </router-link>
                            </div>
                            <div>
                                <router-link v-if="hasPermission('Edit Portfolio Balance Sheet')"
                                    :to="{ name: 'balance-sheet-edit', params: { id: data.value.id }, query: { type: selectedType } }"
                                    class="ltr:mr-2 rtl:ml-2 group flex items-center" v-tippy="'Edit'">
                                    <IconEdit :size="20" stroke-width="1.5" />
                                </router-link>
                            </div>
                            <div>
                                <button v-if="hasPermission('Delete Portfolio Balance Sheet')" type="button"
                                    v-tippy="'Delete'">
                                    <IconTrash :size="20" stroke-width="1.5"
                                        @click="deleteBalanceSheetModal = true; selectBalanceSheetId = data.value.id" />
                                </button>
                            </div>
                        </div>
                    </template>
                </vue3-datatable>
            </div>
        </div>
    </div>

    <!-- Delete Portfolio Balance Sheet Modal -->
    <TransitionRoot appear :show="deleteBalanceSheetModal" as="template">
        <Dialog as="div" @close="deleteBalanceSheetModal = false" class="relative z-[51]">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <DialogOverlay class="fixed inset-0 bg-[black]/60" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-start justify-center px-4 py-8">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                            <button type="button"
                                class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                @click="deleteBalanceSheetModal = false">
                                <IconX :size="20" stroke-width="1.5" />
                            </button>
                            <div
                                class="text-lg font-bold bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                Confirm your action!
                            </div>
                            <div class="p-5">
                                <span class="text-gray-500">Are you sure you want to delete this?</span>

                                <div class="flex justify-end items-center mt-8">
                                    <button type="button" @click="deleteBalanceSheetModal = false"
                                        class="btn btn-outline-danger">Cancel</button>
                                    <button type="button" @click="deleteBalanceSheet"
                                        class="btn btn-primary ltr:ml-4 rtl:mr-4">Delete</button>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>

    <!-- Import Portfolio Record Modal -->
    <TransitionRoot appear :show="importBalanceSheetModal" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-[51]">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <DialogOverlay class="fixed inset-0 bg-[black]/60" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-start justify-center px-4 py-8">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                            <button type="button"
                                class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                @click="closeModal">
                                <IconX :size="20" stroke-width="1.5" />
                            </button>
                            <div
                                class="text-lg font-bold bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                Select File to Import
                            </div>
                            <div class="p-5" v-if="importBalanceSheetModal">
                                <FileUpload ref="fileUploadRef" :show="importBalanceSheetModal"
                                    @file-selected="handleFileSelected" />

                                <!-- Error List -->
                                <div v-if="BalanceSheetStore.importErrors.length > 0" class="mt-4">
                                    <p class="text-danger font-semibold">Import Errors:</p>
                                    <ul class="list-disc list-inside text-danger">
                                        <li v-for="error in BalanceSheetStore.importErrors" :key="error.row">
                                            Row {{ error.row }}: {{ error.errors.join(', ') }}
                                        </li>
                                    </ul>
                                </div>

                                <div class="flex justify-end items-center mt-8">
                                    <button type="button" @click="closeModal"
                                        class="btn btn-outline-danger">Back</button>
                                    <button type="button" @click="downloadTemplate"
                                        class="btn btn-primary ltr:ml-4 rtl:mr-4"
                                        :disabled="BalanceSheetStore.loading">
                                        {{ BalanceSheetStore.loading ? 'Downloading...' : 'Download Template' }}
                                    </button>
                                    <button type="button" @click="importBalanceSheet"
                                        class="btn btn-primary ltr:ml-4 rtl:mr-4"
                                        :disabled="BalanceSheetStore.loading || !selectedFile">
                                        {{ BalanceSheetStore.loading ? 'Importing...' : 'Import' }}
                                    </button>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import Vue3Datatable from '@bhplugin/vue3-datatable';
import { Dialog, DialogOverlay, DialogPanel, TransitionChild, TransitionRoot, TabGroup, TabList, Tab } from '@headlessui/vue';
import { IconEdit, IconEye, IconTrash, IconX, IconDatabaseOff, IconHome, IconFileDollar, IconUser, IconPhone } from '@tabler/icons-vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { computed, ref } from 'vue';
import { useMeta } from '../../../composables/use-meta';
import { useRoute, useRouter } from 'vue-router';

import { usePermissions } from '@/composables/usePermissions';
import { onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import FileUpload from '../../components/file-upload.vue';

import { useBalanceSheetStore } from '@/stores/configuration/balance-sheet';
import Loader from '../../components/loader.vue';

const { hasPermission } = usePermissions()

useMeta({ title: 'Balance Sheet Data' });
const search = ref('');
const columns = ref([
    { field: 'id', title: '#' },
    { field: 'portfolio_record', title: 'Portfolio Record' },
    { field: 'date', title: 'Date' },
    // { field: 'type', title: 'Type' },
    // { field: 'cash_and_equivalents', title: 'Cash & Equivalents' },
    // { field: 'trading_asset_securities', title: 'Trading Asset Securities' },
    // { field: 'total_cash_and_equivalents', title: 'Total Cash & Equivalents' },
    { field: 'accounts_receivable', title: 'Accounts Receivable' },
    // { field: 'other_receivables', title: 'Other Receivables' },
    { field: 'total_accounts_receivable', title: 'Total Accounts Receivable' },
    { field: 'action', title: 'Action', sort: false },
]);

const BalanceSheetStore = useBalanceSheetStore();
const route = useRoute();
const router = useRouter();

const selectedType = ref<string>((route.query.type as string) || 'Monthly');

const onTabChange = async (type: string) => {
    selectedType.value = type;
    
    // Update URL query parameter when tab changes
    await router.replace({
        query: { ...route.query, type: type }
    });

    await BalanceSheetStore.fetchBalanceSheetData(type);
};

onMounted(() => {
    // Use the type from URL query if available
    const typeFromQuery = route.query.type as string;
    if (typeFromQuery) {
        selectedType.value = typeFromQuery;
    }
    BalanceSheetStore.fetchBalanceSheetData(selectedType.value);
});

const rows = computed(() =>
    BalanceSheetStore.balanceSheets.map((r, i) => ({ ...r, sn: i + 1 }))
);

const deleteBalanceSheetModal = ref(false)
const selectBalanceSheetId = ref(0);

const deleteBalanceSheet = async () => {
    const res = await BalanceSheetStore.deleteBalanceSheetData(selectBalanceSheetId.value);
    deleteBalanceSheetModal.value = false;

    if (res) {
        toast.success("Balance Sheet Data deleted successfully");
    } else {
        toast.error(BalanceSheetStore.deleteBalanceSheetError);
    }
}

const importBalanceSheetModal = ref(false);
const fileUploadRef = ref<InstanceType<typeof FileUpload> | null>(null);
const selectedFile = ref<File | null>(null);

const handleFileSelected = (file: File) => {
    selectedFile.value = file;
    BalanceSheetStore.importErrors = [];
};

const importBalanceSheet = async () => {
    if (!selectedFile.value) {
        toast.error('Please select a file first!');
        return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile.value);

    const res = await BalanceSheetStore.importBalanceSheetData(formData, selectedType.value);

    if (res) {
        toast.success('Balance Sheet Data imported successfully');
        importBalanceSheetModal.value = false;
        fileUploadRef.value?.clearPreview();
        selectedFile.value = null;
        BalanceSheetStore.importErrors = [];
    } else {
        toast.error('Failed to import balance sheet data');
        fileUploadRef.value?.clickClearBtn();
        selectedFile.value = null;
    }
};

const downloadTemplate = async () => {
    const res = await BalanceSheetStore.downloadTemplate();
    if (res) {
        toast.success('Template downloaded successfully');
    } else {
        toast.error(BalanceSheetStore.error || 'Failed to download template');
    }
}

const closeModal = () => {
    importBalanceSheetModal.value = false;
    BalanceSheetStore.importErrors = [];
    selectedFile.value = null;
};

// Utility functions
const formatCurrency = (value: number | null) => {
    if (value === null || value === undefined) return '-';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);
};

const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US');
};
</script>

<style></style>