import * as mongoose from "mongoose";

const MONGODB_URI: string = process.env.MONGODB_URI || "";

if(!MONGODB_URI || MONGODB_URI.trim() === ""){
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose;

if(!cached){
  cached = global.mongoose = {conn: null, promise: null};
}

async function  connectDB(){
  if(cached.conn){
    return cached.conn;
  }

  if(!cached.promise){
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      console.log("MongoDB Connected");
      return mongoose
    })
  }

  try{
    cached.conn = await cached.promise;
  }catch (e) {
    throw e;
  }

  console.log("cached", cached);

  return cached;
}

export default connectDB;