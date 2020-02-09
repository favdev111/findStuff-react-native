import { Schema, model } from "mongoose";

const OtpSchema = new Schema({
  phone: { type: String, required: true },
  otp: { type: Number, required: true },
  limit: { type: Number, required: true },

  createAt: { type: Date, default: Date.now, required: true }
});

export default model("Otp", OtpSchema);
