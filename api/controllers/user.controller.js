import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js"; // Import errorHandler
import Listing from "../models/listing.model.js";



export const test = (req, res) => {
    res.json({
        message: "Api is working!" // Fixed typo in message
    });
};
export const updateUser = async (req, res, next) => {
    let token = req.cookies.access_token; // ✅ Try getting token from cookies
  
    // ✅ If no cookie token, check Authorization header
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }
  
    if (!token) return next(errorHandler(401, "Unauthorized"));
  
    try {
      jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) return next(errorHandler(403, "Forbidden"));
  
        if (user.id !== req.params.id) return next(errorHandler(401, "You can only update your own account!"));
  
        if (req.body.password) {
          req.body.password = bcrypt.hashSync(req.body.password, 10);
        }
  
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
      });
    } catch (err) {
      next(err);
    }
  };
  
 
export const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401, "You can only delete your account!"));
        try {
            await User.findByIdAndDelete(req.params.id);
            res.clearCookie('access_token');
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            next(error);
        }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_toekn');
    res.status(200).json('User has been logged out successfully!');
  } catch (error) {
   next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  
  if (req.user.id !== req.params.id) {
    
    try {
      const listings = await Listing.find({ userRef: req.params.id});
      res.status(200).json(listings);
    }catch (error){
      next(error)
    }
  }else{
    return next(errorHandler(401, 'You can only view your own listings'));
  }
}
