import express from "express";
import mongoose from "mongoose";
import userRoutes from "./src/routes/UserRoutes.mjs";
import { connectDB } from "./database.mjs";

const app = express();

// MIDDLEWARE ("Methods/Functions/Middleman" in between calls, which does something to the original request and passes it to the next callback)
app.use(express.json()); // Middleware for json (parses request to json format)

// Default route for the app
/*
TODO: Should be changed or should serve a specific purpose - otherwise its not needed here
*/
app.get("/", (req, res) => {
  console.log(request);
  return response.status(234).send("Connected.");
});

// USER ROUTES (Router = better way of creating a more readable, maintainable and expandable code)
app.use("/users", userRoutes); // /users router which is managed by ./src/routes/UserRoutes.mjs where all USER related functions are

connectDB();

export { app };
