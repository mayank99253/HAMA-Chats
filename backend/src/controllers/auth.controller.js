import User from "../models/User.js";
import { generateToken } from "../lib/utils.js";

import bcrypt from "bcryptjs"

export const signup = async (req,res) => {
    const {email , fullName , password} = req.body;

    try {
        
        if(!email || !fullName || !password){
            return res.status(400).json({message :"All Fields are Required"})
        }

        if(password.length < 6){
            return res.status(400).json({message:"Password is Too Small"});
        }

        const emailRogex = /^[^\s@]+@[^\s@]+\.[^\s@]+s/;
        if(emailRogex.test(email)){
            return res.status(400).json({message:"Invalid Email Format"})
        }

        const user = await User.findOne({email});
        if(user) return res.status(400).json({message:"Email Already Exists"})

        const salt = await bcrypt.genSalt(10);
        const HashPassword = await bcrypt.hash(password , salt)

        const newUser = new User({
            fullName ,
            email ,
            password:HashPassword
        })

        if(newUser){
            generateToken(newUser._id,res)
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                email:newUser.email,
                fullName:newUser.fullName,
                profilepic:newUser.profilepic
            })
        }else{
            res.status(400).json({message:"Invalid User Data"})
        }

    } catch (error) {
        console.error("Error in Sign Up Controller" , error);
        res.status(500).json({message:"Internal Server Error"})
    }
}