import React from 'react'

export default function Home() {
  return (
    <>
      <div className="h-screen flex">
        <div className='bg-base-300 w-1/4 p-4 text-primary flex flex-col'>
          <h1 className='mb-4 font-bold text-2xl'>Friends</h1>
          <div className="space-y-3 overflow-y-auto flex-1">
          {[...Array(60)].map((_, index) => (
            <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-base-100 cursor-pointer">
              <div className="avatar offline">
                <div className="w-15 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <span className="text-lg">Friend {index + 1}</span>
            </div>
          ))}
        </div>
        </div>
        {/* Chat Section */}
        <div className="w-3/4 bg-base-200 flex flex-col">
          {/* Chat Header */}
          <div className="bg-primary text-white p-4 font-bold text-lg">Chat with Friend</div>
          
          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <div className="bg-base-300 text-primary p-3 rounded-lg self-start max-w-xs">Hello!</div>
            <div className="bg-base-100 p-3 rounded-lg self-end max-w-xs ml-auto">Hi there!</div>
          </div>

          {/* Chat Input */}
          <div className="bg-base-100 p-4 flex items-center border-t">
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="ml-2 bg-base-300 text-white p-2 rounded-lg hover:bg-primary">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
