import { Schema, model } from "mongoose";

const ProfileSchema = new Schema({
  version: { type: String, required: true },
  share: { type: String, required: true },
  about: { type: String, required: true },
  service: { type: String, required: true },
  phone: { type: String, required: true },

  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
});

export default model("Profile", ProfileSchema);
