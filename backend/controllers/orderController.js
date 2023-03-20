import Order from "../models/orderModel.js"
import asyncHandler from "express-async-handler"

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentResult,
  } = req.body
  const isPaid =
    paymentMethod === "razorpay" && paymentResult.razorpay_payment_id
      ? { isPaid: true, paidAt: Date.now() }
      : { isPaid: false }

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error("No order items")
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentResult,
      status: "On the way",
      ...isPaid,
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

// @desc    Get order ny ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = req.body.paymentResult
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

// @desc    Update order to mark as delivered
// @route   POST /api/orders/:id/deliver
// @access  Private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()
    order.status = "Delivered"

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const status = req.query.status
  const time = req.query.time
  const data = { user: req.user._id }
  if (status && status != "All") {
    data.status = status
  }
  if (time && time != "Anytime") {
    var now = new Date()
    if (time === "Last 30 days") {
      now.setDate(now.getDate() - 30)
      data.createdAt = { $lt: new Date(), $gte: now }
    } else if (time === "Last 6 months") {
      now.setDate(now.getMonth() - 6)
      data.createdAt = { $lt: new Date(), $gte: now }
    } else if (time === "Last year") {
      now.setDate(now.getDate() - 365)
      data.createdAt = { $lt: new Date(), $gte: now }
    }
  }
  const orders = await Order.find(data)
  res.send(orders)
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("user", "id name")
  res.send(orders)
})

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
}
