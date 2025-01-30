// Importing external files:

// Importing internal files:
import Message from "../../models/Message/MessageModel.js";
import User from "../../models/Users/UserModel.js";
import MessageService from "../../services/Messages/MessageService.js";

export const users = async (req, res) => {

    try {
        
        const loggedInUserId = req.user._id
        const users = await User.find({_id: {$ne: loggedInUserId}}).select("-password")

        if(users.length == 0){
            return res.status(200).json({status: 200, message: "No users found", users: []})
        }

        return res.status(200).json({status: 200, message: `Users found successfully`, data: users})
    } catch (error) {
        console.log(`Error in the MessageController -> users: `, error.message);
        return res.status(500).json({status: 500, message: 'Internal server error'})
    }
}

export const getChatMessages = async (req, res) => {

    try {

        const {receiverId} = req.params
        const myId = req.user._id

        if(!receiverId || !myId){
            return res.status(422).json({status: 422, message: "Invalid request",})
        }

        const messages = await Message.find(
            {
                $or: [
                    {
                        senderId: myId,
                        receiverId: receiverId
                    },
                    {
                        senderId: receiverId,
                        receiverId: myId
                    }
                ]
            }
        )

        return res.status(200).json({status: 200, message: `Messages received successfully`, data: messages})
        
    } catch (error) {
        console.log(`Error in MessageController -> getChatMessages: `, error.message);
        return res.status(500).json({status: 500, message: 'Internal server error'})        
    }
}

export const messageSend = async (req, res) => {
    
    try {

        const {receiverId} = req.params
        const {text} = req.body
        const myId = req.user._id

        const imagePath = req.file? req.file.path: null
        // let image = path

        if(!myId || !receiverId){
            return res.status(422).json({status: 422, message: "Invalid request"})
        }

        if(!text && !imagePath){
            return res.status(422).json({status: 422, message: `Please provide either text or image`})
        }
        const endUser = await User.findById(receiverId)
        if(!endUser){
            return res.status(422).json({status: 422, message: "User not found with the provided id"})
        }

        const messageService = new MessageService()
        const sendMessage = await messageService.sendMessage(myId, receiverId, text, imagePath)

        if(sendMessage.status !== 200){
            return res.status(sendMessage.status).json({status: sendMessage.status, message: sendMessage.message})
        }

        return res.status(sendMessage.status).json({status: sendMessage.status, message: sendMessage.message})
        
    } catch (error) {
        console.log(`Error in MessageController -> messageSend: `, error.message);
        return res.status(500).json({status: 500, message: 'Internal server error'})
    }
}