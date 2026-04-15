import Message from "../models/Message.js"
import User from '../models/User.js'

import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId , io} from "../lib/socket.js";

export const getAllContact = async (req, res) => {
    try {
        const loggedUser = req.user._id;

        const FilterUser = await User.find({ _id: { $ne: loggedUser } }).select("-password")

        res.status(200).json(FilterUser)
    } catch (error) {
        console.error("Error in getAllContact ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const { id: usertochat } = req.params;

        const allmessages = await Message.find({
            $or: [
                { Sender: myId, Reciever: usertochat },
                { Sender: usertochat, Reciever: myId }
            ]
        })

        res.status(200).json(allmessages)
    } catch (error) {
        console.error("Error in getMessagesByUserId", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: Reciever } = req.params;
        const Sender = req.user._id;

        let imageUrl;
        if (image) {
            const uploadResponce = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponce.secure_url;
        }

        const newMessage = new Message({
            Sender,
            Reciever,
            text,
            image: imageUrl,
        })

        await newMessage.save();
        //  Todo - adding the socket io

        const receiverSocketId = getReceiverSocketId(Reciever);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage)
    } catch (error) {
        console.error("Error in sendMessage", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export const getChatsPartners = async (req, res) => {
    try {
        const loggedUserId = req.user._id;

        //find al the messages from data base either sender or receiver

        const messages = await Message.find({
            $or: [{ Sender: loggedUserId }, { Reciever: loggedUserId }]
        });

        const chatPartnerIds = [
            ...new Set(
                messages.map((msg) => 
                    msg.Sender.toString() === loggedUserId.toString() ?
                        msg.Reciever.toString() : msg.Sender.toString()
                )
            )
        ]

        const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select("-password")
        
        res.status(200).json(chatPartners)
    } catch (error) {
        console.error("Error in getChatsPartners", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}