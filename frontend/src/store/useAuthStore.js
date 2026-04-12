import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import { toast } from "react-hot-toast"
export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: false,
    isSigningUp: false,
    isLogin: false,


    checkAuth: async () => {
        set({ isCheckingAuth: true })
        try {
            const res = await axiosInstance.get('/auth/check');
            set({ authUser: res.data })
        } catch (error) {
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
            toast.success("User Logged In")
        } catch (error) {
            toast.error(error.response?.data?.message || "Login Error");
        }
        finally {
            set({ isLogin: false })
        }
    },

    logout : async()=>{
        try {
            const res = await axiosInstance.post('/auth/logout');
            set({authUser:null})
            toast.success("Logged Out Successfully")
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
    }

}))