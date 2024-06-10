import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.mjs";
import userRoutes from "./src/routes/UserRoutes.mjs";

const app = express();

// MIDDLEWARE
app.use(express.json()); // Middleware for json

app.get("/", (req, res) => {
  console.log(request);
  return response.status(234).send("Connected.");
});

// USER ROUTES
app.use("/users", userRoutes);

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
