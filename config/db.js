import mongoose from "mongoose";

export const connectDB = async () => {
    const password = process.env.DB_PASSWORD;
    const DB_URI = `mongodb+srv://efrat79071:${password}@cluster0.ixesqfn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0` || 'mongodb://127.0.0.1/storeDB';
    try{
        await mongoose.connect(DB_URI);
        console.log("MongoDB connected successfully");        
    }
    catch(err){
        console.log("mongo error", err.message);
    }
}