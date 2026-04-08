import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const Chatpage = () => {
    const {authUser , isloading , login } = useAuthStore()
  
    // console.log( " authUser", authUser )
    // console.log( " Login", login )
  
  return (
    <div className='text-white text-3xl font-bold relative z-1'>
      <h1>Chatpage</h1>
      <button onClick={login} className='btn btn-primary'>Click me</button>
    </div>
  )
}

export default Chatpage