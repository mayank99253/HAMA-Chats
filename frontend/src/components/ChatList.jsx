import React, { useEffect } from 'react'
import UserLoadingSkeleton from './UserLoadingSkeleton'
import NoChatsFound from './NoChatsFound'
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';

const ChatList = () => {

  const { getMyChatPartners, chats, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners])

  if (isUsersLoading) return <UserLoadingSkeleton />

  if (chats.length === 0) return <NoChatsFound />

  return (
    <div className='w-full h-full p-1 flex flex-col gap-2 overflow-y-auto'>
      {chats.map((chat) => (
        <div
          key={chat._id}
          onClick={() => setSelectedUser(chat)}
          className='px-3 py-2 flex gap-2 bg-blue-900/20 hover:bg-blue-900/30 rounded-lg cursor-pointer'
        >
          {chat.profilepic ? (
            <div className={`avatar ${onlineUsers.includes(chat._id) ? 'online' : ''} h-10 w-10 rounded-full`}>
              <img
                src={chat.profilepic}
                alt={chat.fullName}
                className='w-10 h-10 rounded-full object-cover'
              />
            </div>
          ) : (
            <div className='avatar online w-10 h-10 rounded-full bg-gray-300'>
              <img src="/avatar.jpg" alt="" className='object-cover w-full h-full rounded-full' />
            </div>
          )}
          <div className='flex flex-col'>
            <span>{chat.fullName}</span>
            <span className={`text-sm ${onlineUsers.includes(chat._id) ? 'text-green-500' : 'text-gray-300/30'}`}>{onlineUsers.includes(chat._id) ? 'Online' : 'Offline'}</span>

          </div>
        </div>
      ))}
    </div>
  )
}

export default ChatList