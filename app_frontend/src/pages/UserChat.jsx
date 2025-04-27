import React, { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';

export default function UserChat() {

  const {selectedUser, getMessages, messages, setSelectedUser} = useChatStore()
  const {authUser} = useAuthStore()

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const getMessagesData = await getMessages(selectedUser._id)

        if (getMessagesData.status === 200) {
          toast.success(getMessagesData.message)
        } else {
          toast.error(getMessagesData.message)
        }
      } catch (error) {
        console.log(`Sidebar -> fetchUsers Error: `, error)
        toast.error("Something went wrong")
      }
    }

    fetchMessages()
  }, [selectedUser._id, getMessages])

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-base-100 rounded-none md:rounded-lg shadow-md overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between bg-primary text-white p-4 font-semibold text-xl shadow z-10">
        Chat with Friend
        <button onClick={() => setSelectedUser(null)}>❌</button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {/* Sample Message Blocks */}
        {messages.map((message) => (
          <div key={message._id} className={`flex items-end ${message.senderId == authUser._id ? 'justify-end' : 'justify-start'} gap-2`}>
            {/* <div className="avatar">
              <div className="w-10 rounded-full">
                {message.senderId}
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Friend" />
              </div>
            </div> */}
            <div className={`${message.senderId == authUser._id ? 'bg-primary text-white': 'bg-base-300 text-primary'} px-4 py-2 rounded-b-xl ${message.senderId == authUser._id ? 'rounded-tl-xl': 'rounded-tr-xl'} max-w-xs`}>
              {message.text}
            </div>
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="You" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="bg-base-200 border-t p-4 flex items-center gap-3">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 bg-base-100 px-4 py-2 border border-base-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button className="bg-primary text-white px-5 py-2 rounded-full hover:bg-primary/80 transition-all">
          Send
        </button>
      </div>
    </div>
  );
}
