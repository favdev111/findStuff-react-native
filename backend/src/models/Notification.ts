import { Schema, model } from "mongoose";

const NotificationSchema = new Schema({
  content: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
  updateAt: Date
});

export default model("Notification", NotificationSchema);
