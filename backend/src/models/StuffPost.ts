import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const StuffPostSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },

    kind: { type: String, required: true }, //lost, found

    tag: { type: String, required: true, text: true },
    place: { type: String, required: true, text: true },
    address: { type: String, required: true, text: true },

    phone: { type: String, required: true, text: true },

    fee: { type: Number, required: true },

    title: { type: String, required: true, text: true },
    description: { type: String, required: true, text: true },

    photos: [
      {
        path: { type: String, required: true, lowercase: true }
      }
    ],

    ads: { type: Boolean, required: true },
    browse: { type: Number, required: true },

    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
    ],

    reports: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        report: { type: String, required: true, text: true }
      }
    ],

    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
  },
  { autoIndex: false }
);

StuffPostSchema.index({ title: "text", description: "text" });
StuffPostSchema.plugin(mongoosePaginate);

StuffPostSchema.pre("findOneAndUpdate", function(next) {
  this.findOneAndUpdate({}, { updateAt: Date.now() });
  next();
});

export default model("StuffPost", StuffPostSchema);
