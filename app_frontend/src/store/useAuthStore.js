import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    isLoggingOut: false,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/user/auth/check')

            set({authUser: res.data})
        } catch (error) {
            console.log(`Error in useAuthStore: `, error);
            set({authUser: null})
        } finally{
            set({isCheckingAuth: false})
        }
    },

    signIn: async (formData) => {
        set({isLoggingIn: true})
        try {
            const signInResponse = await axiosInstance.post('/user/auth/sign-in', formData)
            set({authUser: signInResponse.data})
            set({isLoggingIn: false})

            return {
                status: signInResponse.data.status,
                message: signInResponse.data.message
            }
        } catch (error) {
            console.log(`Error in useAuthStore -> signIn: `, error);
            set({authUser: null})
            set({isLoggingIn: false})
            if(error.status == 422){
                return {
                    status: error.response.data.status,
                    message: error.response.data.message
                }
            }
            return {
                status: 500,
                message: error.message
            }
        }
    },

    signUp: async (formData) => {
        set({isSigningUp: true})
        try {
            const signUpResponse = await axiosInstance.post('/user/auth/sign-up', formData)
            set({authUser: signUpResponse.data})
            set({isSigningUp: false})

            return {
                status: signUpResponse.data.status,
                message: signUpResponse.data.message
            }
        } catch (error) {
            console.log(`Error in useAuthStore -> signUp: `, error);
            set({authUser: null})
            set({isSigningUp: false})
            if(error.status == 422){
                return {
                    status: error.response.data.status,
                    message: error.response.data.message
                }
            }
            return {
                status: 500,
                message: error.message
            }
        }
    },

    logout: async () => {
        set({isLoggingOut: true})
        try {
            const logoutResponse = await axiosInstance.post('/user/auth/logout')
            set({authUser: null})
            set({isLoggingOut: false})

            return {
                status: logoutResponse.data.status,
                message: logoutResponse.data.message
            }
        }
        catch (error) {
            console.log(`Error in useAuthStore -> logout: `, error);
            set({isLoggingOut: false})
            if(error.status == 422){
                return {
                    status: error.response.data.status,
                    message: error.response.data.message
                }
            }

            return {
                status: 500,
                message: error.message
            }
        }
    },

    getProfile: async () => {
        try {
            
            const profileReaponse = await axiosInstance.get('/user/auth/profile')

            return {
                status: profileReaponse.data.status,
                message: profileReaponse.data.message,
                data: profileReaponse.data.data
            }
        } catch (error) {
            console.log(`Error in useAuthStore -> getProfile: `, error);
            if(error.status == 422){
                return {
                    status: error.response.data.status,
                    message: error.response.data.message,
                    data: null
                }
            }

            return {
                status: 500,
                message: error.message,
                data: null
            }
            
        }
    }
}))