//import form Libraries 
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import cors from 'cors';

//import form Files
import authRoute from './routes/auth.route.js'
import messageRoute from './routes/message.route.js'
import { connectDB } from './lib/db.js';
import { ENV } from './lib/env.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    // Make sure this matches exactly what you see in your browser address bar
    origin: "http://localhost:5173", 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({"limit":"5MB"})) // allow inputs to connect with backend , req.body;
app.use(cookieParser())
//Creating APIs 

app.use("/api/auth", authRoute)
app.use("/api/messages", messageRoute)


const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is Running on Port ${PORT}`);
    });
};

startServer();