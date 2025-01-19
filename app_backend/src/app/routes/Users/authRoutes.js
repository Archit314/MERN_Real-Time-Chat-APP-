import express from "express"
import { signIn, signUp } from "../../controllers/Users/UserController.js"

const authRoutes = express.Router()

authRoutes.get('/sign-up', signUp)
authRoutes.post('/sign-in', signIn)

export default authRoutes