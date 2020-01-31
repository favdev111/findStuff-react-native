import { Schema, model } from "mongoose";

const OtpSchema = new Schema({
  phone: { type: String, required: true, unique: true },
  otp: { type: Number },

  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
});

export default model("Otp", OtpSchema);
