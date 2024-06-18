import express from "express";
import { body, validationResult } from "express-validator";
import { User } from "../models/UserModel.js";
import { generateRandomIpAddress } from "../utils/RandomGenerators.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";

const router = express.Router();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5,
  message: {
    message: "Too many requests from this IP, please try again after a minute",
  },
});

/*User registration (router is redirecting from index.mjs from the path /users to /users/register, and then receives
request body (json formatted data from the user - like from register form), and converts it to User model defined by
../src/models/UserModel.mjs 
*/
router.post(
  "/register",
  limiter,
  [
    body("username").notEmpty().withMessage("Username is required"), // Everything here with object "body" applies some rules for users to follow when registering a new account
    body("username").isLength({ min: 3 }).withMessage("Username must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    // "async" function basically means it performs some tasks that need some time to complete, like in this case - database data fetching, it is always acompanied by "await" keyword like down below
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Check if email already exists
      const existingUser = await User.findOne({ email: req.body.email }); // "await" keyword so the fucntion "waits" here for this line to complete, otherwise it would just go to the next lines and execute them
      if (existingUser) {
        return res.status(400).json({ message: "User with this email already exists" });
      }

      // Hash the password (NEVER EVER store user passwords in raw format received from the user, it would be great to also hash emails though but keep it simple for now)
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Creating a new user object using request body (json format), and then using again "await" keyword to create a new entry in database
      const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        ipAddress: generateRandomIpAddress(),
      };
      const user = await User.create(newUser);
      return res.status(201).send(user).json({ message: "Account successfully created!" });
    } catch (error) {
      // If something goes wrong during whole "try" block -> throw an error
      if (error.code === 11000) {
        // Duplicate key error
        const field = Object.keys(error.keyPattern)[0];
        const message = `User with this ${field} already exists.`;
        return res.status(400).send({ message });
      }
      console.log(error.message);
      //res.status(500).send({ message: error.message });
    }
  }
);

// User signing in
router.post("/login", limiter, async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    } else {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Incorrect password" });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
      return res.status(200).json({ message: "Login successful", token });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

router.get("/hack", async (req, res) => {
  const destinationUser = await User.findOne({ ipAddress: req.body.destinationIp });
  if (!destinationUser) {
    return res.status(401).json({ message: "IP not found." });
  }
  const sourceUser = await User.findById(req.body.source);
  if (!sourceUser) {
    return res.status(401).json({ message: "There was an error." });
  } else {
    console.log(`User: ${sourceUser.ipAddress} hacks: ${req.body.destinationIp}`);
  }
});
export default router;
