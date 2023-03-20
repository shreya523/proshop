import Wishlist from "../models/wishlistModel.js"
import Product from "../models/productModel.js"
import asyncHandler from "express-async-handler"

// @desc    Add product to wishlist
// @route   POST /api/wishlist
// @access  Private
const addWishListItem = asyncHandler(async (req, res) => {
  const productIds = req.body.productIds
  const products = await Product.find(
    { _id: { $in: productIds } },
    { name: 1, image: 1, price: 1 }
  )
  if (products && products.length > 0) {
    const wishListItems = []
    const wishlistItemFound = await Wishlist.findOne({
      user: req.user,
    })
    const wishlistItemFoundIds = wishlistItemFound?.wishlistItems.map(
      (wishlistItem) => wishlistItem.product.toString()
    )
    products.forEach((product) => {
      if (
        !wishlistItemFoundIds ||
        !wishlistItemFoundIds.includes(product._id.toString())
      ) {
        const wishListItem = {
          name: product.name,
          image: product.image,
          price: product.price,
          product: product._id,
        }
        wishListItems.push(wishListItem)
      }
    })

    const updatedWishlist = await Wishlist.updateOne(
      { user: req.user },
      {
        $addToSet: { wishlistItems: wishListItems },
      },
      {
        upsert: true,
      }
    )

    res.json(updatedWishlist)
  } else {
    res.status(400)
    throw new Error("No product found")
  }
})

// @desc    Get wishlist items
// @route   GET /api/wishlist
// @access  Private
const getWishListItems = asyncHandler(async (req, res) => {
  const { wishlistItems } = await Wishlist.findOne({ user: req.user })
  res.json(wishlistItems)
})

// @desc    Remove wishlist items
// @route   PUT /api/wishlist
// @access  Private
const removeWishListItem = asyncHandler(async (req, res) => {
  const productId = req.body.productId
  if (productId) {
    const updatedWishlist = await Wishlist.updateOne(
      { user: req.user },
      { $pull: { wishlistItems: { product: productId } } },
      {
        upsert: false,
        multi: false,
      }
    )
    res.json(updatedWishlist)
  } else {
    res.status(404)
    throw new Error("No wishlist item found")
  }
})

export { addWishListItem, getWishListItems, removeWishListItem }
