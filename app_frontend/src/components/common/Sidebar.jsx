import React, { useEffect, useState } from 'react'
import { useChatStore } from '../../store/useChatStore'
import toast from 'react-hot-toast'
// import { Menu, X } from 'lucide-react'

export default function Sidebar() {
  const { getUsers, setSelectedUser, selectedUser } = useChatStore()
  const [users, setUser] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const getUsersData = await getUsers()

        if (getUsersData.status === 200) {
          // Step 1: Add dummy `status`, `lastMessageAt`, `unreadCount`
          const enhancedUsers = getUsersData.data.map(user => ({
            ...user,
            status: Math.random() > 0.5 ? 'online' : 'offline', // 🔁 Replace with real status
            lastMessageAt: new Date(Date.now() - Math.random() * 100000000), // 🔁 Replace with real timestamp
            unreadCount: Math.floor(Math.random() * 6), // 🔁 Replace with real unread count
          }))

          // Step 2: Sort users by latest message (UI only)
          enhancedUsers.sort((a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt))

          setUser(enhancedUsers)
          toast.success(getUsersData.message)
        } else {
          toast.error(getUsersData.message)
        }
      } catch (error) {
        console.log(`Sidebar -> fetchUsers Error: `, error)
        toast.error("Something went wrong")
      }
    }

    fetchUsers()
  }, [])

  // Filtered Users for Search
  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      {/* Mobile Toggle */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-base-100 text-primary rounded-full shadow"
        >
          <span>{isOpen ? '❌' : '☰'}</span>

        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-base-200 md:static fixed top-0 left-0 h-full z-40 w-72 p-6 flex flex-col border-r border-base-300
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        {/* Title */}
        <h1 className="mb-4 text-3xl font-semibold text-primary">CHATS</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search friends..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 px-4 py-2 rounded-xl border border-base-300 bg-base-100 text-primary focus:outline-none focus:ring-2 focus:ring-primary"
        />

        {/* User List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {filteredUsers.length ? filteredUsers.map((user, index) => {
            const isActive = selectedUser && selectedUser._id === user._id

            return (
              <button
                key={index}
                onClick={() => {
                  setSelectedUser(user)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200
                  ${isActive
                    ? 'bg-primary text-white'
                    : 'bg-base-100 text-primary hover:bg-primary hover:text-white'}
                `}
              >
                {/* Avatar with online dot */}
                <div className="relative avatar">
                  <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      alt={user.fullName}
                    />
                  </div>

                  {/* Status Dot */}
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${
                      user.status === 'online'
                        ? 'bg-green-500 animate-pulse'
                        : 'bg-gray-400'
                    }`}
                  />
                </div>

                {/* Name & Badge */}
                <div className="flex-1 flex flex-col">
                  <span className="text-lg font-medium truncate">{user.fullName}</span>

                  {/* Optional: Relative time */}
                  <span className="text-xs text-gray-400">
                    {user.lastMessageAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {/* Unread Badge */}
                {user.unreadCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                    {user.unreadCount}
                  </span>
                )}
              </button>
            )
          }) : (
            <p className="text-sm text-gray-500 text-center mt-10">No users found.</p>
          )}
        </div>
      </div>
    </>
  )
}
