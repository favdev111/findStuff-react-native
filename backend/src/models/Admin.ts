import { Schema, model } from "mongoose";

const AdminSchema = new Schema({
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  otp: { type: String },

  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
});

export default model("Admin", AdminSchema);
