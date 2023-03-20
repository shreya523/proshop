import express from "express"
import {
  addWishListItem,
  getWishListItems,
  removeWishListItem,
} from "../controllers/wishlistController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router
  .route("/")
  .post(protect, addWishListItem)
  .get(protect, getWishListItems)
  .put(protect, removeWishListItem)

export default router
