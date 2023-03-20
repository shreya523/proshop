import Cart from "../models/cartModel.js"
import Product from "../models/productModel.js"
import asyncHandler from "express-async-handler"

// @desc    Add product to cart
// @route   POST /api/cart
// @access  Private
const addCartItem = asyncHandler(async (req, res) => {
  const productId = req.body.id
  const qty = req.body.qty
  const product = await Product.findById(productId)
  if (product) {
    const cartItem = {
      name: product.name,
      image: product.image,
      price: product.price,
      product: product._id,
      selected: true,
      qty,
    }
    const cart = await Cart.findOne({ user: req.user })

    if (cart) {
      const cartItemFound = await Cart.findOne({
        user: req.user,
        "cartItems.product": cartItem.product,
      })
      if (cartItemFound) {
        const updatedCart = await Cart.updateOne(
          { user: req.user, "cartItems.product": cartItem.product },
          {
            $set: {
              "cartItems.$.selected": true,
            },
            $inc: { "cartItems.$.qty": qty },
          },
          {
            upsert: false,
            multi: true,
          }
        )
        res.json(updatedCart)
      } else {
        const updatedCart = await Cart.updateOne(
          { user: req.user },
          {
            $addToSet: { cartItems: cartItem },
          },
          {
            upsert: true,
          }
        )
        res.json(updatedCart)
      }
    } else {
      const cart = new Cart({
        cartItems: [cartItem],
        user: req.user._id,
      })
      const savedCart = await cart.save()
      res.status(201).json(savedCart)
    }
  } else {
    res.status(400)
    throw new Error("No product found")
    return
  }
})

// @desc    Get cart items
// @route   GET /api/cart
// @access  Private
const getCartItems = asyncHandler(async (req, res) => {
  const { cartItems } = await Cart.findOne({ user: req.user })
  res.json(cartItems)
})

// @desc    Remove cart item(s)
// @route   PUT /api/cart
// @access  Private
const removeCartItems = asyncHandler(async (req, res) => {
  const { cartItemIds } = req.body
  if (cartItemIds && cartItemIds.length > 0) {
    const updatedCart = await Cart.updateOne(
      { user: req.user },
      { $pull: { cartItems: { _id: { $in: cartItemIds } } } },
      {
        upsert: false,
        multi: true,
      }
    )
    res.json(updatedCart)
  } else {
    res.status(404)
    throw new Error("No cart items found")
  }
})

// @desc    Update cart item
// @route   PUT /api/cart/:id
// @access  Private
const updateCartItem = asyncHandler(async (req, res) => {
  const { cartItemIds } = req.body
  if (cartItemIds && cartItemIds.length > 0) {
    if (req.body.qty) {
      const updatedCart = await Cart.updateOne(
        { user: req.user, "cartItems._id": { $in: cartItemIds } },
        {
          $set: {
            "cartItems.$.qty": req.body.qty,
            "cartItems.$.selected": true,
          },
        },
        {
          upsert: false,
          multi: true,
        }
      )
      res.json(updatedCart)
    } else if (req.body.selected !== undefined) {
      let updatedCart
      if (cartItemIds.length > 1) {
        updatedCart = await Cart.updateMany(
          { user: req.user, "cartItems._id": { $in: cartItemIds } },
          {
            $set: {
              "cartItems.$[].selected": req.body.selected,
            },
          },
          {
            upsert: false,
            multi: true,
          }
        )
      } else {
        updatedCart = await Cart.updateOne(
          { user: req.user, "cartItems._id": cartItemIds[0] },
          {
            $set: {
              "cartItems.$.selected": req.body.selected,
            },
          },
          {
            upsert: false,
            multi: true,
          }
        )
      }

      res.json(updatedCart)
    } else {
      res.status(400)
      throw new Error("Not valid operation")
    }
  } else {
    res.status(404)
    throw new Error("No cart items found")
  }
})

export { addCartItem, getCartItems, removeCartItems, updateCartItem }
