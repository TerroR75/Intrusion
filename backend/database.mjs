import mongoose from "mongoose";
import { app } from "./index.mjs";
import dotenv from "dotenv";

dotenv.config({ path: ".env.dev" });

// Database connection (MongoDB Atlas and free tier for learning purposes)
const connectDB = async () => {
  mongoose
    .connect(process.env.DBHOST)
    .then(() => {
      console.log("App connected to database");
      app.listen(process.env.PORT, () => {
        console.log(`App is listening to port: ${process.env.PORT}`);
      });
    })
    .catch((error) => {
      console.log(error);
      console.log(process.env.PORT);
    });
};

const disconnectDB = async () => {
  await mongoose.disconnect();
};

export { connectDB, disconnectDB };
