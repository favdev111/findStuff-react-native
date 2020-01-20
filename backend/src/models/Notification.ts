import { Schema, model } from "mongoose";

const NotificationSchema = new Schema({
  content: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
});

export default model("Notification", NotificationSchema);
