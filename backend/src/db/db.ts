import mongoose from "mongoose";
import env from "../utils/validateEnv"

export async function connectDB(){
    try {
        const MONGO_URL = env.MONGO_URL;
        if (!MONGO_URL) {
            throw new Error("MONGO_URL environment variable is not defined.");
        }

        await mongoose.connect(MONGO_URL);
        const connection = mongoose.connection;

        connection.on("connected",()=>{
            console.log("Mongodb connected succesfully");
        });

        connection.on("error",(err)=>{
            console.log("Mongodb connection error"+err);
            process.exit(1);
        });
    } catch (error) {
        console.log("Mongodb connection error" + error);
    }
}