import React, { useEffect } from 'react'
import { XCircleIcon, XIcon } from 'lucide-react'
import { useChatStore } from '../store/useChatStore';

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();

    useEffect(() => {
        const handleEscapekey = (event) => {
            if (event.key === "Escape") setSelectedUser(null);
        }
        window.addEventListener('keydown', handleEscapekey);

        // cleanup function to remove the event listener when the component unmounts or when selectedUser changes
        return () => {
            window.removeEventListener('keydown', handleEscapekey);
        };
    }, [selectedUser])

    return (
        <div className='w-full h-16 border-b border-gray-300/20 flex items-center justify-between px-4'>
            {/* LeftSide */}
            <div className='left flex items-center gap-4'>

                <div className='avatar online w-10 h-10 rounded-full'>
                    <img
                        src={selectedUser?.profilepic || "/avatar.jpg"}
                        alt={selectedUser?.fullName}
                        className=' w-10 h-10 rounded-full' />
                </div>

                <div className='flex flex-col'>
                    <span className='font-semibold'>{selectedUser?.fullName}</span>
                    <span className='text-sm text-green-500'>Online</span>
                </div>
            </div>

            {/* RightSide */}
            <button
                type="button"
                onClick={() => { setSelectedUser(null) }}
                aria-label="Close conversation"
                className='right cursor-pointer ml-10'
            >
                <XCircleIcon size={30} aria-hidden="true" />
            </button>
        </div>
    )
}

export default ChatHeader