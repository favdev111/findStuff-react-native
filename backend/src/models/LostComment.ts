import { Schema, model } from "mongoose";

const LostCommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: Schema.Types.ObjectId, ref: "LostPost", required: true },

  content: { type: String, required: true },

  createAt: { type: Date, default: Date.now },
  updateAt: Date
});

export default model("LostComment", LostCommentSchema);
