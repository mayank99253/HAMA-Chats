import React, { useEffect } from 'react'
import UserLoadingSkeleton from './UserLoadingSkeleton';
import { useChatStore } from '../store/useChatStore';

const ContactList = () => {
  const { allcontacts, setSelectedUser, getAllContacts, isUsersLoading } = useChatStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts])

  if (isUsersLoading) return <UserLoadingSkeleton />

  return (
    <div className='h-full w-full flex gap-3 text-white/70  flex-col'>
      {allcontacts.map((contact) => (
        <div
          key={contact._id}
          className='px-3 py-2 flex gap-2 rounded-lg bg-blue-900/20 hover:bg-blue-900/30 cursor-pointer'
          onClick={() => setSelectedUser(contact)}
        >
          {contact.profilepic ? (
            <div className='avatar online h-10 w-10 rounded-full'>
              <img
                src={contact.profilepic}
                alt={contact.fullName}
                className='w-10 h-10 rounded-full object-cover'
              />
            </div>
          ) : (
            <div className=' avatar online w-10 h-10 rounded-full bg-gray-300'>
              <img src="/avatar.jpg" alt="" className='object-cover w-full h-full rounded-full' />
            </div>
          )}
          <div className='flex flex-col'>
            <span>{contact.fullName}</span>
            <span className='text-sm text-gray-500'>Online</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ContactList