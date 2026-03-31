
# Project Title 
## HAMA Chats ( Real Time chat App )

This Application use for Sending & Recieving the Messages to the one user to 2nd user ; 


## Create Two Folders

[Backend](https://linktodocumentation)

[Frontend](https://linktodocumentation)


## Frontend Setup 

We Use Vite for Frontend 

```bash
  npm i vite
```

## Backend Setup 

We use Multiple Packages for Backend. Run Commands one by one

Create Package.json file

```bash
  npm init -y
```

```bash
   npm i express@4.21.2
```
```bash
   npm i mongoose@8.10.1 jsonwebtoken@9.0.2 bcryptjs@2.4.3
```
```bash
npm i nodemon -D 
```

## create the Server.js File in the Backend

```javascript
import express from 'express'
const Port = 3000
const app = express();

app.listen(Port, () => {
    console.log("Server is Running on Port 3000");

})
```

Create The Server and Start it.

## Running Tests

To run tests, run the following command

```base
nodemon Server.js
```
## Create Api 
```javascript
app.get("/api/auth/signup",(req, res)=>{
    res.send("Sign Up Page");
})

app.get("/api/auth/login",(req , res)=>{
    res.send("Login Page");
});

app.get("/api/auth/logout",(req , res)=>{
    res.send("Logout Page");
})
```


## Create src folder and cut and paste the server.js file inside
the src folder.

```javascript
src__
         |-server.js
```

## Create .env file in the backend

```javascript
backend__
                  |- node_modules
                  |- src
                  |- .env
                  |- package-lock.json
                  |- package.json
```

and Keep this code 
```javascript
PORT = 3000
MONGO_URI = my_db_connection_URL;

NODE_ENV = development;
```

use the PORT and others like
```javascript
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const Port = process.env.PORT;

```

## Create Two Folder 

contollers
routes 

create the auth.route.js file for managing the all out apis

```javascript
import express from "express"

const router = express.Router()

router.get("/signup",(req, res)=>{
    res.send("Sign Up Page");
})

router.get("/login",(req , res)=>{
    res.send("Login Page");
});

router.get("/logout",(req , res)=>{
    res.send("Logout Page");
})

export default router;
```

and Change the Server.js file code 

import the authRoute from auth.route.js file

```javascript
import authRoute from './routes/auth.route.js'

app.use("/api/auth", authRoute)
```


same as Create message.route.js file inside the routes file and put code 

```javascript
import express from "express";

const router = express.Router();

router.get('/send',(req, res)=>{
    res.send("Send Message Endpoint");
})
router.get('/receive',(req, res)=>{
    res.send("Send Message Endpoint");
})

export default router;
```

## Create Repository and Push Your Code
Use following this code 
```base
git init
git add .
git commit -m "fisrt commit"
git remote add origin git_hub_repo_link
git branch -M main
git push -u origin main
```

## Create Database and Setup It 
 I use Mongo DB Atlas and I setUp it 
 Just Copy and paste the URL of the Mongo DB Url in .env file

 Sorry i can not explain the Setup 

## Now Create the Lib Folder is called Library Folder -

Create db.js file for the connection of the Database -

Follow the code-
 ```javascript
 import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGO Database is Connected",conn.connection.host);
    } catch (error) {
        console.error("Database Connection failed",error);
        process.exit(1); // 1 code is means that Fails , 0 means Sucess
    }
}
```

import the function in Server.js file and call it in app.listen;
like this - 
```javascript
import { connectDB } from './lib/db.js';

app.listen(Port, () => {
    console.log(`Server is Running on Port ${Port}`);
    connectDB()
})
```

## let's implement the Authentication

Make controllers folder and create a File name as auth.contorller.js for 

start from Signup Controller

Create Model Folder and create A file named as User.js 
and keep this code 
```javascript
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    profilepic: {
        type: String,
        default: "",
    }
}, { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
```

