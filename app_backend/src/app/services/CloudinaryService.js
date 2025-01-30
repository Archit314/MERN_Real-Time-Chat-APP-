import cloudinary from "../lib/cloudinaryConnection.js";

export default class CloudinaryService{

    async imageUpload(image){
        try {
            const uploadedProfilePic = await cloudinary.uploader.upload(image)
            if(!uploadedProfilePic){
                return {status: 422, message: `Failed to upload user on cloud`}
            }

            return {status: 200, message: `Image upload successfully on cloudinary`, data: uploadedProfilePic}
        } catch (error) {
            console.log(`Error in Cloudinary service -> imageUpload`, error.message);
            return {status: 500, message: error.message}
        }
    }
}