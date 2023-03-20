import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import {
  getShippingAddresses,
  addShippingAddress,
  deleteShippingAddress,
  updateShippingAddress,
} from "../controllers/shippingAddressController.js"

const router = express.Router()

router
  .route("/")
  .post(protect, addShippingAddress)
  .get(protect, getShippingAddresses)
router
  .route("/:id")
  .delete(protect, deleteShippingAddress)
  .put(protect, updateShippingAddress)

export default router
