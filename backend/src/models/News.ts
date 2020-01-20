import { Schema, model } from "mongoose";

const NewsSchema = new Schema({
  content: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
});

export default model("News", NewsSchema);
