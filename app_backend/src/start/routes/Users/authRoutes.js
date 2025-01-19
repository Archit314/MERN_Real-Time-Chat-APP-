import express from "express"
import { signIn, signUp } from "../../../app/controllers/Users/UserController.js"

const authRoutes = express.Router()

authRoutes.post('/sign-up', signUp)
authRoutes.post('/sign-in', signIn)

export default authRoutes