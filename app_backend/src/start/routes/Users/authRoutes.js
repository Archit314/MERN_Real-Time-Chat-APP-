import express from "express"
import { profileUpdate, signIn, signUp } from "../../../app/controllers/Users/UserController.js"
import { userAuth } from "../../../app/middleware/UserAuth/UserAuthMiddleware.js"

const authRoutes = express.Router()

// Route to handle user sign-up:
authRoutes.post('/sign-up', signUp)

// Route to handle user sign-in:
authRoutes.post('/sign-in', signIn)

// Route to handle user profile update:
authRoutes.put('/profile/update', userAuth, profileUpdate)

export default authRoutes