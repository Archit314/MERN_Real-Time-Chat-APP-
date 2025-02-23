import React, { useEffect, useRef, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import toast from 'react-hot-toast'

export default function UserProfile() {

  const {getProfile} = useAuthStore()
  const [profileData, setProfileData] = useState()
  const isFetched = useRef(false)

  useEffect(() => {
    if(isFetched.current) return

    isFetched.current = true

    const fetchProfile = async () => {
      const requestForProfile = await getProfile()
      if(requestForProfile.status == 200){
        toast.success(requestForProfile.message)
        setProfileData(requestForProfile.data)
        
        return
      }
      
      toast.error(requestForProfile.message)
      return
    }

    fetchProfile()
  }, [])

  return (
    <>
      <div className="bg-base-200 min-h-screen flex justify-center items-center overflow-hidden p-4">
        <div className='bg-base-300 text-primary flex flex-col p-6 rounded-xl shadow-xl overflow-hidden max-w-md w-full space-y-4'>

          {/* Profile Avatar */}
          <div className="avatar flex justify-center">
            <div className="mask mask-squircle w-24">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>

          {/* Profile details */}
          {profileData && Object.keys(profileData).map((key) => (
            <div className='bg-base-100 w-full p-2 text-center rounded-lg overflow-hidden' key={key}>
              <h2 className="text-lg font-bold">{key}</h2>
              <p className="text-sm text-base-primary">{profileData[key]}</p>
            </div>
          ))}

          {/* Edit button */}
          <div className='flex justify-center'>
            <button className="btn btn-primary w-full transition duration-500 hover:scale-105">Edit Profile</button>
          </div>
        </div>
      </div>
    </>
  )
}
