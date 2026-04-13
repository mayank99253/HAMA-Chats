import React, { Activity } from 'react'
import AestheticBackground from '../theme/AestheticBackground'
import { useChatStore } from '../store/useChatStore'
import ProfileHeader from '../components/ProfileHeader';
import ActiveTabSwitch from '../components/ActiveTabSwitch';
import ChatList from '../components/ChatList';
import ContactList from '../components/ContactList';
import ChatContainer from '../components/ChatContainer';
import NoChatConversation from '../components/NoChatConversation';
const Chatpage = () => {

  const { ActiveTab, selectedUser } = useChatStore(); // 'chats' or 'contacts'

  return (
    <div className='h-screen w-screen flex items-center justify-center relative font-sans overflow-hidden'>
      <AestheticBackground />
      <div className='h-[90vh] w-[65vw] max-w-7xl bg-white/[0.01] backdrop-blur-3xl border border-white/10 rounded-[3rem] flex overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] z-10'>
        <div className='w-1/4 border-r border-white/10'>
          {/* Sidebar */}
          <div className='h-full w-full flex flex-col items-center justify-start gap-4 p-4'>
            {/* User Details */}
            <ProfileHeader />

            {/* Chat List Or Contact List */}
            <ActiveTabSwitch />

            <div className='h-full w-full overflow-y-auto'>
              {ActiveTab === 'chats' ? (<ChatList />) : (<ContactList />)}
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className='w-3/4'>
          {selectedUser ? ( <ChatContainer /> ) : (<NoChatConversation />) }
        </div>
      </div>
    </div>
  )
}

export default Chatpage