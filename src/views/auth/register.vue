<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div class="max-w-5xl w-full flex flex-col lg:flex-row-reverse rounded-2xl overflow-hidden shadow-2xl">
            <!-- Right Section - Branding & Illustration -->
            <div class="lg:w-1/2 bg-gradient-to-bl from-primary to-purple-600 p-6 lg:p-8 flex flex-col justify-between">
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <img src="/assets/images/auth/logo-white.svg" alt="Logo" class="w-5 h-5" />
                    </div>
                    <span class="text-white text-lg font-bold">Inkula</span>
                </div>
                
                <div class="mt-8 text-center lg:text-left">
                    <h2 class="text-2xl lg:text-3xl font-bold text-white mb-3">Join Our Community</h2>
                    <p class="text-blue-100">Create an account to unlock exclusive features and personalized experiences.</p>
                    
                    <div class="mt-6 space-y-3">
                        <div class="flex items-center space-x-2">
                            <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                                <span class="text-white text-xs">✓</span>
                            </div>
                            <span class="text-white text-sm">Secure & encrypted registration</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                                <span class="text-white text-xs">✓</span>
                            </div>
                            <span class="text-white text-sm">Personalized dashboard</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                                <span class="text-white text-xs">✓</span>
                            </div>
                            <span class="text-white text-sm">24/7 Customer support</span>
                        </div>
                    </div>
                </div>
                
                <div class="hidden lg:block mt-6">
                    <div class="relative w-full h-48">
                        <div class="absolute inset-0 bg-gradient-to-l from-white/10 to-transparent rounded-xl"></div>
                        <img src="/assets/images/auth/register.svg" alt="Register Illustration" class="w-full h-full object-contain" />
                    </div>
                </div>
            </div>

            <!-- Left Section - Registration Form -->
            <div class="lg:w-1/2 bg-white dark:bg-gray-800 p-6 lg:p-8">
                <div class="max-w-sm mx-auto">
                    <div class="text-center mb-8">
                        <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">Create Account</h1>
                        <p class="text-gray-600 dark:text-gray-300 text-sm">Fill in your details to get started</p>
                    </div>

                    <form @submit.prevent="submit" class="space-y-5">
                        <!-- Name Input -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                            <div class="relative group">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <IconUser class="h-4 w-4 text-gray-400 group-focus-within:text-primary" />
                                </div>
                                <input
                                    v-model="form.name"
                                    type="text"
                                    placeholder="John Doe"
                                    class="w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                                    :class="{ 'border-red-500': isSubmitForm && $v.form.name.$error, 'border-green-500': isSubmitForm && !$v.form.name.$error }"
                                />
                            </div>
                            <div v-if="isSubmitForm && $v.form.name.$error" class="mt-1 text-xs text-red-600">
                                <span v-if="$v.form.name.$errors[0]?.$validator === 'required'">Name is required</span>
                            </div>
                        </div>

                        <!-- Email Input -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                            <div class="relative group">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <IconMail class="h-4 w-4 text-gray-400 group-focus-within:text-primary" />
                                </div>
                                <input
                                    v-model="form.email"
                                    type="email"
                                    placeholder="you@example.com"
                                    class="w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                                    :class="{ 'border-red-500': isSubmitForm && $v.form.email.$error, 'border-green-500': isSubmitForm && !$v.form.email.$error }"
                                />
                            </div>
                            <div v-if="isSubmitForm && $v.form.email.$error" class="mt-1 text-xs text-red-600">
                                <span v-if="$v.form.email.$errors[0]?.$validator === 'required'">Email is required</span>
                                <span v-if="$v.form.email.$errors[0]?.$validator === 'email'">Please enter a valid email</span>
                            </div>
                        </div>

                        <!-- Password Input -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                            <div class="relative group">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <IconLock class="h-4 w-4 text-gray-400 group-focus-within:text-primary" />
                                </div>
                                <input
                                    v-model="form.password"
                                    type="password"
                                    placeholder="••••••••"
                                    class="w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                                    :class="{ 'border-red-500': isSubmitForm && $v.form.password.$error, 'border-green-500': isSubmitForm && !$v.form.password.$error }"
                                />
                            </div>
                            <div v-if="isSubmitForm && $v.form.password.$error" class="mt-1 text-xs text-red-600">
                                <span v-if="$v.form.password.$errors[0]?.$validator === 'required'">Password is required</span>
                                <span v-if="$v.form.password.$errors[0]?.$validator === 'minLength'">Must be at least 6 characters</span>
                            </div>
                            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Minimum 6 characters required</p>
                        </div>

                        <!-- Terms & Conditions -->
                        <div class="flex items-start space-x-2">
                            <input id="terms" type="checkbox" class="mt-0.5 h-3.5 w-3.5 text-primary rounded focus:ring-primary border-gray-300 dark:border-gray-600" />
                            <label for="terms" class="text-xs text-gray-600 dark:text-gray-300">
                                I agree to the 
                                <a href="#" class="text-primary hover:text-purple-600">Terms of Service</a>
                                and 
                                <a href="#" class="text-primary hover:text-purple-600">Privacy Policy</a>
                            </label>
                        </div>

                        <!-- Submit Button -->
                        <button
                            type="submit"
                            :disabled="auth.loading"
                            class="w-full bg-gradient-to-r from-primary to-purple-600 text-white py-2.5 px-4 rounded-lg font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                            <span v-if="auth.loading" class="loader border-white border-2 border-t-transparent w-4 h-4 rounded-full animate-spin"></span>
                            <span class="text-sm">{{ auth.loading ? 'Creating Account...' : 'Create Account' }}</span>
                        </button>

                        <!-- Error Message -->
                        <div v-if="auth.error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-3 py-2 rounded-lg text-xs">
                            {{ auth.error }}
                        </div>
                    </form>

                    <!-- Divider -->
                    <div class="relative my-6">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
                        </div>
                        <div class="relative flex justify-center text-xs">
                            <span class="px-3 bg-white dark:bg-gray-800 text-gray-500">Or sign up with</span>
                        </div>
                    </div>

                    <!-- Login Link -->
                    <div class="text-center mt-8">
                        <p class="text-gray-600 dark:text-gray-300 text-sm">
                            Already have an account?
                            <router-link to="/login" class="text-primary font-medium hover:text-purple-600 transition-colors ml-1">
                                Sign in
                            </router-link>
                        </p>
                    </div>

                    <!-- Footer -->
                    <div class="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
                        <p class="text-gray-500 dark:text-gray-400 text-xs">
                            © {{ new Date().getFullYear() }} Inkula. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { appRouter } from '@/router';
