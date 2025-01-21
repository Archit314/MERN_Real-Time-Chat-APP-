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
        res.status(500).json({status: 500, message: `Internal server error`})
    }
}

export const signIn = (req, res) => {
    res.send('signIned')
}