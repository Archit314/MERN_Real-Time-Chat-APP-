import React from 'react';

export default function UserChat() {
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-base-100 rounded-none md:rounded-lg shadow-md overflow-hidden">
      {/* Chat Header */}
      <div className="bg-primary text-white p-4 font-semibold text-xl shadow z-10">
        Chat with Friend
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {/* Sample Message Blocks */}
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`flex items-end ${i % 2 === 0 ? 'justify-start' : 'justify-end'} gap-2`}>
            {i % 2 === 0 && (
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Friend" />
                </div>
              </div>
            )}
            <div className={`${i % 2 === 0 ? 'bg-base-300 text-primary' : 'bg-primary text-white'} px-4 py-2 rounded-b-xl ${i % 2 === 0 ? 'rounded-tr-xl' : 'rounded-tl-xl'} max-w-xs`}>
              {i % 2 === 0 ? 'Hey! How\'s everything going?' : 'All good! Just working on a new project.'}
            </div>
            {i % 2 !== 0 && (
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="You" />
                </div>
              </div>
            )}
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
