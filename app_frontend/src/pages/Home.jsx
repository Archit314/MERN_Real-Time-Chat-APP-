import React from 'react'
import { useChatStore } from '../store/useChatStore'
import Sidebar from '../components/common/Sidebar'
import UserChat from './UserChat'
import NoUserChat from './NoUserChat'

export default function Home() {
  const {selectedUser} = useChatStore()
  return (
    <>
      <div className="h-screen flex">
        {/* Sidebar */}
        <Sidebar />
        {/* Chat Section */}
        {selectedUser ? <UserChat />: <NoUserChat />}
      </div>
    </>
  )
}
