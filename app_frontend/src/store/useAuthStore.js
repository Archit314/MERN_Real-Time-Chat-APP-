import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

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
    }
}))