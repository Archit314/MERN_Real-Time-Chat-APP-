// Importing external files:
import express from "express"
import multer from "multer"

// Importing internal files:
import { userAuth } from "../../../app/middleware/UserAuth/UserAuthMiddleware.js"
import { getChatMessages, messageSend, users } from "../../../app/controllers/Messages/MessageController.js"

const messageRoutes = express.Router()
const upload = multer({ dest: "uploads/" })

messageRoutes.post('/users', userAuth, users)
messageRoutes.post('/:receiverId', userAuth, getChatMessages)
messageRoutes.post('/send/:receiverId', userAuth, upload.single('image'), messageSend)

export default messageRoutes