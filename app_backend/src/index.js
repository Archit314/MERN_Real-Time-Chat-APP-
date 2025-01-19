// External modules or library importing and creating there variable to use further
import express from "express"
const app = express()
import dotenv from "dotenv"
dotenv.config()
const port = process.env.PORT

// Project files importing
import authRoutes from "./start/routes/Users/authRoutes.js"
import { connectDb } from "./app/lib/databaseConnection.js"

app.use(express.json())
app.use('/api/user/auth', authRoutes)

// Starting server and connecting application to mongoDB
app.listen(port, (req, res) => {
    console.log(`Server is running on port: ${port}`)
    connectDb()
})