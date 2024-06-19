import bcrypt from "bcrypt";
import { User } from "../models/UserModel.js";
import { generateRandomIpAddress } from "./randomGenerators.js";

export const createDevAccount = async () => {
  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email: "test@gmail.com" });
    if (existingUser) {
      return;
    }

    // Hash the password (NEVER EVER store user passwords in raw format received from the user, it would be great to also hash emails though but keep it simple for now)
    const hashedPassword = await bcrypt.hash("test", 10);

    // Creating a new user object using request body (json format), and then using again "await" keyword to create a new entry in database
    const newUser = {
      username: "test",
      email: "test@gmail.com",
      password: hashedPassword,
      ipAddress: generateRandomIpAddress(),
    };
    await User.create(newUser);
    console.log("Dev account successfully created!");
  } catch (error) {
    console.log(error.message);
  }
};
