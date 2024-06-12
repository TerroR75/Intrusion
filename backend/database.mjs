import mongoose from "mongoose";
import { mongoDBURL, PORT } from "./config.mjs";
import { app } from "./index.mjs";

// Database connection (MongoDB Atlas and free tier for learning purposes)
const connectDB = async () => {
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
};

const disconnectDB = async () => {
  await mongoose.disconnect();
};

export { connectDB, disconnectDB };
