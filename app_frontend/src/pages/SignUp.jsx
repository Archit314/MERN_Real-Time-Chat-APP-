import React from 'react'

export default function SignUp() {
  return (
    <>
      <div className='bg-base-200 h-screen w-screen flex justify-center items-center'>
        <div className='bg-base-300 rounded-lg shadow-xl overflow-hidden flex max-w-4xl w-full'>

          {/* Left Section: */}
          <div className='bg-base-300 hidden md:flex w-1/2 p-8'>
            Left Section
          </div>

          {/* Right Section: */}
          <div className='bg-base-100 text-primary w-full md:w-1/2 p-8'>
            <h1 className='text-center text-3xl font-bold mb-5'>Sign up</h1>

            {/* Form */}
            <form className='p-5 rounded-lg space-y-5 text-base'>
              <div>
                <label htmlFor="" className='block'>Email</label>
                <input id='email' type="email" className='w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none'/>
              </div>
              <div>
                <label htmlFor="" className='block'>Password</label>
                <input id='password' type="password" className='w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none' />
              </div>

              <button className="w-full btn  btn-primary transition duration-500">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
