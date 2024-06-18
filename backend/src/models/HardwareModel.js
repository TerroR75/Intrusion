import mongoose from "mongoose";

// Define the Hardware schema
const HardwareSchema = new mongoose.Schema({
  cpu: { speed: Number, required: true },
  gpu: { speed: Number, required: true },
  ram: { capacity: Number, required: true },
  netAdapter: { speed: String, required: true },
  disk: { capacity: Number, required: true },
});

// Export the Hardware schema
export const Hardware = mongoose.model("Hardware", HardwareSchema);
