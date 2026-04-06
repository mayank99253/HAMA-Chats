import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    Sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    Reciever:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    text:{
        type:String,
        trim:true,
        maxlength:2000,
    },
    image:{
        type:String,
    }
},{timestamps:true})

const Message = mongoose.model("Message",MessageSchema)

export default Message