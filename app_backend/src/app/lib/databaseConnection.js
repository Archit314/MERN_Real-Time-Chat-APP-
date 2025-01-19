import mongoose from "mongoose"

export const connectDb = async () => {
    try {
        const connectedToMongo = await mongoose.connect(process.env.MONGODB_CONNECTION_URL)
        if(connectedToMongo){
            console.log(`Connected to MongoDB at HOST: ${connectedToMongo.connection.host}`)
        }
        else{
            console.log("Failed to connect to MongoDB")
        }
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error)
    }
}