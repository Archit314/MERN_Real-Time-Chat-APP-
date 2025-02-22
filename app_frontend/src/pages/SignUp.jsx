import React, { useState } from 'react'

export default function SignUp() {

  const [defaultOption, setDefaultOption] = useState('Email')

  return (
    <>
      <div className='bg-base-200 h-screen w-screen flex justify-center items-center'>
        <div className='bg-base-300 text-primary rounded-lg shadow-xl overflow-hidden flex max-w-4xl w-full'>

          {/* Left Section: */}
          <div className='bg-base-300 hidden md:flex w-1/2 p-8 justify-center items-center'>
            Left Section
          </div>

          {/* Right Section: */}
          <div className='bg-base-100 w-full md:w-1/2 p-8'>
            <h1 className='text-center text-3xl font-bold mb-5'>SIGN UP</h1>

            {/* <h4 className='p-5'>Sign Up Option:</h4> */}
            <div className='p-5 flex justify-center gap-5'>
              <label htmlFor="" className=''>Email
                <input
                  type="radio" name="radio-12" checked={defaultOption === 'Email'} onChange={() => setDefaultOption('Email')}
                  className="radio bg-base-300 border-base-300 checked:bg-base-200 checked:text-primary checked:border-primary"/>
              </label>
              <label htmlFor="" className=''>Username
                <input
                  type="radio" name="radio-12" checked={defaultOption === 'Username'} onChange={() => setDefaultOption('Username')}
                  className="radio bg-base-300 border-base-300 checked:bg-base-200 checked:text-primary checked:border-primary"/>
              </label>
            </div>

            {/* Form */}
            <form className='p-5 rounded-lg space-y-5 text-base'>
              <div>
                <label htmlFor="" className='block'>{defaultOption}</label>
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
