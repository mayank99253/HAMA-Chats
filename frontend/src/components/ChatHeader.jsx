import React, { useEffect } from 'react'
import { XCircleIcon, ArrowLeftIcon } from 'lucide-react'
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import useWindowSize from '../hooks/useWindowSize';

const ChatHeader = () => {
    const { selectedUser, setSelectedUser , setShowReceiverProfile } = useChatStore();
    const { onlineUsers } = useAuthStore();
    const { isMobile } = useWindowSize();

    useEffect(() => {
        const handleEscapekey = (event) => {
            if (event.key === "Escape") setSelectedUser(null);
        }
        window.addEventListener('keydown', handleEscapekey);
        return () => {
            window.removeEventListener('keydown', handleEscapekey);
        };
    }, [selectedUser])

    return (
        <div className='w-full h-16 border-b border-gray-300/20 flex items-center justify-between px-4'>
            {/* LeftSide */}
            <div className='left flex items-center gap-4 cursor-pointer'
            onClick={() => setShowReceiverProfile(true)} >

                <div className={`avatar ${onlineUsers.includes(selectedUser?._id) ? 'online' : ''} w-10 h-10 rounded-full`}>
                    <img
                        src={selectedUser?.profilepic || "/avatar.jpg"}
                        alt={selectedUser?.fullName}
                        className=' w-10 h-10 rounded-full' />
                </div>

                <div className='flex flex-col'>
                    <span className='font-semibold'>{selectedUser?.fullName}</span>
                    <span className={`text-sm ${onlineUsers.includes(selectedUser?._id) ? 'text-green-500' : 'text-gray-300/30'}`}>
                        {onlineUsers.includes(selectedUser?._id) ? 'Online' : 'Offline'}
                    </span>
                </div>
            </div>

            {/* RightSide — back arrow on mobile, X on desktop/tablet */}
            <button
                type="button"
                onClick={() => { setSelectedUser(null) }}
                aria-label="Close conversation"
                className='right cursor-pointer ml-10'
            >
                {isMobile
                    ? <ArrowLeftIcon size={26} aria-hidden="true" />
                    : <XCircleIcon size={30} aria-hidden="true" />
                }
            </button>
        </div>
    )
}

export default ChatHeader