import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  // username: { type: String, required: true },
  // email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  photo: { type: String, required: true, lowercase: true },

  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
});

export default model("User", UserSchema);
