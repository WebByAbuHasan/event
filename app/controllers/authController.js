import User from "../models/userModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const SECRET_KEY = "a3f9d7c1e8b5a4f2d6c3e7b9f1a2c4e5d7f8b9c0a1e2d3c4b5f6a7e8c9d0b1a2"; // Use dotenv in production

// user register
export const register = async (req, res) => {
    const { name, email, password} = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// user login
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate token (extending expiration to 1 day)
        const token = jwt.sign(
            { userId: user._id },
            SECRET_KEY,
            { expiresIn: "1d" } // Token valid for 1 day
        );

        // Store token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,    // Prevent access from JavaScript (security)
            secure: process.env.NODE_ENV === "production", // Secure in production
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
        });
        res.json({ message: "Login successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};