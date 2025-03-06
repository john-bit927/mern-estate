import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js"; // Import errorHandler


export const test = (req, res) => {
    res.json({
        message: "Api is working!" // Fixed typo in message
    });
};


export const updateUser = async (req, res, next) => {
  if (req.user.id != req.params.id) return next(errorHandler(401, "You can only update your account!"))
    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            }

            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set:{
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                    
                }
            }, {new: true})

            const {password, ...rest } = updatedUser._doc; // Fixed reference to updatedUser
            res.status(200).json(rest);
    } catch (err) {
        next(err)
    }
}

 