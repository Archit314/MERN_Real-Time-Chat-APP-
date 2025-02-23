// Importing external modules or library:
import express from "express"
import multer from "multer"

// Importing internal modules or library:
import { authCheck, getProfile, logout, profileUpdate, signIn, signUp } from "../../../app/controllers/Users/UserController.js"
import { userAuth } from "../../../app/middleware/UserAuth/UserAuthMiddleware.js"

// Getting Router from express module:
const authRoutes = express.Router()

const upload = multer({ dest: 'uploads/' })

// Route to handle user sign-up:
authRoutes.post('/sign-up', signUp)

// Route to handle user sign-in:
authRoutes.post('/sign-in', signIn)

// Route to handle user logout:
authRoutes.post('/logout', logout)

// Route to check wheather user is authenticated or not:
authRoutes.get('/check', userAuth, authCheck)

// Route to get user Profile:
authRoutes.get('/profile', userAuth, getProfile)

// Route to handle user profile update:
authRoutes.put('/profile/update', userAuth, upload.single('profilePic'), profileUpdate)

export default authRoutes