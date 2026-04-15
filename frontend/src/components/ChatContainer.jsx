import React, { use, useEffect, useRef } from 'react'
import ChatHeader from './ChatHeader'
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import NoChatHistoryPlaceHolder from './NoChatHistoryPlaceHolder';
import MessagesLoadingSkeleton from './MessagesLoadingSkeleton';
import MessageInput from './MessageInput';

const ChatContainer = () => {

  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading , subscribeToMessages , unsubscribeFromMessages } = useChatStore();

  const { authUser } = useAuthStore();

  const messagesEndRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser?._id);
    subscribeToMessages()

    //clean up function 
    return ()=> unsubscribeFromMessages()
  }, [selectedUser, getMessagesByUserId , subscribeToMessages , unsubscribeFromMessages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
      // messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div className='w-full h-full flex flex-col'>

      {/* ChatHeader */}
      <ChatHeader />

      {/* MessageBox - removed conflicting classes */}
      <div className='flex-1 overflow-y-auto p-4 flex flex-col gap-2'> 
        {messages.length > 0 && !isMessagesLoading ? (
          <div ref={messagesEndRef} 
          style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {messages.map((message) => (
              <div key={message._id} className={`message-item chat ${message.Sender  === authUser._id ? "chat-end" : "chat-start"}`}>
                <div className={`chat-bubble 
                ${message.Sender === authUser._id ?
                    " bg-cyan-900 text-white" : " bg-gray-600 text-white"}`}>
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
            {/* <div ref={messagesEndRef} /> Dummy div to scroll into view */}
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceHolder name={selectedUser?.fullName} />
        )}
      </div>

      {/* MessageInput */}
      <MessageInput />

    </div>
  )
}

export default ChatContainer