import mongoose from "mongoose";
import { app } from "./index.js";
import dotenv from "dotenv";
import { createDevAccount } from "./src/utils/CreateDevAccount.js";

const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env.dev";
dotenv.config({ path: envFile });

// Database connection (MongoDB Atlas and free tier for learning purposes)
const connectDB = async () => {
  mongoose
    .connect(process.env.DBHOST)
    .then(async () => {
      console.log("App connected to database");
      app.listen(process.env.PORT, () => {
        console.log(`App is listening to port: ${process.env.PORT}`);
      });
      await createDevAccount();
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
