import { Schema, model } from "mongoose";

const LostPostSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },

    tag: { type: String, required: true, text: true },
    place: { type: String, required: true, text: true },
    address: { type: String, required: true, text: true },
    fee: { type: Number, required: true },
    description: { type: String, required: true, text: true },

    photos: [
      {
        path: { type: String, required: true, lowercase: true }
      }
    ],

    browse: { type: Number, required: true },

    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
  },
  { autoIndex: false }
);

LostPostSchema.index({ description: "text", place: "text", address: "text" });

export default model("LostPost", LostPostSchema);
