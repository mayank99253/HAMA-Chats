import express from 'express';
import dotenv from 'dotenv';

import authRoute from './routes/auth.route.js'
import messageRoute from './routes/message.route.js'

dotenv.config();

const app = express();
const Port = process.env.PORT;

//Creating APIs 

app.use("/api/auth", authRoute)
app.use("/api/messages", messageRoute)



app.listen(Port, () => {
    console.log(`Server is Running on Port ${Port}`);
})