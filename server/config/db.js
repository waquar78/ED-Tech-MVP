import mongoose from "mongoose";

const connectDb=async()=>{
    try {
      await  mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB connected SUCCESSFULLY");
      
    } catch (error) {
        console.log("mongodb connection failed");
        
        
    }
}

export default connectDb