import express from "express";
import { body, validationResult } from "express-validator";
import { User } from "../models/UserModel.mjs";
import { generateRandomIpAddress } from "../utils/RandomGenerators.mjs";
import bcrypt from "bcrypt";

const router = express.Router();

// User registration
router.post(
  "/",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("username").isLength({ min: 3 }).withMessage("Username must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Check if email already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: "User with this email already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        ipAddress: generateRandomIpAddress(),
      };
      const user = await User.create(newUser);
      return res.status(201).send(user);
    } catch (error) {
      if (error.code === 11000) {
        // Duplicate key error
        const field = Object.keys(error.keyPattern)[0];
        const message = `User with this ${field} already exists.`;
        return res.status(400).send({ message });
      }
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  }
);

export default router;
