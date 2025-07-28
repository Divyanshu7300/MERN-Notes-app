// import dotenv from "dotenv";
// dotenv.config();
import mongoose from "mongoose"

export const connectdb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB CONNECTED SUCCESSFULLY!");
    }catch(error){
        console.error("Error connectiong to mongodb",error);
        process.exit(1)

    };
      
}