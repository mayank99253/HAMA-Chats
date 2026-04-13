import React, { use, useEffect } from 'react'
import ChatHeader from './ChatHeader'
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import NoChatHistoryPlaceHolder from './NoChatHistoryPlaceHolder';
import MessagesLoadingSkeleton from './MessagesLoadingSkeleton';

const ChatContainer = () => {

  const { selectedUser, getMessagesByUserId, messages , isMessagesLoading } = useChatStore();

  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessagesByUserId(selectedUser?._id);
  }, [selectedUser , getMessagesByUserId])
  return (
    <div className='w-full h-full '>

      {/* ChatHeader */}
      <ChatHeader />

      {/* MessageBox */}
      <div className='message-box'>
        {messages.length > 0 && !isMessagesLoading ? (
          <div className='messages-container p-4 flex flex-col gap-2 overflow-y-auto h-[calc(100%-4rem)]'>
            {messages.map((message) => (
              <div key={message._id} className={`message-item ${message.Sender === authUser._id ? "chat-start" : "chat-end"}`}>
                <div className={`chat-bubble ${message.Sender === authUser._id ? " bg-cyan-500 text-white" : " bg-gray-600 text-white"}`}>
                  {message.image && <img src={message.image} alt="message attachment" className='w-48 h-48 object-cover mb-2 rounded-lg' />}
                  {message.text && <p>{message.text}</p>}
                  <p className='text-xs text-gray-400'>
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceHolder name={selectedUser?.fullName} />
        )}
      </div>
      {/* MessageInputBox */}

    </div>
  )
}

export default ChatContainer