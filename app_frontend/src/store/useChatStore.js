import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            
            const getUsersResponse = await axiosInstance.get('/user/messages/users')
            set({ users: getUsersResponse.data.data });
            set({ isUsersLoading: false });

            return {
                status: getUsersResponse.data.status,
                message: getUsersResponse.data.message,
                data: getUsersResponse.data.data
            }
        } catch (error) {
            console.log(`Error in useChatStore -> getUsers: `, error);
            set({ users: [] });
            set({ isUsersLoading: false });
            if(error.status == 422){
                return {
                    status: error.response.data.status,
                    message: error.response.data.message,
                    data: error.response.data.data
                }
            }
            return {
                status: 500,
                message: error.message,
                data: null
            }
        }
    },

    getMessages: async (receiverId) => {
        set({ isMessagesLoading: true });
        try {
            const getMessagesResponse = await axiosInstance.get(`/user/messages/${receiverId}`)
            set({ messages: getMessagesResponse.data.data });
            set({ isMessagesLoading: false });

            return {
                status: getMessagesResponse.data.status,
                message: getMessagesResponse.data.message
            }
        } catch (error) {
            console.log(`Error in useChatStore -> getMessages: `, error);
            set({ messages: [] });
            set({ isMessagesLoading: false });
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

    setSelectedUser: (selectedUser) => {
        set({ selectedUser });
    }
}))