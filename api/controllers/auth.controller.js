import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create new user with the hashed password
    const newUser = new User({ username, email, password: hashedPassword });

    // Save the user to the database
    await newUser.save();

    // Send success response
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    // Handle errors
    next(error);
  }
};
