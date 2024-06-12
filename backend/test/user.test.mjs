import { expect, use } from "chai";
import chaiHttp from "chai-http";
import { app } from "../index.mjs"; // Import your Express app
import { User } from "../src/models/UserModel.mjs"; // Import your User model
import { connectDB, disconnectDB } from "../database.mjs";
