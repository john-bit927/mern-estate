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
      default: "https://i.pinimg.com/736x/d4/a1/67/d4a167224d5bcaa26bdf498298a9a516.jpg"
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
