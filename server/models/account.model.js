import mongoose from "mongoose";

const Schema = mongoose.Schema;

const accountSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: true
  },
  createOn: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: {
    type: String,
    required: false
  },
  resetPasswordExpires: {
    type: Date,
    required: false
  }
});

export default mongoose.model("Account", accountSchema);
