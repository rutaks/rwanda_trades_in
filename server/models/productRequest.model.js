import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productRequestSchema = new Schema({
  clientNames: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  status: {
    type: String,
    enum: ["REJECTED", "ACCEPTED", "PENDING"],
    default: "PENDING",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("ProductRequest", productRequestSchema);
