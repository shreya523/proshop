import express from "express"
import {
  addCartItem,
  getCartItems,
  removeCartItems,
  updateCartItem,
} from "../controllers/cartController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router
  .route("/")
  .post(protect, addCartItem)
  .get(protect, getCartItems)
  .put(protect, (req, res) => {
    if (req.body.type === "REMOVE") {
      removeCartItems(req, res)
    } else if (req.body.type === "UPDATE") {
      updateCartItem(req, res)
    }
  })

// router.route("/:id").put(protect, updateCartItem)

export default router
