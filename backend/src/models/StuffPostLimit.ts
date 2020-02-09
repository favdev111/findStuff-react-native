import { Schema, model } from "mongoose";

const StuffPostLimitSchema = new Schema({
  user: { type: String, required: true },
  limit: { type: Number, required: true },

  createAt: { type: Date, default: Date.now, required: true }
});

export default model("StuffPostLimit", StuffPostLimitSchema);
