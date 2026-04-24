import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

let isConnected = false;

async function dbConnect() {

  if(isConnected){
    console.log("MongoDB Connected!");
    return;
  }

  try{
    const db = await mongoose.connect(MONGODB_URI);
    isConnected = db.connections[0].readyState == 1;
    console.log("Connected to MongoDB: ", db);
  }catch (e) {
    console.error("Failed to connect to MongoDB: ", e);
    throw e;
  }
}

export default dbConnect;