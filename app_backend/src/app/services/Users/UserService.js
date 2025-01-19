// Importing external modules or library
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Mthod to generate JWT (JSON web token):
export const generateJwtToken = async (tokenPayload, res) => {

    // Creating JWT token:
    const jwtToken = await jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY, {
        expiresIn: 60 * 60,
    })

    // Setting jwt token in user cookies:
    await res.cookie("jwt_token", jwtToken, {
        maxAge: 300000,
        httpOnly: true, // Prevent xss attacks cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development"
    })

    console.log('Token generated successfully');
    return jwtToken
}

// Method to create hash password:
export const generateHashPassword = async (password) => {
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