import React from 'react'
import { useChatStore } from '../store/useChatStore'
import Sidebar from '../components/common/Sidebar'
import UserChat from './UserChat'
import NoUserChat from './NoUserChat'

export default function Home() {
  const { selectedUser } = useChatStore()

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Chat Section */}
      <div className="flex-1 overflow-hidden">
        {selectedUser ? <UserChat /> : <NoUserChat />}
      </div>
    </div>
  )
}
