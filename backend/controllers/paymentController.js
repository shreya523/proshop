import asyncHandler from "express-async-handler"
import Razorpay from "razorpay"

// @desc    Razorpay
// @route   POST /api/config/razorpay
// @access  Private
const payWithRazorPay = asyncHandler(async (req, res) => {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  })
  const order = await instance.orders.create({
    amount: 700,
    currency: "INR",
    receipt: "receipt#1",
  })

  if (order) {
    res.status(201).json(order)
  } else {
    res.status(501)
    throw new Error("Something went wrong")
  }
})

export { payWithRazorPay }
