import React from 'react'

export default function UserChat() {
  return (
    <>
      <div className="h-screen flex">
        {/* Chat Section */}
        <div className="w-3/4 bg-base-100 flex flex-col">
          {/* Chat Header */}
          <div className="bg-primary text-white p-4 font-bold text-lg rounded-3xl">Chat with Friend</div>
          
          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <div className="bg-primary text-base-100 p-3 rounded-lg self-start max-w-xs">Hello!</div>
            <div className="bg-primary text-base-100 p-3 rounded-lg self-end max-w-xs ml-auto">Hi there!</div>
          </div>

          {/* Chat Input */}
          <div className="bg-base-200 p-4 flex items-center sticky bottom-0 w-full rounded-3xl">
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="flex-1 bg-base-100 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="ml-2 bg-primary text-white p-2 rounded-lg hover:bg-base-300 hover:text-primary">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
