import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";


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


export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const ValidUser = await User.findOne({ email });
    if (!ValidUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, ValidUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credential!"));
    const token = jwt.sign({ id: ValidUser._id}, process.env.JWT_SECRET)
    const { password: pass, ...rest } = ValidUser._doc;
    res.cookie('access_token', token, {httpOnly: true })
    .status(300)
    .json(rest)

  } catch (error) {
    next(error); // ✅ Corrected spelling
}

}
