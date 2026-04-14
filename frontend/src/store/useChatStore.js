import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";


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
    },
    getMessagesByUserId : async (userId) => {
        if (!userId) {
            set({ messages: [], isMessagesLoading: false });
            return;
        }

        set({ isMessagesLoading: true, messages: [] })
        try {
             const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages:res.data}) 
        } catch (error) {
            set({ messages: [] })
            toast.error(error.response?.data?.message ?? "Failed to load messages")
        }
        finally{
            set({isMessagesLoading:false})
        }
    },

    sendMessage : async (messageData) => {
        const {selectedUser , messages} = get();
        const {authUser} = useAuthStore.getState();

        const tempId = `temp-${Date.now()}`

        const optimisticMessage = {
            _id : tempId,
            Sender : authUser._id,
            Reciever : selectedUser._id,
            text:messageData.text,
            image:messageData.image,
            createdAt : new Date().toISOString(),
            isOptimistic :true,
        }
        // Imidiate change the UI when user send the message
        set({messages : [...messages , optimisticMessage]})
            try {
                const res = await axiosInstance.post(`/messages/send/${selectedUser._id}` , messageData);
                set({messages: messages.concat(res.data)})
            } catch (error) {
                //remove optimistic messages on the failure
                set({messages :messages})
                toast.error(error.response?.data?.message || "Failed to send message")
            }
    }

}))