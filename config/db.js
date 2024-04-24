import mongoose from "mongoose";

const connectDB = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Connected to database ${mongoose.connection.host}`)
    } catch (error) {
        console.log(`MongoDB error ${error}`)
    }
}

export default connectDB
