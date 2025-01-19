import express from "express"
import authRoutes from "./app/routes/Users/authRoutes.js"

const app = express()

app.use('/api/user/auth', authRoutes)

app.listen(5000, (req, res) => {
    console.log('Server is running on port 5000')
})