import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true, // ✅ Fix: 'require' → 'required'
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://i.pinimg.com/474x/e4/19/72/e419723a217bc37209c7c7eb0a1330b7.jpg"
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
