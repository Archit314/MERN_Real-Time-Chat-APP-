// Importing external modules or library

// Importing internal modules
import UserService from "../../services/Users/UserService.js";

// Function used to signup fresh user on over application:
export const signUp = async (req, res) => {
    try {
        // Getting payload parameter from the request:
        const { fullName, userName, mobileNumber, email, password, profilePic} = req.body;

        if(!fullName || !userName || !mobileNumber || !email || !password){
            return res.status(422).json({status: 422, message: "Please fill all the fields."});
        }
        // If password is less then 6 characters
        if(password.length < 6){
            return res.status(422).json({status: 422, message: `Please provide 6 or more charater for password`})
        }

        const userService = new UserService()
        const createdUser = await userService.userSignUp(email, mobileNumber, password, fullName, userName, profilePic, res)
        
        if(createdUser.status != 200){
            return res.status(422).json({status: createdUser.status, message: createdUser.message})
        }
        return res.status(200).json({status: createdUser.status, message: createdUser.message, data: createdUser.data})
    } catch (error) {
        console.log(`Error in the UserController -> signUp: `, error.message);
        return res.status(500).json({status: 500, message: `Internal server error`})
    }
}

// Method to handle user sign in:
export const signIn = async (req, res) => {

    const {email, password, userName, loginWithEmail} = req.body

    try {

        if(!password){
            return res.status(422).json({status: 422, message: "Please provide password"})
        }

        if(loginWithEmail){
            if(!email){
                return res.status(422).json({status: 422, message: `Please provide email`})
            }
        }
        else{
            if(!userName){
                return res.status(422).json({status: 422, message: `Please provide username`})
            }            
        }

        const userService = new UserService()
        const getSignInDetail = await userService.userSignIn(loginWithEmail, password, email, userName, res)
        if(!getSignInDetail){
            return res.send(422).json({status: getSignInDetail.status, message: getSignInDetail.message})
        }
        return res.status(200).json({status: getSignInDetail.status, message: getSignInDetail.message, data: getSignInDetail.data})

    } catch (error) {
        console.log(`Error in the UserController -> signIn: `, error.message);
        return res.status(500).json({status: 500, message: `Internal server error`})
    }

}

// Method to check whether user is authenticated or not:
export const authCheck = async (req, res) => {
    try {
        return res.status(200).json(req.user)
    } catch (error) {
        console.log(`Error in UserController -> authCheck: `, error.message);
        return res.status(500).json({status: 500, message: `Internal server error`})
    }
}

// Method to handle user profile update:
export const profileUpdate = async (req, res) => {

    try {
        const {path} = req.file
        const userId = req.user._id
        let profilePic = path

        if(!profilePic){
            return res.status(422).json({status: 422, message: `Please provide profile picture.`})
        }

        const userService = new UserService()
        const uploadedProfilePic = await userService.uploadProfilePic(profilePic, userId)
        if(uploadedProfilePic.status !== 200){
            return res.status(uploadedProfilePic.status).json({status: uploadedProfilePic.status, message: uploadedProfilePic.message, data: uploadedProfilePic.data})
        }

        return res.status(uploadedProfilePic.status).json({status: uploadedProfilePic.status, message: uploadedProfilePic.message, data: uploadedProfilePic.data})

    } catch (error) {
        console.log(`Error in the UserController -> profileUpdate: `, error.message);
        return res.status(500).json({status: 500, message: `Internal server error`})
    }
}