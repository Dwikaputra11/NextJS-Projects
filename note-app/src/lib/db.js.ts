import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL || "";

let isConnected = false;

export default async function dbConnect(){

    if(isConnected){
        console.log("MongoDB Connected!");
        return;
    }

    try{
        const db = await mongoose.connect(MONGODB_URL);
        // isConnected = db.connection.readyState == 1;
        isConnected = db.connections[0].readyState == 1;
        console.log("Connected to MongoDB: ", db);
    }catch (e) {
        console.error("Failed to connect to MongoDB: ", e);
        throw e;
    }
}