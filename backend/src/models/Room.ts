import { Schema, model } from "mongoose";

const RoomSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      autopopulate: { select: "name phone photo" }
    }
  ],
  label: { type: String, text: true },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
});

RoomSchema.plugin(require("mongoose-autopopulate"));
RoomSchema.pre("findOneAndUpdate", function(next) {
  this.findOneAndUpdate({}, { updateAt: Date.now() });
  next();
});

export default model("Room", RoomSchema);
