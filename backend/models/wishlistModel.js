import mongoose from "mongoose"

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    wishlistItems: [
      {
        name: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
          unique: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Whishlist = mongoose.model("Whishlist", wishlistSchema)
export default Whishlist
