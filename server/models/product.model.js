import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    enum: ["USD", "UAE", "RWF"],
  },
  description: {
    type: String,
  },
  mainPicture: {
    type: String,
    required: true,
  },
  secondPicture: {
    type: String,
  },
  thirdPicture: {
    type: String,
  },
  fourthPicture: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  successfulRequests: {
    type: Number,
    default: 0,
  },
  rejectedRequests: {
    type: Number,
    default: 0,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Product", productSchema);
