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
    isUsersLoading: false,
    isMessagesLoading: false,

    setActiveTab: (tab) => { set({ ActiveTab: tab }) },
    setSelectedUser: (user) => { set({ selectedUser: user }) },

    getAllContacts: async (data) => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get('/messages/contacts', data);
            set({ allcontacts: res.data })
        } catch (error) {
            toast.error(error.response?.data?.message)
        } finally {
            set({ isUsersLoading: false })
        }
    },

    getMyChatPartners: async (data) => {
        set({ isUsersLoading: true })
        try {
            const res = await axiosInstance.get('/messages/chats', data);
            set({ chats: res.data })
        } catch (error) {
            toast.error(error.response?.data?.message)
        } finally {
            set({ isUsersLoading: false })
        }
    },

    getMessagesByUserId: async (userId) => {
        if (!userId) {
            set({ messages: [], isMessagesLoading: false });
            return;
        }
        set({ isMessagesLoading: true, messages: [] })
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data })
        } catch (error) {
            set({ messages: [] })
            toast.error(error.response?.data?.message ?? "Failed to load messages")
        } finally {
            set({ isMessagesLoading: false })
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser } = get();
        const { authUser } = useAuthStore.getState();

        const tempId = `temp-${Date.now()}`;

        const optimisticMessage = {
            _id: tempId,
            senderId: authUser._id,   //
            receiverId: selectedUser._id,
            text: messageData.text,
            image: messageData.image,
            createdAt: new Date().toISOString(),
            isOptimistic: true,
        };

        set((state) => ({ messages: [...state.messages, optimisticMessage] }));

        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            // Use functional update to get fresh state, replace optimistic msg
            set((state) => ({
                messages: state.messages
                    .filter((m) => m._id !== tempId)
                    .concat(res.data)
            }));
        } catch (error) {
            // Remove only the failed optimistic message, keep rest intact
            set((state) => ({
                messages: state.messages.filter((m) => m._id !== tempId)
            }));
            toast.error(error.response?.data?.message || "Failed to send message");
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;
        if (!socket) return; 

        socket.off("newMessage");

        socket.on("newMessage", (newMessage) => {
            
            const isMessageSentFromSelectedUser = newMessage.Sender === selectedUser._id;
            if (!isMessageSentFromSelectedUser) return;

            set((state) => ({ messages: [...state.messages, newMessage] }));
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        if (!socket) return;
        socket.off("newMessage");
    },
}))