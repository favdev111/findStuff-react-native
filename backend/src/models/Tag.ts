import { Schema, model } from "mongoose";

const TagSchema = new Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  description: { type: String },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
});

export default model("Tag", TagSchema);
