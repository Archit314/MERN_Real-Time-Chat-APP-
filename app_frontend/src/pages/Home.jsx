import React from 'react'

export default function Home() {
  return (
    <>
      <div className="h-screen flex">
        <div className='bg-base-300 w-1/4 p-4 text-primary flex flex-col'>
          <h1 className='mb-4 font-bold text-2xl'>Friends</h1>
          <div className="space-y-6 space-x-2 overflow-y-auto flex-1">
            {[...Array(60)].map((_, index) => (
              <div key={index} className="bg-base-100 flex items-center space-x-3 p-2 rounded-lg hover:bg-primary hover:text-base-100 cursor-pointer">
                <div className="avatar avatar-online">
                  <div className="w-12 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <span className="text-lg">Friend {index + 1}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Chat Section */}
        <div className="w-3/4 bg-base-200 flex items-center justify-center space-x-5">
            <div>
                <img src="/vaartalap.jpg" alt="My Image" style={{ width: '100px' }}/>
            </div>
            <div>
                Welcome to VaartaLap
            </div>
        </div>
      </div>
    </>
  )
}
