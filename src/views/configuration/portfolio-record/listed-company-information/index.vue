<template>
    <div>
        <div class="panel pb-0 mt-6">
            <div class="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                <h5 class="font-semibold text-lg dark:text-white-light">Listed Company Information List</h5>
                <div class="ltr:ml-auto rtl:mr-auto">
                    <input v-model="search" type="text" class="form-input w-auto" placeholder="Search..." />
                </div>
                <div>
                    <button class="btn btn-primary" v-if="hasPermission('Add Portfolio Record')" type="button"
                        @click="importPortfolioRecordModal = true;">
                        Import
                    </button>
                </div>
                <!-- <router-link :to="{name: 'listed-company-information-add'}" v-if="hasPermission('Add Portfolio Record')" class="btn btn-primary">Add</router-link> -->

                <button v-if="hasPermission('Add Portfolio Record')" class="btn btn-primary"
                    @click="openAddModal">Add</button>
            </div>

            <div class="datatable">
                <!-- Loading Spinner -->
                <Loader v-if="listedCompanyInformationStore.loading" size="64" color="#4361ee" />
                <!-- Error -->
                <div v-else-if="listedCompanyInformationStore.error" class="text-red-500 text-center py-4">
                    {{ listedCompanyInformationStore.error }}
                </div>

                <div v-else-if="listedCompanyInformationStore.portfolioRecords?.length === 0"
                    class="flex flex-col items-center justify-center text-red-500 py-4">
                    <IconDatabaseOff :size="30" stroke-width="1.5" />
                    <p class="mt-2">No Listed Company Information Found</p>
                </div>
                <!-- DataTable -->
                <vue3-datatable v-else :rows="listedCompanyInformationStore.portfolioRecords" :columns="columns"
                    :totalRows="listedCompanyInformationStore.portfolioRecords?.length" :sortable="true" sortColumn="id"
                    :search="search" skin="whitespace-nowrap bh-table-hover"
                    firstArrow='<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-badge-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 17h6l-4 -5l4 -5h-6l-4 5z" /></svg>'
                    lastArrow='<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-badge-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 7h-6l4 5l-4 5h6l4 -5z" /></svg>'
                    previousArrow='<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-caret-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 6l-6 6l6 6v-12" /></svg>'
                    nextArrow='<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-caret-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 18l6 -6l-6 -6v12" /></svg>'>
                    <template #id="data">
                        <div class="flex items-center w-max">
                            {{rows.findIndex(r => r.id === data.value.id) + 1}}
                        </div>
                    </template>
                    <template #name="data">
                        <div class="flex items-center w-max">
                            {{ data.value.name }}
                        </div>
                    </template>
                    <template #website="data">
                        <div class="flex items-center w-max">
                            {{ data.value.website ?? "N/A" }}
                        </div>
                    </template>
                    <template #sector="data">
                        <div class="flex items-center w-max">
                            {{ data.value.sector?.name || 'N/A' }}
                        </div>
                    </template>
                    
                    <template #sub_sector="data">
                        <div class="flex items-center w-max">
                            {{ data.value.sub_sector?.name || 'N/A' }}
                        </div>
                    </template>
                    <template #action="data">
                        <div class="flex items-center">
                            <div>
                                <!-- <router-link v-if="hasPermission('Edit Portfolio Record')" :to="{ name: 'listed-company-information-edit', params: { id: data.value.id } }"
                                    class="ltr:mr-2 rtl:ml-2 group flex items-center" v-tippy="'Edit'">
                                    <IconEdit :size="20" stroke-width="1.5" />
                                </router-link> -->
                                <button v-if="hasPermission('Edit Portfolio Record')"
                                    @click="openEditModal(data.value.id)"
                                    class="ltr:mr-2 rtl:ml-2 group flex items-center" v-tippy="'Edit'">
                                    <IconEdit :size="20" stroke-width="1.5" />
                                </button>
                            </div>
                            <div>
                                <button v-if="hasPermission('Delete Portfolio Record')" type="button"
                                    v-tippy="'Delete'">
                                    <IconTrash :size="20" stroke-width="1.5"
                                        @click="deletePortfolioRecordModal = true; selectPortfolioRecordId = data.value.id" />
                                </button>
                            </div>
                        </div>
                    </template>
                </vue3-datatable>
            </div>
        </div>
    </div>

    <!-- Delete Portfolio Record Modal -->
    <TransitionRoot appear :show="deletePortfolioRecordModal" as="template">
        <Dialog as="div" @close="deletePortfolioRecordModal = false" class="relative z-[51]">
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
                                @click="deletePortfolioRecordModal = false">
                                <IconX :size="20" stroke-width="1.5" />
                            </button>
                            <div
                                class="text-lg font-bold bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                Confirm your action!
                            </div>
                            <div class="p-5">
                                <span class="text-gray-500">Are you sure you want to delete this?</span>

                                <div class="flex justify-end items-center mt-8">
                                    <button type="button" @click="deletePortfolioRecordModal = false"
                                        class="btn btn-outline-danger">Cancel</button>
                                    <button type="button" @click="deletePortfolioRecord"
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
    <TransitionRoot appear :show="importPortfolioRecordModal" as="template">
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
                            <div class="p-5" v-if="importPortfolioRecordModal">
                                <FileUpload ref="fileUploadRef" :show="importPortfolioRecordModal"
                                    @file-selected="handleFileSelected" />

                                <!-- Error List -->
                                <div v-if="listedCompanyInformationStore.importErrors.length > 0" class="mt-4">
                                    <p class="text-danger font-semibold">Import Errors:</p>
                                    <ul class="list-disc list-inside text-danger">
                                        <li v-for="error in listedCompanyInformationStore.importErrors"
                                            :key="error.row">
                                            Row {{ error.row }}: {{ error.errors.join(', ') }}
                                        </li>
                                    </ul>
                                </div>

                                <div class="flex justify-end items-center mt-8">
                                    <button type="button" @click="closeModal"
                                        class="btn btn-outline-danger">Cancel</button>
                                    <button type="button" @click="downloadTemplate"
                                        class="btn btn-primary ltr:ml-4 rtl:mr-4"
                                        :disabled="listedCompanyInformationStore.loading">
                                        {{ listedCompanyInformationStore.loading ? 'Downloading...' : 'Download Template' }}
                                    </button>
                                    <button type="button" @click="importSector"
                                        class="btn btn-primary ltr:ml-4 rtl:mr-4"
                                        :disabled="listedCompanyInformationStore.loading">
                                        {{ listedCompanyInformationStore.loading ? 'Importing...' : 'Import' }}
                                    </button>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>

    <!-- Add Listed Company Information Modal -->
    <TransitionRoot appear :show="addModal" as="template">
        <Dialog as="div" @close="closeAddModal" class="relative z-[51]">
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
                            class="panel border-0 p-0 rounded-lg overflow-visible w-full max-w-2xl text-black dark:text-white-dark">
                            <button type="button"
                                class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                @click="closeAddModal">
                                <IconX :size="20" stroke-width="1.5" />
                            </button>
                            <div
                                class="text-lg font-bold bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                Add Listed Company Information
                            </div>
                            <div class="p-5">
                                <form class="space-y-5" @submit.prevent="submitAddForm">
                                <!-- Sector & Sub-Sector Section -->
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <!-- Sector Dropdown -->
                                    <div :class="{
                                        'has-error': $vAdd.form.sector_id.$error || backendErrors.sector_id,
                                        'has-success': isSubmitAddForm && !$vAdd.form.sector_id.$error && !backendErrors.sector_id
                                    }">
                                        <label for="sector" class="font-semibold">Sector</label>
                                        <multiselect
                                            v-model="addForm.sector_id"
                                            :options="sectorOptions"
                                            :searchable="true"
                                            placeholder="Select a sector"
                                            label="name"
                                            track-by="id"
                                            class="custom-multiselect mt-2"
                                            selected-label=""
                                            select-label=""
                                            deselect-label=""
                                            @update:modelValue="onSectorChangeAdd">
                                        </multiselect>
                                        <!-- Looks Good -->
                                        <template v-if="isSubmitAddForm && !$vAdd.form.sector_id.$error && !backendErrors.sector_id">
                                            <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                                        </template>
                                        <!-- Frontend errors -->
                                        <template v-if="isSubmitAddForm && $vAdd.form.sector_id.$error">
                                            <p v-for="error in $vAdd.form.sector_id.$errors" :key="error.$uid" class="text-danger mt-1">
                                                <span v-if="error.$validator === 'required'">Sector is required</span>
                                            </p>
                                        </template>
                                        <!-- Backend error -->
                                        <template v-if="backendErrors.sector_id">
                                            <p class="text-danger mt-1">{{ backendErrors.sector_id }}</p>
                                        </template>
                                    </div>
                                    <!-- Sub-Sector Dropdown -->
                                    <div :class="{
                                        'has-error': $vAdd.form.sub_sector_id.$error || backendErrors.sub_sector_id,
                                        'has-success': isSubmitAddForm && !$vAdd.form.sub_sector_id.$error && !backendErrors.sub_sector_id
                                    }">
                                        <label for="sub_sector" class="font-semibold">Sub-Sector</label>
                                        <multiselect
                                            v-model="addForm.sub_sector_id"
                                            :options="subSectorOptionsAdd"
                                            :searchable="true"
                                            placeholder="Select a sub-sector"
                                            label="name"
                                            track-by="id"
                                            class="custom-multiselect mt-2"
                                            :disabled="!addForm.sector_id"
                                            selected-label=""
                                            select-label=""
                                            deselect-label="">
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
                                        <!-- Looks Good -->
                                        <template v-if="isSubmitAddForm && !$vAdd.form.sub_sector_id.$error && !backendErrors.sub_sector_id">
                                            <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                                        </template>
                                        <!-- Frontend errors -->
                                        <template v-if="isSubmitAddForm && $vAdd.form.sub_sector_id.$error">
                                            <p v-for="error in $vAdd.form.sub_sector_id.$errors" :key="error.$uid" class="text-danger mt-1">
                                                <span v-if="error.$validator === 'required'">Sub-Sector is required</span>
                                            </p>
                                        </template>
                                        <!-- Backend error -->
                                        <template v-if="backendErrors.sub_sector_id">
                                            <p class="text-danger mt-1">{{ backendErrors.sub_sector_id }}</p>
                                        </template>
                                    </div>
                                </div>
                                <div class="flex flex-col md:flex-row gap-4">
                                    <!-- Name -->
                                    <div class="flex-1" :class="{
                                        'has-error': $vAdd.form.name.$error || backendErrors.name,
                                        'has-success': isSubmitAddForm && !$vAdd.form.name.$error && !backendErrors.name
                                    }">
                                        <label for="name">Name</label>
                                        <input id="name" type="text" placeholder="Enter Name" class="form-input"
                                            v-model="addForm.name" />

                                        <!-- Looks Good -->
                                        <template
                                            v-if="isSubmitAddForm && !$vAdd.form.name.$error && !backendErrors.name">
                                            <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                                        </template>

                                        <!-- Backend error -->
                                        <template v-if="backendErrors.name">
                                            <p class="text-danger mt-1">{{ backendErrors.name }}</p>
                                        </template>
                                    </div>

                                    <!-- Website -->
                                    <div class="flex-1" :class="{
                                        'has-error': $vAdd.form.website.$error || backendErrors.website,
                                        'has-success': isSubmitAddForm && !$vAdd.form.website.$error && !backendErrors.website
                                    }">
                                        <label for="website">Website</label>
                                        <input id="website" type="text" placeholder="Enter website"
                                            class="form-input" v-model="addForm.website" />

                                        <!-- Looks Good -->
                                        <template
                                            v-if="isSubmitAddForm && !$vAdd.form.website.$error && !backendErrors.website">
                                            <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                                        </template>

                                        <!-- Frontend errors -->
                                        <template v-if="isSubmitAddForm && $vAdd.form.website.$error">
                                            <p v-for="error in $vAdd.form.website.$errors" :key="error.$uid"
                                                class="text-danger mt-1">
                                                <span v-if="error.$validator === 'isValidUrl'">{{ error.$message
                                                    }}</span>
                                            </p>
                                        </template>

                                        <!-- Backend error -->
                                        <template v-if="backendErrors.website">
                                            <p class="text-danger mt-1">{{ backendErrors.website }}</p>
                                        </template>
                                    </div>
                                </div>

                                <div class="flex justify-end items-center mt-8 space-x-4">
                                    <button type="button" class="btn btn-outline-danger"
                                        @click="closeAddModal">Cancel</button>

                                    <div>
                                        <span v-if="!listedCompanyInformationStore.loading">
                                            <button type="submit" class="btn btn-primary mt-0">Add</button>
                                        </span>
                                        <span v-else>
                                            <button type="button" class="btn btn-primary mt-0" disabled>
                                                Loading...
                                            </button>
                                        </span>
                                    </div>
                                </div>

                                <div class="text-danger mt-1"
                                    v-if="listedCompanyInformationStore.addPortfolioRecordError">{{
                                        listedCompanyInformationStore.addPortfolioRecordError }}
                                </div>
                                </form>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
    <!-- Edit Listed Company Information Modal -->
    <TransitionRoot appear :show="editModal" as="template">
        <Dialog as="div" @close="closeEditModal" class="relative z-[51]">
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
                            class="panel border-0 p-0 rounded-lg overflow-visible w-full max-w-2xl text-black dark:text-white-dark">
                            <button type="button"
                                class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                @click="closeEditModal">
                                <IconX :size="20" stroke-width="1.5" />
                            </button>
                            <div
                                class="text-lg font-bold bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                Edit Listed Company Information
                            </div>
                            <div class="p-5">
                                <form class="space-y-5" @submit.prevent="submitEditForm">
                                <!-- Sector & Sub-Sector Section -->
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <!-- Sector Dropdown -->
                                        <div :class="{
                                            'has-error': $vEdit.form.sector_id.$error || backendErrors.sector_id,
                                            'has-success': isSubmitEditForm && !$vEdit.form.sector_id.$error && !backendErrors.sector_id
                                        }">
                                            <label for="sector" class="font-semibold">Sector</label>
                                            <multiselect 
                                                v-model="editForm.sector_id" 
                                                :options="sectorOptions" 
                                                :searchable="true"
                                                placeholder="Select a sector" 
                                                label="name" 
                                                track-by="id" 
                                                class="custom-multiselect mt-2"
                                                selected-label="" 
                                                select-label="" 
                                                deselect-label="" 
                                                @update:modelValue="onSectorChangeEdit">
                                            </multiselect>
                                            <!-- Looks Good -->
                                            <template v-if="isSubmitEditForm && !$vEdit.form.sector_id.$error && !backendErrors.sector_id">
                                                <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                                            </template>
                                            <!-- Frontend errors -->
                                            <template v-if="isSubmitEditForm && $vEdit.form.sector_id.$error">
                                                <p v-for="error in $vEdit.form.sector_id.$errors" :key="error.$uid" class="text-danger mt-1">
                                                    <span v-if="error.$validator === 'required'">Sector is required</span>
                                                </p>
                                            </template>
                                            <!-- Backend error -->
                                            <template v-if="backendErrors.sector_id">
                                                <p class="text-danger mt-1">{{ backendErrors.sector_id }}</p>
                                            </template>
                                        </div>

                                        <!-- Sub-Sector Dropdown -->
                                        <div :class="{
                                            'has-error': $vEdit.form.sub_sector_id.$error || backendErrors.sub_sector_id,
                                            'has-success': isSubmitEditForm && !$vEdit.form.sub_sector_id.$error && !backendErrors.sub_sector_id
                                        }">
                                            <label for="sub_sector" class="font-semibold">Sub-Sector</label>
                                            <multiselect 
                                                v-model="editForm.sub_sector_id" 
                                                :options="subSectorOptionsEdit" 
                                                :searchable="true"
                                                placeholder="Select a sub-sector" 
                                                label="name" 
                                                track-by="id" 
                                                class="custom-multiselect mt-2"
                                                :disabled="!editForm.sector_id" 
                                                selected-label="" 
                                                select-label="" 
                                                deselect-label="">
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
                                            <!-- Looks Good -->
                                            <template v-if="isSubmitEditForm && !$vEdit.form.sub_sector_id.$error && !backendErrors.sub_sector_id">
                                                <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                                            </template>
                                            <!-- Frontend errors -->
                                            <template v-if="isSubmitEditForm && $vEdit.form.sub_sector_id.$error">
                                                <p v-for="error in $vEdit.form.sub_sector_id.$errors" :key="error.$uid" class="text-danger mt-1">
                                                    <span v-if="error.$validator === 'required'">Sub-Sector is required</span>
                                                </p>
                                            </template>
                                            <!-- Backend error -->
                                            <template v-if="backendErrors.sub_sector_id">
                                                <p class="text-danger mt-1">{{ backendErrors.sub_sector_id }}</p>
                                            </template>
                                        </div>
                                    </div>
                                    <div class="flex flex-col md:flex-row gap-4">
                                        <!-- Name -->
                                        <div class="flex-1" :class="{
                                            'has-error': $vEdit.form.name.$error || backendErrors.name,
                                            'has-success': isSubmitEditForm && !$vEdit.form.name.$error && !backendErrors.name
                                        }">
                                            <label for="name">Name</label>
                                            <input id="name" type="text" placeholder="Enter Name" class="form-input"
                                                v-model="editForm.name" />

                                            <!-- Looks Good -->
                                            <template
                                                v-if="isSubmitEditForm && !$vEdit.form.name.$error && !backendErrors.name">
                                                <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                                            </template>

                                            <!-- Backend error -->
                                            <template v-if="backendErrors.name">
                                                <p class="text-danger mt-1">{{ backendErrors.name }}</p>
                                            </template>
                                        </div>

                                        <!-- Website -->
                                        <div class="flex-1" :class="{
                                            'has-error': $vEdit.form.website.$error || backendErrors.website,
                                            'has-success': isSubmitEditForm && !$vEdit.form.website.$error && !backendErrors.website
                                        }">
                                            <label for="website">Website</label>
                                            <input id="website" type="text" placeholder="Enter website"
                                                class="form-input" v-model="editForm.website" />

                                            <!-- Looks Good -->
                                            <template
                                                v-if="isSubmitEditForm && !$vEdit.form.website.$error && !backendErrors.website">
                                                <p class="text-[#1abc9c] mt-1">Looks Good!</p>
                                            </template>

                                            <!-- Frontend errors -->
                                            <template v-if="isSubmitEditForm && $vEdit.form.website.$error">
                                                <p v-for="error in $vEdit.form.website.$errors" :key="error.$uid"
                                                    class="text-danger mt-1">
                                                    <span v-if="error.$validator === 'isValidUrl'">{{ error.$message
                                                        }}</span>
                                                </p>
                                            </template>

                                            <!-- Backend error -->
                                            <template v-if="backendErrors.website">
                                                <p class="text-danger mt-1">{{ backendErrors.website }}</p>
                                            </template>
                                        </div>
                                    </div>

                                    <div class="flex justify-end items-center mt-8 space-x-4">
                                        <button type="button" class="btn btn-outline-danger"
                                            @click="closeEditModal">Cancel</button>

                                        <div>
                                            <span v-if="!listedCompanyInformationStore.loading">
                                                <button type="submit" class="btn btn-primary mt-0">Update</button>
                                            </span>
                                            <span v-else>
                                                <button type="button" class="btn btn-primary mt-0" disabled>
                                                    Loading...
                                                </button>
                                            </span>
                                        </div>
                                    </div>

                                    <div class="text-danger mt-1"
                                        v-if="listedCompanyInformationStore.editPortfolioRecordError">{{
                                            listedCompanyInformationStore.editPortfolioRecordError }}</div>
                                </form>
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
import { Dialog, DialogOverlay, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { IconDatabaseOff, IconEdit, IconTrash, IconX } from '@tabler/icons-vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { computed, ref, reactive, onMounted  } from 'vue';
import { useMeta } from '../../../../composables/use-meta';

import { usePermissions } from '@/composables/usePermissions';
import { toast } from 'vue3-toastify';
import FileUpload from '../../../components/file-upload.vue';

import { useListedCompanyInformationStore } from '@/stores/configuration/portfolio-record/listed-company-information';
import { useSectorStore } from '@/stores/configuration/sectors';
import { useSubSectorStore } from '@/stores/configuration/sectors/sub-sectors';
import Loader from '../../../components/loader.vue';

// Add these imports for Vuelidate
import useVuelidate from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';

const { hasRole, hasPermission } = usePermissions()

useMeta({ title: 'Listed Company Information' });

// Initialize stores
const sectorStore = useSectorStore();
const subSectorStore = useSubSectorStore();
const listedCompanyInformationStore = useListedCompanyInformationStore();

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

// Fetch sectors on component mount
onMounted(async () => {
  await sectorStore.fetchSectors();
  await listedCompanyInformationStore.fetchListedCompanyInformation();
});

// Computed properties for dropdown options
const sectorOptions = computed(() => {
  return sectorStore.sectors;
});

const subSectorOptionsAdd = computed(() => {
  if (!addForm.sector_id) return [];
  const sectorId = typeof addForm.sector_id === 'object' ? addForm.sector_id.id : addForm.sector_id;
  return subSectorStore.sectors.filter((subSector: SubSector) => subSector.sector_id === sectorId);
});

const subSectorOptionsEdit = computed(() => {
  if (!editForm.sector_id) return [];
  const sectorId = typeof editForm.sector_id === 'object' ? editForm.sector_id.id : editForm.sector_id;
  return subSectorStore.sectors.filter((subSector: SubSector) => subSector.sector_id === sectorId);
});

const search = ref('');
const columns = ref([
    { field: 'id', title: '#' },
    { field: 'sector.name', title: 'Sector' },
    { field: 'sub_sector.name', title: 'Sub-Sector' },
    { field: 'name', title: 'Name' },
    { field: 'website', title: 'Website' },
    { field: 'action', title: 'Action', sort: false },
]) || [];


onMounted(() => {
    listedCompanyInformationStore.fetchListedCompanyInformation();
});

const rows = computed(() =>
    listedCompanyInformationStore.portfolioRecords.map((r, i) => ({ ...r, sn: i + 1 }))
);

const deletePortfolioRecordModal = ref(false)
const selectPortfolioRecordId = ref(0);

const deletePortfolioRecord = async () => {
    var res = await listedCompanyInformationStore.deleteListedCompanyInformation(selectPortfolioRecordId.value);
    deletePortfolioRecordModal.value = false;

    if (res) {
        toast.success("Listed Company Information deleted successfully");
    } else {
        toast.error(listedCompanyInformationStore.deletePortfolioRecordError);
    }
}

const importPortfolioRecordModal = ref(false);

// Import function
const fileUploadRef = ref<InstanceType<typeof FileUpload> | null>(null);
const selectedFile = ref<File | null>(null);

const handleFileSelected = (file: File) => {
    selectedFile.value = file;
    listedCompanyInformationStore.importErrors = []; // Clear errors when a new file is selected
};

const importSector = async () => {
    if (!selectedFile.value) {
        toast.error('Please select a file first!');
        return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile.value);

    const res = await listedCompanyInformationStore.importListedCompanyInformation(formData);

    if (res) {
        toast.success('Listed Company Information imported successfully');
        importPortfolioRecordModal.value = false;
        fileUploadRef.value?.clearPreview();
        selectedFile.value = null;
        listedCompanyInformationStore.importErrors = []; // Clear errors on success
    } else {
        toast.error(listedCompanyInformationStore.error || 'Failed to import Listed Company Information');
        // Errors are already stored in sectorStore.importErrors
        fileUploadRef.value?.clickClearBtn();
        selectedFile.value = null;
    }
};

const closeModal = () => {
    importPortfolioRecordModal.value = false;
    listedCompanyInformationStore.importErrors = []; // Clear errors when closing modal
    selectedFile.value = null; // Clear selected file
};

const downloadTemplate = async () => {
    const res = await listedCompanyInformationStore.downloadTemplate();
    if (res) {
        toast.success('Template downloaded successfully');
    } else {
        toast.error(listedCompanyInformationStore.error || 'Failed to download template');
    }
};

// Add and Edit Modal Variables
const addModal = ref(false);
const editModal = ref(false);
const selectedRecordId = ref(0);


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

// Add Form
const addForm = reactive({
    sector_id: null as Sector | number | null,
    sub_sector_id: null as SubSector | number | null,
    name: '',
    website: '',
});

// Simple but effective URL validation
const isValidUrl = (value) => {
    if (!value) return true; // Allow empty values

    // Test for valid domain structure: something.something
    const domainPattern = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i;

    // Remove protocol and www for validation
    let cleanValue = value.replace(/^(https?:\/\/)?(www\.)?/i, '');

    // Remove trailing slash and any path/query parameters
    cleanValue = cleanValue.replace(/\/.*$/, '');

    return domainPattern.test(cleanValue);
};

const addRules = {
    form: {
        sector_id: { required },
        sub_sector_id: { required },
        name: { required },
        website: { isValidUrl: helpers.withMessage('Please enter a valid URL', isValidUrl) },
    }
};

const isSubmitAddForm = ref(false);
const $vAdd = useVuelidate(addRules, { form: addForm });

// Edit Form
const editForm = reactive({
    id: '',
    name: '',
    website: '',
    sector_id: null as Sector | number | null,
    sub_sector_id: null as SubSector | number | null,
});

const editRules = {
    form: {
        sector_id: { required },
        sub_sector_id: { required },
        name: { required },
        website: { isValidUrl: helpers.withMessage('Please enter a valid URL', isValidUrl) },
    }
};

const isSubmitEditForm = ref(false);
const $vEdit = useVuelidate(editRules, { form: editForm });

// Backend errors
const backendErrors = reactive({
    name: '',
    website: '',
    sector_id: '',
    sub_sector_id: ''
});

// Sector change handlers
const onSectorChangeAdd = async (sector: Sector | null) => {
  addForm.sub_sector_id = null;
  if (sector && sector.id) {
    await subSectorStore.fetchSubSectors(false, sector.id);
  }
};

const onSectorChangeEdit = async (sector: Sector | null) => {
  editForm.sub_sector_id = null;
  if (sector && sector.id) {
    await subSectorStore.fetchSubSectors(false, sector.id);
  }
};

// Modal functions
const openAddModal = () => {
    addModal.value = true;
    resetAddForm();
};

const closeAddModal = () => {
    addModal.value = false;
    resetAddForm();
};

const openEditModal = (id: number) => {
    selectedRecordId.value = id;
    loadRecordForEdit(id);
    editModal.value = true;
};

const closeEditModal = () => {
    editModal.value = false;
    resetEditForm();
};

const resetAddForm = () => {
    addForm.name = '';
    addForm.website = '';
    addForm.sector_id = null;
    addForm.sub_sector_id = null;
    isSubmitAddForm.value = false;
    $vAdd.value.$reset();
    Object.keys(backendErrors).forEach(key => backendErrors[key] = '');
    listedCompanyInformationStore.addPortfolioRecordError = '';
};

const resetEditForm = () => {
    editForm.id = '';
    editForm.name = '';
    editForm.website = '';
    editForm.sector_id = null;
    editForm.sub_sector_id = null;
    isSubmitEditForm.value = false;
    $vEdit.value.$reset();
    Object.keys(backendErrors).forEach(key => backendErrors[key] = '');
    listedCompanyInformationStore.editPortfolioRecordError = '';
};

// Load record for editing
const loadRecordForEdit = async (id: number) => {
  const record = await listedCompanyInformationStore.editListedCompanyInformation(id);
  if (record) {
    editForm.id = record.id.toString();
    editForm.name = record.name;
    editForm.website = record.website;
    
    // Set sector and sub-sector
    if (record.sector_id) {
      // Find the sector object from available options
      const sector = sectorOptions.value.find(s => s.id === record.sector_id);
      if (sector) {
        editForm.sector_id = sector;
        // Fetch sub-sectors for this sector
        await subSectorStore.fetchSubSectors(false, record.sector_id);
        
        // Set sub-sector after a small delay to ensure sub-sectors are loaded
        setTimeout(() => {
          if (record.sub_sector_id) {
            const subSector = subSectorOptionsEdit.value.find(ss => ss.id === record.sub_sector_id);
            if (subSector) {
              editForm.sub_sector_id = subSector;
            }
          }
        }, 100);
      }
    }
  } else {
    toast.error(listedCompanyInformationStore.editPortfolioRecordError || 'Record not found');
    closeEditModal();
  }
};


// Form submission functions
const submitAddForm = async () => {
  isSubmitAddForm.value = true;
  Object.keys(backendErrors).forEach(k => backendErrors[k] = '');
  
  await $vAdd.value.$validate();
  
  if (!$vAdd.value.$invalid) {
    // Normalize the URL before submitting
    let websiteUrl = addForm.website;
    if (websiteUrl) {
      try {
        if (!websiteUrl.startsWith("http://") && !websiteUrl.startsWith("https://")) {
          websiteUrl = "https://" + websiteUrl;
        }
        addForm.website = websiteUrl;
      } catch (error) {
        console.warn('URL normalization failed:', error);
      }
    }
    
    // Prepare data with extracted IDs
    const submissionData = {
      name: addForm.name,
      website: addForm.website,
      sector_id: extractId(addForm.sector_id),
      sub_sector_id: extractId(addForm.sub_sector_id),
    };
    
    const res = await listedCompanyInformationStore.addListedCompanyInformation(submissionData);
    
    if (res === true) {
      toast.success("Listed Company Information added successfully");
      closeAddModal();
      listedCompanyInformationStore.fetchListedCompanyInformation();
    } else {
      for (const field in listedCompanyInformationStore.addPortfolioRecordFieldErrors) {
        backendErrors[field] = listedCompanyInformationStore.addPortfolioRecordFieldErrors[field][0];
      }
    }
  }
};

const submitEditForm = async () => {
  isSubmitEditForm.value = true;
  Object.keys(backendErrors).forEach(k => backendErrors[k] = '');
  
  await $vEdit.value.$validate();
  
  if (!$vEdit.value.$invalid) {
    // Normalize the URL before submitting
    let websiteUrl = editForm.website;
    if (websiteUrl) {
      try {
        if (!websiteUrl.startsWith("http://") && !websiteUrl.startsWith("https://")) {
          websiteUrl = "https://" + websiteUrl;
        }
        editForm.website = websiteUrl;
      } catch (error) {
        console.warn('URL normalization failed:', error);
      }
    }
    
    // Prepare data with extracted IDs
    const submissionData = {
      id: Number(editForm.id),
      name: editForm.name,
      website: editForm.website,
      sector_id: extractId(editForm.sector_id),
      sub_sector_id: extractId(editForm.sub_sector_id),
    };
    
    const ok = await listedCompanyInformationStore.updateListedCompanyInformation(submissionData);
    
    if (ok === true) {
      toast.success('Listed Company Information updated successfully');
      closeEditModal();
      listedCompanyInformationStore.fetchListedCompanyInformation();
    } else {
      for (const field in listedCompanyInformationStore.editPortfolioRecordFieldErrors) {
        backendErrors[field] = listedCompanyInformationStore.editPortfolioRecordFieldErrors[field][0];
      }
    }
  }
};
</script>

<style>
.custom-multiselect .multiselect__content-wrapper {
  position: absolute !important;
  z-index: 99999 !important;
}
</style>
