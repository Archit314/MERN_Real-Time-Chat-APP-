// External modules or library importing and creating there variable to use further
import express from "express"
const app = express()
import cookieParser from "cookie-parser"
import cors from"cors"
import dotenv from "dotenv"

dotenv.config()
const port = process.env.PORT
import { connectDb } from "./app/lib/databaseConnection.js"

// Project files importing
import authRoutes from "./start/routes/Users/authRoutes.js"
import messageRoutes from "./start/routes/Messages/messageRoutes.js"

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use('/api/user/auth', authRoutes)
app.use('/api/user/messages', messageRoutes)

// Starting server and connecting application to mongoDB
app.listen(port, (req, res) => {
    console.log(`Server is running on port: ${port}`)
    connectDb()
})