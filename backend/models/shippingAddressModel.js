import mongoose from "mongoose"

const shippingAddressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    state: { type: String, required: true },
    type: {
      type: String,
      enum: ["Home", "Work"],
      required: true,
      default: "Home",
    },
    defaultAddress: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)

const ShippingAddress = mongoose.model("ShippingAddress", shippingAddressSchema)
export default ShippingAddress
