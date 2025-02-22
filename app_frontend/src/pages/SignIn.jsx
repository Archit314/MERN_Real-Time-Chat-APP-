import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'

export default function SignIn() {

  const {signIn} = useAuthStore()

  // Initial form fields value:
  let initialFormFields = {
    email: '',
    password: ''
  }

  // State to hold form fields value:
  let [formFields, SetFormFields] = useState(initialFormFields)

  // Handler for on change event:
  const handleOnChange = (e) => {

    // Destructure id and value from e.target:
    let {id, value} = e.target

    // Update formFields state:
    SetFormFields({...formFields, [id]: value})
  }

  // Handler for form validation:
  const formValidation = async () => {
    // Check if email and password are not empty:
    if(!formFields.email){
      return {
        status: 'ERROR',
        message: 'Email is required'
      }
    }
    else if(!formFields.password){
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

  // Handler for form submit event:
  const handleSubmit = async (e) => {
    // Prevent default behaviour of form:
    e.preventDefault()

    const formValidationResponse = await formValidation()
    // Check form validation:
    if(formValidationResponse.status === 'SUCCESS'){
      // Request payload:
      const requestPayload = {
        email: formFields.email,
        password: formFields.password,
        loginWithEmail: true
      }

      // Calling sign in API:
      const requestForSignIn = await signIn(requestPayload)
      
      if(requestForSignIn.status === 200){
        // Show success toast message:
        toast.success(requestForSignIn.message)
        return
      }
      else{
        // Show error toast message:
        toast.error(requestForSignIn.message)
        return
      }

    }

    // Show error toast message when form fields are not valid:
    toast.error(formValidationResponse.message)
  }

  return (
    <>
    <div className='bg-base-200 h-screen w-screen flex justify-center items-center'>
      <div className='bg-blue-500 flex rounded-lg shadow-xl overflow-hidden max-w-4xl w-full'>
        {/* Left Section */}
        <div className='bg-base-300 text-primary hidden md:flex w-1/2 items-center justify-center p-8'>
          left section
          {/* image  */}
        </div>
        {/* Right Section */}
        <div className='bg-base-100 text-primary w-full md:w-1/2 p-8'>
          <h2 className='text-center text-3xl font-bold mb-5'>SIGN IN</h2>

          <form className='p-5 rounded-lg space-y-5 text-base' onSubmit={handleSubmit}>
            <div>
              <label htmlFor="" className='block'>Email</label>
              <input id='email' type="email" className='w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none' value={formFields.email} onChange={handleOnChange}/>
            </div>
            <div>
              <label htmlFor="" className='block'>Password</label>
              <input id='password' type="password" className='w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none' value={formFields.password} onChange={handleOnChange}/>
            </div>

            <button className="w-full btn  btn-primary transition duration-500">Sign In</button>
          </form>

          <div>
            <p className='text-center'>Don't have an account? <Link to="/sign-up" className='text-primary hover:underline'>Sign Up</Link></p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
