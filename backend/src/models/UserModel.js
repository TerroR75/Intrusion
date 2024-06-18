import mongoose from "mongoose";
//import { Hardware } from "./HardwareModel";

// Schema is just a way of defining a template for database to follow
// "timestamps" - creates "createdAt" and "updatedAt" for some statistical purposes or something
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    ipAddress: { type: String, unique: true },
    money: { type: Number },
  },
  { timestamps: true }
);

// Exporting the new model for other files to use
export const User = mongoose.model("User", UserSchema);
