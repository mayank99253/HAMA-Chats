import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


export const useChatStore = create((set, get) => ({
    allcontacts: [],
    messages: [],
    chats: [],
    ActiveTab: "chats",
    selectedUser: null,
    isUsersLoading: false, // getAllUsers , getMyChatPartners
    isMessagesLoading: false, // getAllMessages

    setActiveTab: (tab) => { set({ ActiveTab: tab }) },
    setSelectedUser: (user) => { set({ selectedUser: user }) },

    getAllContacts: async (data) => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get('/messages/contacts', data);
            set({ allcontacts: res.data })
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
        finally{
            set({isUsersLoading:false})
        }
    },
    getMyChatPartners : async (data) => {
        set({isUsersLoading:true})
        try {
            const res = await axiosInstance.get('/messages/chats' , data);
            set({chats:res.data})
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
        finally{
            set({isUsersLoading:false})
        }
    }

}))