import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import { toast } from "react-hot-toast"
import { io } from "socket.io-client";

// const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5000' : '/'
const BASE_URL = import.meta.env.MODE === 'development' ? 'https://hama-chats-1.onrender.com' : '/'

export const useAuthStore = create((set , get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLogin: false,

    socket: null,
    onlineUsers: [],


    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check');
            set({ authUser: res.data })
            get().connectSocket()
        } catch (error) {
            console.error("Error checking auth:", error);
            set({ authUser: null })
        }
        finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data })
            toast.success("Account Created Successfully");
            get().connectSocket()
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
        finally {
            set({ isSigningUp: false })
        }
    },

    login: async (data) => {
        set({ isLogin: true })
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data })
            toast.success("Logged In successfully");
            get().connectSocket()
        } catch (error) {
            toast.error(error.response?.data?.message || "Login Error");
        }
        finally {
            set({ isLogin: false })
        }
    },

    logout: async () => {
        try {
            const res = await axiosInstance.post('/auth/logout');
            set({ authUser: null })
            toast.success("Logged Out Successfully")
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    },

    updateProfilePicture: async (data) => {
        try {
            const res = await axiosInstance.put('/auth/update-profile', data);
            set({ authUser: res.data });
            toast.success("Profile Picture Updated Successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
            console.error("Error updating profile picture:", error);
        }
    },
    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            withCredentials: true, //this ensure cookies are senet with the connection
        });

        socket.connect();

        set({ socket });

        //listening for connection errors 

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });

    },

    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();

    }
}))