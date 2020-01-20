import { Schema, model } from "mongoose";

const ContactSchema = new Schema(
  {
    city: { type: String, required: true },
    district: { type: String, required: true },
    number: { type: String, required: true },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
  },
  { autoIndex: false }
);
ContactSchema.index({ city: "text", district: "text", number: "text" });
export default model("Contact", ContactSchema);
