import { Schema, model } from "mongoose";

const MessageSchema = new Schema(
  {
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true
      // autopopulate: { select: "users" }
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      autopopulate: { select: "name phone photo" }
    },

    content: { type: String, required: true, text: true },
    checked: { type: Number, required: true },

    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
  },
  { autoIndex: false }
);

MessageSchema.index({ content: "text" });
MessageSchema.plugin(require("mongoose-autopopulate"));

export default model("Message", MessageSchema);
