# Note App
A Note Application using Next.Js and MongoDB. There some insight that i get from this.

## Database Configuration
This project using MongoDB as the database. You can import the library using this:
```shell
npm install mongoose

bun install mongoose
```
To connect with database you can make function like this
```javascript
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
```

`isConnected` use to handle is the database already connect, so it's not reconnect every time page refresh

This is also part of `Edge Function` implementation.

## Model
There is some way to declare the models. But i wanna try to approach the popular one.

```javascript
interface INote extends Document {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date; 
}

const NoteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            maxLength: 100
        },
        content: {
            type: String,
            required: true,
            maxLength: 2000
        },
    },
    {timestamps:true} // automatically add createdAt and updatedAt
);

export default mongoose.models.Note || mongoose.model<INote>("Note", NoteSchema);
```

## CRUD Operation





**Resource Links:**
- [Edge Function](https://medium.com/@vdsnini/edge-functions-in-next-js-what-they-are-and-when-to-use-them-14d0e1662cf4)
