// Importing external modules or library
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import cloudinary from "../../lib/cloudinaryConnection.js"

// Importing internal modules
import User from "../../models/Users/UserModel.js"

export default class UserService{

    // Mthod to generate JWT (JSON web token):
    async generateJwtToken(tokenPayload, res){

        // Creating JWT token:
        const jwtToken = await jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h',
        })

        // Setting jwt token in user cookies:
        await res.cookie("jwt_token", jwtToken, {
            maxAge: 3600000, // 1 hour (60 * 60 * 1000)
            httpOnly: true, // Prevent xss attacks cross-site scripting attacks
            sameSite: process.env.NODE_ENV !== "development"? "none": "lax", // CSRF attacks cross-site request forgery attacks or // Allows cross-site requests
            secure: process.env.NODE_ENV !== "development" // Ensures cookie is only sent over HTTPS
        })

        console.log('Token generated successfully');
        return jwtToken
    }

    // Method to get JWT (JSON Web Token):
    async getJwtToken(password, encryptedPassword, tokenObject, res){

        const passwordCorrect = await bcrypt.compare(password, encryptedPassword)
        if (!passwordCorrect) {
            return false
        }
        console.log('Enter password and encrypted password are equal');

        // Generating JWT token:
        const generatedToken = await this.generateJwtToken(tokenObject, res)
        if(!generatedToken){
            return false
        }

        return generatedToken
    }

    // Method to create hash password:
    async generateHashPassword(password){

        try {
            const salt = await bcrypt.genSalt(10)   // This method is to generate a random string called a "salt" which is added to a password before hashing, making the resulting hash unique and more secure against rainbow table attacks
            const encryptedPassword = await bcrypt.hash(password, salt)

            console.log('Password hashed successfully');
            return encryptedPassword
        } catch (error) {
            console.error(error)
            return false
        }
    }

    // Method to handle user Sign-up process:
    async userSignUp(email, mobileNumber, password, fullName, userName, profilePic, res){

        // Safety checks it user already exist with email or mobile number
        const existUserWithEmail = await User.findOne({email})
        if(existUserWithEmail){
            return {status: 422, message: `Usre already exist with email: ${email}`}
        }
        else{
            const existUserWithMobile = await User.findOne({mobileNumber})
            if(existUserWithMobile){
                return {status: 422, message: `User already exist with mobile number: ${mobileNumber}`}
            }
        }

        const encryptedPassword = await this.generateHashPassword(password)
        if(!encryptedPassword){
            return {status: 500, message: `User signup process failed`}
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
            const generatedJwtToken = await this.generateJwtToken({userId: newUser._id, email: newUser.email, mobileNumber: newUser.mobileNumber}, res)
            if(!generatedJwtToken){
                return {status: 422, message: `User registration failed`}
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
            return {status: 200, message: `User signup successfully`, data: response}
        }
        else{
            return {status: 422, message: `Failed to signup user into our system`}
        }
    }

    // Method to handle user sign-in process:
    async userSignIn(loginWithEmail, password, email, userName, res){

        let user
        if(loginWithEmail){
            user = await User.findOne({email: email})
            if(!user){
                return {status: 422, message: `User with provided email not found, please sign-up first`}
            }
        }
        else{
            user = await User.findOne({userName: userName})
            if(!user){
                return {status: 422, message: `User with provided user name not found, please sign-up first`}
            }
        }

        const tokenObject = {
            userId: user._id,
            email: user.email,
            mobileNumber: user.mobileNumber
        }

        const getJwtToken = await this.getJwtToken(password, user.password, tokenObject, res)
        if(!getJwtToken){
            return {status: 422, message: `Incorrect credentials`}
        }

        return {status: 200, message: `User sign-in successfully`, data: getJwtToken}
    }

    // Method to handle profile pic upload on cloudinary:
    async uploadProfilePic(profilePic, userId){
        try {

            const uploadedProfilePic = await cloudinary.uploader.upload(profilePic)
            if(!uploadedProfilePic){
                return {status: 422, message: `Failed to upload user on cloud`}
            }
    
            console.log(`Image uploaded successfully`);
            
            const uploadedProfile = await this.updateUserProfile(userId, uploadedProfilePic)
            if(uploadedProfile.status !== 200){
                return {status: uploadedProfile.status, message: uploadedProfile.message}
            }
    
            return {status: uploadedProfile.status, message: uploadedProfile.message, data: uploadedProfile.data}
        } catch (error) {
            console.log(`Error in UserService -> uploadProfilePic: `, error.message);
            return {status: 500, message: error.message}
        }
    }

    // Method to update user profile into the database:
    async updateUserProfile(userId, uploadedProfilePic){

        const existUser = await User.findByIdAndUpdate(userId, {profilePic: uploadedProfilePic.secure_url}, {new: true})
        if(!existUser){
            console.log(`Failed to update profile pic of user into the DB`);
            return {status: 422, message: `Failed to update profile pic of user into the DB`}
        }
        else{
            console.log(`User profile pic updated successfuly in the DB`);
            return {status: 200, message: `User profile pic updated successfuly in the DB`, data: existUser}
        }
    }
}