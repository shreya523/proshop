import express from "express"
import { payWithRazorPay } from "../controllers/paymentController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/").post(protect, payWithRazorPay)

export default router
