import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  ipAddress: { type: String, unique: true },
});

export const User = mongoose.model("User", UserSchema);
