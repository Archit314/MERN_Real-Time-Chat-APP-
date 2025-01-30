import Message from "../../models/Message/MessageModel.js";
import CloudinaryService from "../CloudinaryService.js";

export default class MessageService{

    async sendMessage(myId, receiverId, text, image){

        try {
            let imageUrl = null
            if(image){
                const cloudinaryService = new CloudinaryService()
                const uploadImage = await cloudinaryService.imageUpload(image)
                
                if(uploadImage.status === 200){
                    imageUrl = uploadImage.data.secure_url
                }
                else{
                    return {status: uploadImage.status, message: uploadImage.message}
                }
            }
    
            const newMessage = new Message()
            newMessage.senderId = myId
            newMessage.receiverId = receiverId
            newMessage.text = text
            newMessage.image = imageUrl
    
            await newMessage.save()
            console.log(`Send message created successfully`);
            
            return {status: 200, message: "Message sent successfully"}
        } catch (error) {
            console.log(`Error in MessageService -> sendMessage: `, error.message);
            return {status: 500, message: error.message};
        }
    }
}