import mongoose from "mongoose";

export const connectDB = async () => {
    const password = process.env.DB_PASSWORD;
    const DB_URI = "";
    try{
        await mongoose.connect(DB_URI);
        console.log("MongoDB connected successfully");        
    }
    catch(err){
        console.log("mongo error", err.message);
    }
}