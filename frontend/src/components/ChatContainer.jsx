import React, { useEffect, useRef, useState } from 'react'
import ChatHeader from './ChatHeader'
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import NoChatHistoryPlaceHolder from './NoChatHistoryPlaceHolder';
import MessagesLoadingSkeleton from './MessagesLoadingSkeleton';
import MessageInput from './MessageInput';

const ChatContainer = () => {

  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading,subscribeToMessages, clearUnread, unsubscribeFromMessages } = useChatStore();

  const { authUser } = useAuthStore();

  const [previewImage, setPreviewImage] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser?._id);
    subscribeToMessages()
    if (selectedUser?._id) clearUnread(selectedUser._id);

    //clean up function 
    return () => unsubscribeFromMessages()
  }, [selectedUser, getMessagesByUserId]);

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
              <div key={message._id} className={`message-item chat ${message.Sender === authUser._id ? "chat-end" : "chat-start"}`}>
                <div className={`chat-bubble 
                ${message.Sender === authUser._id ?
                    " bg-cyan-900 text-white" : " bg-gray-600 text-white"}`}>
                  {/* {message.image && <img src={message.image} alt="message attachment" className='w-48 h-48 object-cover mb-2 rounded-lg' />} */}
                  {message.image && (
                    <div className="relative group w-48">
                      <img
                        src={message.image}
                        alt="message attachment"
                        className='w-48 h-48 object-cover mb-2 rounded-lg cursor-pointer hover:opacity-90 transition-opacity'
                        onClick={() => setPreviewImage(message.image)}
                      />

                      <a
                        href={message.image}
                        download
                        target="_blank"
                        rel="noreferrer"
                        className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                      </a>
                    </div>
                  )}
                  {message.text && <p>{message.text}</p>}
                  <p className='text-xs text-gray-400'>
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {/* Image Preview Modal */}
                {previewImage && (
                  <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setPreviewImage(null)}
                  >
                    <div className="relative flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>

                      {/* Close Button — image ke UPAR */}
                      <div className="w-full flex justify-end">
                        <button
                          onClick={() => setPreviewImage(null)}
                          className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        </button>
                      </div>

                      {/* Image */}
                      <img src={previewImage} alt="preview" className="max-w-[80vw] max-h-[75vh] rounded-lg object-contain" />

                      {/* Download Button — image ke NEECHE */}
                      <a
                        href={previewImage}
                        download
                        target="_blank"
                        rel="noreferrer"
                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                        Download Image
                      </a>

                    </div>
                  </div>
                )}
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

    </div >
  )
}

export default ChatContainer