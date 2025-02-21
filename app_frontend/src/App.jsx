import React, { useEffect } from 'react'
import Navbar from './components/common/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Setting from './pages/Setting'
import UserProfile from './pages/UserProfile'
import { useAuthStore } from './store/useAuthStore'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log(authUser)
  if(isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <span className="loading bg-primary loading-spinner loading-xl"></span>
    </div>
  )

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser? <Home />: <Navigate to="/sign-in"/>} />
        <Route path="/sign-in" element={!authUser? <SignIn />: <Navigate to="/"/>} />
        <Route path="/sign-up" element={!authUser? <SignUp />: <Navigate to="/"/>} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/user-profile" element={authUser? <UserProfile />: <Navigate to="/sign-in"/>} />
      </Routes>

      <Toaster
        position="bottom-left"
        reverseOrder={false}
      />
    </div>
  )
}

export default App
