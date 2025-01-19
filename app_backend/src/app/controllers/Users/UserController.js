// Importing external modules or library
import bcrypt from "bcryptjs"

// Importing internal modules
import User from "../../models/Users/UserModel.js";
import { generateHashPassword, generateJwtToken } from "../../services/Users/UserService.js";

// Function used to signup fresh user on over application:
export const signUp = async (req, res) => {
    try {
        // Getting payload parameter from the request:
        const { fullName, userName, mobileNumber, email, password, profilePic} = req.body;

        // If password is less then 6 characters
        if(password.length < 6){
            return res.status(422).json({status: 422, message: `Please provide 6 or more charater for password`})
        }

        // Safety checks it user already exist with email or mobile number
        const existUserWithEmail = await User.findOne({email})
        if(existUserWithEmail){
            return res.status(422).json({status: 422, message: `Usre already exist with email: ${email}`})
        }
        else{
            const existUserWithMobile = await User.findOne({mobileNumber})
            if(existUserWithMobile){
                return res.status(422).json({status: 422, message: `User already exist with mobile number: ${mobileNumber}`})
            }
        }

        const encryptedPassword = await generateHashPassword(password)
        if(!encryptedPassword){
            return res.status(500).json({status: 500, message: `User signup process failed`})
        }

        // Creating new user on mongo DB cluster:
        const newUser = new User({
            fullName: fullName,
            userName: userName,
            mobileNumber: mobileNumber,
            email: email,
            password: encryptedPassword,
            profilePic: profilePic? profilePic: ''
        })

        if(newUser){
            // Generating new JWT token:
            const generatedJwtToken = await generateJwtToken({userId: newUser._id, email: newUser.email, mobileNumber: newUser.mobileNumber}, res)
            if(!generatedJwtToken){
                return res.status(422).json({status: 422, message: `User registration failed`}) 
            }
            // Saving new user on mongoDB cluster:
            await newUser.save()
            console.log('user generated successfully');

            // Generating response for frontend:
            const response = {
                userId: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                mobileNumber: newUser.mobileNumber,
                email: newUser.email,
                accessToken: generatedJwtToken
            }
            return res.status(200).json({status: 200, message: `User signup successfully`, response})
        }
        else{
            return res.status(422).json({status: 422, message: `Failed to signup user into our system`})
        }
    } catch (error) {
        console.log(`Error in the UserController -> signUp`, error.message);
        res.status(500).json({status: 500, message: `Internal server error`})
    }
}

export const signIn = (req, res) => {
    res.send('signIned')
}