import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"
import mongoose from "mongoose"

// @desc    Get shipping address
// @route   GET /api/shipping
// @access  Private
const getShippingAddresses = asyncHandler(async (req, res) => {
  const { addresses, defaultAddress } = await User.findById(req.user).select({
    addresses: 1,
    defaultAddress: 1,
    _id: 0,
  })
  res.json({ addresses, defaultAddress })
})

// @desc    Add shipping address
// @route   POST /api/shipping
// @access  Private
const addShippingAddress = asyncHandler(async (req, res) => {
  const shippingAddressId = new mongoose.Types.ObjectId()
  const shippingAddress = {
    _id: shippingAddressId,
    name: req.body.shippingAddress.name,
    phone: req.body.shippingAddress.phone,
    address: req.body.shippingAddress.address,
    city: req.body.shippingAddress.city,
    pincode: req.body.shippingAddress.pincode,
    state: req.body.shippingAddress.state,
    type: req.body.shippingAddress.type,
  }

  let setDefaultAddress = {}
  if (req.body.shippingAddress.defaultAddress) {
    setDefaultAddress.defaultAddress = shippingAddressId
  }

  const updatedUserAddress = await User.updateOne(
    { _id: req.user },
    {
      $addToSet: { addresses: shippingAddress },
      $set: setDefaultAddress,
    },
    {
      upsert: false,
    }
  )

  //res.status(201).json(updatedUserAddress)
  res.status(201).json(shippingAddress)
})

// @desc    Delete shipping address
// @route   DELETE /api/shipping
// @access  Private
const deleteShippingAddress = asyncHandler(async (req, res) => {
  const shippingAddress = await User.updateOne(
    { _id: req.user },
    { $pull: { addresses: { _id: req.params.id } } },
    {
      upsert: false,
      multi: true,
    }
  )
  res.json(shippingAddress)
})

// @desc    Update a shipping address
// @route   PUT /api/shipping/:id
// @access  Private/Admin
const updateShippingAddress = asyncHandler(async (req, res) => {
  const defaultAddress = {}
  if (req.body.defaultAddress) {
    defaultAddress.defaultAddress = req.params.id
  } else if (req.body.defaultAddress != undefined) {
    defaultAddress.defaultAddress = ""
  }

  const updatedShippingAddress = await User.updateOne(
    { _id: req.user, "addresses._id": req.params.id },
    {
      $set: {
        "addresses.$.name": req.body.name,
        "addresses.$.phone": req.body.phone,
        "addresses.$.address": req.body.address,
        "addresses.$.city": req.body.city,
        "addresses.$.state": req.body.state,
        "addresses.$.pincode": req.body.pincode,
        "addresses.$.type": req.body.type,
        ...defaultAddress,
      },
    },
    {
      upsert: false,
      multi: true,
    }
  )
  res.json({ ...req.body, _id: req.params.id })
})

export {
  getShippingAddresses,
  addShippingAddress,
  deleteShippingAddress,
  updateShippingAddress,
}
