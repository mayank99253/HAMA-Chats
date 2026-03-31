import express from 'express';
import dotenv from 'dotenv';

import authRoute from './routes/auth.route.js'
import messageRoute from './routes/message.route.js'
import { connectDB } from './lib/db.js';
dotenv.config();

const app = express();
const Port = process.env.PORT;

app.use(express.json()) // allow inputs to connect with backend , req.body;

//Creating APIs 

app.use("/api/auth", authRoute)
app.use("/api/messages", messageRoute)



app.listen(Port, () => {
    console.log(`Server is Running on Port ${Port}`);
    connectDB()
})