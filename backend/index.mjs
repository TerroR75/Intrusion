import express from "express";
import { PORT, mongoDBURL } from "./config.mjs";
import mongoose from "mongoose";
import { User } from "./src/models/UserModel.mjs";
import { generateRandomIpAddress } from "./src/utils/RandomGenerators.mjs";

const app = express();

// Middleware for json
app.use(express.json());

app.get("/", (req, res) => {
  console.log(request);
  return response.status(234).send("Connected.");
});

app.post("/users", async (req, res) => {
  try {
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).send({
        message: "All field are required!",
      });
    }
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      ipAddress: generateRandomIpAddress(),
    };
    const user = await User.create(newUser);
    return res.status(201).send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
