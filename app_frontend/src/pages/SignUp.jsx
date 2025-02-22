import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

export default function SignUp() {

  const {signUp} = useAuthStore()

  // State to hold form fields value:
  const initialFormFields = {
    fullname: '',
    username: '',
    mobileNumber: '',
    email: '',
    password: ''
  }
  const [formFields, setFormFields] = useState(initialFormFields)

  // Handler for on change event of input fields:
  const handleOnChange = (e) => {
    let {id, value} = e.target
    setFormFields({...formFields, [id]: value})
  }

  // Handler for form validation:
  const formValidation = async () => {

    if(!formFields.fullname){
      return {
        status: 'ERROR',
        message: 'Full Name is required'
      }
    }
    if(!formFields.username){
      return {
        status: 'ERROR',
        message: 'Username is required'
      }
    }
    if(!formFields.mobileNumber){
      return {
        status: 'ERROR',
        message: 'Mobile Number is required'
      }
    }
    if(!formFields.email){
      return {
        status: 'ERROR',
        message: 'Email is required'
      }
    }
    if(!formFields.password){
      return {
        status: 'ERROR',
        message: 'Password is required'
      }
    }

    return {
      status: 'SUCCESS',
      message: 'Form fields are valid'
    }
  }

  const handleSubmit =  async(e) => {
    e.preventDefault()

    const formValidationResponse = await formValidation()
    if(formValidationResponse.status === 'SUCCESS'){

      const requestPayload = {
        fullName: formFields.fullname,
        userName: formFields.username,
        mobileNumber: formFields.mobileNumber,
        email: formFields.email,
        password: formFields.password
      }

      const requestForSignUp = await signUp(requestPayload)
      if(requestForSignUp.status === 200){
        toast.success(requestForSignUp.message)
        return
      }
      else{
        toast.error(requestForSignUp.message)
        return
      }
    }

    toast.error(formValidationResponse.message)
  }


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

            {/* Form */}
            <form className='p-5 rounded-lg space-y-5 text-base' onSubmit={handleSubmit}>
              <div>
                <label htmlFor="" className='block'>Full Name</label>
                <input id='fullname' type="text" className='w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none' value={formFields.fullname} onChange={handleOnChange}/>
              </div>
              <div>
                <label htmlFor="" className='block'>User Name</label>
                <input id='username' type="text" className='w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none' value={formFields.username} onChange={handleOnChange}/>
              </div>
              <div>
                <label htmlFor="" className='block'>Mobile Number</label>
                <input id='mobileNumber' type="tel" pattern="[0-9]{10}" className='w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none' value={formFields.mobileNumber} onChange={handleOnChange}/>
              </div>
              <div>
                <label htmlFor="" className='block'>Email</label>
                <input id='email' type="email" className='w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none' value={formFields.email} onChange={handleOnChange}/>
              </div>
              <div>
                <label htmlFor="" className='block'>Password</label>
                <input id='password' type="password" className='w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none' value={formFields.password} onChange={handleOnChange}/>
              </div>

              <button className="w-full btn  btn-primary transition duration-500">Sign Up</button>
            </form>

            <div>
              <p className='text-center'>Already have an account? <Link to="/sign-in" className='text-primary hover:underline'>Sign In</Link></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
