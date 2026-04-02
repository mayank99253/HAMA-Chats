import User from "../models/User.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    const { email, fullName, password } = req.body;

    try {

        if (!email || !fullName || !password) {
            return res.status(400).json({ message: "All Fields are Required" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password is Too Small" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; ///^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid Email Format" })
        }

        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Email Already Exists" })

        const salt = await bcrypt.genSalt(10);
        const HashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: HashPassword
        })

        if (newUser) {
            await newUser.save();
            await generateToken(newUser._id, res);

            return res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                fullName: newUser.fullName,
                profilepic: newUser.profilepic
            });
        } else {
            res.status(400).json({ message: "Invalid User Data" })
        }

    } catch (error) {
        console.error("Error in Sign Up Controller", error);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" })

        await generateToken(user._id, res)
        res.status(200).json({
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            profilepic: user.profilepic,
        })

    } catch (error) {
        console.error("Something Gonna Wrong", error);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
export const logout = async (_, res) => {
    res.cookie("jwt", "", { maxAge: 0 })
    res.status(200).json({ message: "Logout Successfully" })
}
export const updateProfile = async (req, res , next) => {
    try {
        const {profilepic} = req.body;

        if(!profilepic) return res.status(400).json({message:"Profile pic is required"})

        const userId = req.userId;
        const uploadResponce = await cloudinary.uploader.upload(profilepic);

        const updateUser = await User.findById(
            userId,
            {profilepic:uploadResponce.secure_url},
            {new:true}
        )

        res.status(200).json({updateUser})
    } catch (error) {
        console.log("Error In update Profile",error);
        res.status(500).jsom({message:"Internal server error"})
    }
}