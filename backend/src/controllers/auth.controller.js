import User from "../models/User.js";
import { generateToken } from "../lib/utils.js";

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
            generateToken(newUser._id, res);

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
        if (!user) return res.status(400).json({ message: "Invalid Email" });

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Password" })

        generateToken(user._id, res)
        res.status(200).json({
            _id : user._id,
            email: user.email,
            fullName: user.fullName,
            profilepic: user.profilepic,
        })

    } catch (error) {
        console.error("Something Gonna Wrong" , error);
        return res.status(500).json({message:"Internal Server Error"})
    }
}
export const logout = async (_, res) => {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"Logout Successfully"})
}