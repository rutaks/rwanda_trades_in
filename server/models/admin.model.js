import mongoose from "mongoose";

const Schema = mongoose.Schema;

const memberSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  accountCreationToken: {
    type: String,
    required: false,
  },
  createOn: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Admin", memberSchema);
