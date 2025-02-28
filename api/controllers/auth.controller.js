import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
  try {
    console.log("🔹 Received Request Body:", req.body); // ✅ Debugging

    const { username, email, password } = req.body;

    // ✅ Validate request body
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // ✅ Hash password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // ✅ Save new user
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    next(error);
  }
};
