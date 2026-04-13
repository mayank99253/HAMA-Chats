import React from 'react'
import { useChatStore } from '../store/useChatStore';

const ActiveTabSwitch = () => {
    const { ActiveTab, setActiveTab } = useChatStore();
    return (
        <div className='w-full h-10 flex items-center justify-around border-b pb-2 border-white/10'>
            <button onClick={() => setActiveTab('chats')}
                className={`py-1 px-4 rounded-lg ${ActiveTab === 'chats' ? 'bg-blue-500 text-black' : 'text-white/70 hover:text-white/100'}`}>Chats</button>
            <button onClick={() => setActiveTab('contacts')}
                className={`py-1 px-4 rounded-lg ${ActiveTab === 'contacts' ? 'bg-purple-500 text-black' : 'text-white/70 hover:text-white/100'}`}>Contacts</button>
        </div>
    )
}

export default ActiveTabSwitch