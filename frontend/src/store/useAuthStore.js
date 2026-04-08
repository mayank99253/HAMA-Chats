import { create } from 'zustand'

export const useAuthStore = create((set) => ({
    authUser: { name: "moon beak", _id: 123, age: 20 },
    isloading: false,

    login: () => {
        console.log(`Hello moon, You Just Logged In`);
        set({isloading:true})
    }
}))