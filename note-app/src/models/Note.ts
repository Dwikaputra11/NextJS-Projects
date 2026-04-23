import mongoose, {Document} from "mongoose";

interface INote extends Document {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date; // fixed typo: updateAt → updatedAt
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
        // createdAt: { // old way
        //     type: Date,
        //     default: Date.now
        // },
        // updatedAt: {
        //     type: Date,
        //     default: Date.now
        // },
    },
    // new way automatically add createdAt and updatedAt attribute on request
    {timestamps:true}
);

// no need this anymore
// NoteSchema.pre<INote>("save", function(next){
//     this.updatedAt = new Date();
//     next();
// })

export default mongoose.models.Note || mongoose.model<INote>("Note", NoteSchema);