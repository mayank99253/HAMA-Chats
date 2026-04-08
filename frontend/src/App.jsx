import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NeonChatBackground from './theme/NeonChatBackground'
import Chatpage from './pages/Chatpage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useAuthStore } from './store/useAuthStore'

const App = () => {


  return (
    <div className='h-screen flex items-center justify-center relative overflow-hidden'>
      <div className='absolute top-0 left-0 -z-5'>
        <NeonChatBackground />
      </div>
      <Routes>
        <Route path='/' element={<Chatpage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App