import { IconLock, IconMail, IconUser } from '@tabler/icons-vue';
import useVuelidate from '@vuelidate/core';
import { email as emailRule, minLength, required } from '@vuelidate/validators';
import { reactive, ref } from 'vue';
import { toast } from 'vue3-toastify';
import { useMeta } from '../../composables/use-meta';
import { useAuthStore } from '../../stores/auth';


useMeta({ title: 'Register' });
const form = reactive({
    name: '',
    email: '',
    password: '',
})

// Validation rules
const rules = {
  form: {
    name: { required },
    email: { required, email: emailRule },
    password: { required, minLength: minLength(6) },
  },
};

const isSubmitForm = ref(false)
const $v = useVuelidate(rules, { form })


const auth = useAuthStore();

const submit = async () => {
  isSubmitForm.value = true
  await $v.value.$validate()

    if (!$v.value.$invalid) {
        var res = await auth.register(form)
        if (res) {
            //reset form
            form.email = ''
            form.password = ''
            //reset validation
            $v.value.$reset()
            isSubmitForm.value = false
            await appRouter.push('/otp');
            //show success message
            toast.success(auth.message);
        } else {
            toast.error(auth.error);
        }
    } else {
        toast.error('Validation Failed')
    }
}
</script>

<style scoped>
.loader {
    border: 2px solid #fff;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>