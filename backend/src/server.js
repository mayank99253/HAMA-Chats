import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import authRoute from './routes/auth.route.js'
import messageRoute from './routes/message.route.js'
import { connectDB } from './lib/db.js';
dotenv.config();

const app = express();
const Port = process.env.PORT || 3000;

app.use(express.json({"limit":"5MB"})) // allow inputs to connect with backend , req.body;
app.use(cookieParser())
//Creating APIs 

app.use("/api/auth", authRoute)
app.use("/api/messages", messageRoute)


const startServer = async () => {
    await connectDB();
    app.listen(Port, () => {
        console.log(`Server is Running on Port ${Port}`);
    });
};

startServer();