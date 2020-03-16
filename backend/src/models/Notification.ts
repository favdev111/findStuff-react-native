import { Schema, model } from "mongoose";

const NotificationSchema = new Schema({
  city: { type: String, required: true },
  content: { type: String, required: true },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,      
    }
  ],
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
});

export default model("Notification", NotificationSchema);
