// External module or library importing
import jwt from "jsonwebtoken"
import User from "../../models/Users/UserModel.js"

export const userAuth = async (req, res, next) => {

    try {
        const token = req.cookies.jwt_token
        if(!token){
            return res.status(422).json({status: 422, message: `Authentication Failed. Please provide token`})
        }

        const decryptedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        if(!decryptedToken){
            return res.status(422).json({status: 422, message: `Authentication Failed. Invalid token`})
        }

        const existUser = await User.findById(decryptedToken.userId).select('-password')
        if(!existUser){
            return res.status(404).json({status: 404, message: `Authentication Failed. User not found`})
        }

        console.log(`Middleware pass successfully`);
        req.user = existUser
        next()

    } catch (error) {
        console.log("Error in user auth middleware: ", error.message);
        return res.status(500).json({status: 500, message: `Internal server error`})
    }
}