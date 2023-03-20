import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, ListGroup } from "react-bootstrap"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

//Components
import Message from "../components/Message"
import Loader from "../components/Loader"
import PriceDetails from "../components/PriceDetails"
import CartItem from "../components/CartItem"
import CheckoutSteps from "../components/CheckoutSteps"
import Toast from "../components/Toast.js"

//Redux-actions
import {
  getCartItems,
  removeCartItems,
  updateCartItem,
} from "../actions/cartActions"
import { addToWishlist } from "../actions/wishlistActions.js"

//Controller
import { priceDetails } from "../controllers/PriceDetailsController"

const CartScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [bulkSelection, setBulkSelection] = useState(false)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { loading, cartItems } = cart

  const cartUpdate = useSelector((state) => state.cartUpdate)
  const { loading: updateLoading, success: updateSuccess } = cartUpdate

  const cartRemove = useSelector((state) => state.cartRemove)
  const { loading: loadingremove, success: successremove } = cartRemove

  const { selectedItems } = priceDetails(cartItems)

  const removeCartItemsHandler = (itemId) => {
    dispatch(removeCartItems([itemId]))
  }

  const updateCartItemsSelectionHandler = (e, itemId) => {
    dispatch(
      updateCartItem([itemId], {
        selected: e.target.checked,
      })
    )
  }

  const updateCartItemsQuantityHandler = (e, itemId) => {
    dispatch(
      updateCartItem([itemId], {
        qty: e.target.value,
      })
    )
  }

  const removeMultipleFromCartHandler = () => {
    const selectedCartItems = cartItems.filter((x) => x.selected)
    const itemIds = selectedCartItems.map((x) => x._id)
    dispatch(removeCartItems(itemIds))
  }

  const moveToWishlistHandler = () => {
    const selectedCartItems = cartItems.filter((x) => x.selected)
    const productIds = selectedCartItems.map((x) => x.product)
    dispatch(addToWishlist(productIds))
    removeMultipleFromCartHandler()
  }

  const bulkSelectionHandler = (e) => {
    setBulkSelection(e.target.checked)
    const itemIds = cartItems.map((x) => x._id)
    dispatch(
      updateCartItem(itemIds, {
        selected: e.target.checked,
      })
    )
  }

  const checkoutHandler = () => {
    if (userInfo) {
      if (selectedItems > 0) {
        navigate("/shipping")
      } else {
        toast.warn("please select product(s) to proceed", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
    } else navigate("/login")
  }

  useEffect(() => {
    if (userInfo) {
      dispatch(getCartItems())
    }
  }, [navigate, dispatch, successremove, updateSuccess, userInfo])

  return (
    <>
      <Toast />
      <CheckoutSteps step={1}></CheckoutSteps>
      {loading || loadingremove || updateLoading ? (
        <Loader />
      ) : !userInfo ? (
        <Message>
          Please login to add products in your cart{" "}
          <Link to='/login'>Login</Link>
        </Message>
      ) : !cartItems || cartItems.length === 0 ? (
        <Message>
          Your cart is empty <Link to='/'>Add products</Link>
        </Message>
      ) : (
        <Row>
          <h1>Shopping Cart</h1>
          <Col md={8}>
            <Row className='mx-1'>
              <Col md={7}>
                <input
                  type='checkbox'
                  className='form-check-input'
                  name='allSelect'
                  defaultChecked={
                    !cartItems.some((item) => item?.selected !== true)
                  }
                  onChange={bulkSelectionHandler}
                />{" "}
                {cartItems.reduce((acc, item) => {
                  if (item.selected) {
                    acc += 1
                  }
                  return acc
                }, 0)}
                /{cartItems.length} Items selected
              </Col>
              <Col md={5}>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={removeMultipleFromCartHandler}
                >
                  Remove
                </button>
                |
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={moveToWishlistHandler}
                >
                  Move to wishlist
                </button>
              </Col>
            </Row>
            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  updateCartItemsSelectionHandler={
                    updateCartItemsSelectionHandler
                  }
                  updateCartItemsQuantityHandler={
                    updateCartItemsQuantityHandler
                  }
                  removeCartItemsHandler={removeCartItemsHandler}
                />
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <PriceDetails />
            <button
              type='button'
              className='btn btn-danger'
              style={{ width: "100%" }}
              disabled={selectedItems < 1}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </button>
          </Col>
        </Row>
      )}
    </>
  )
}

export default CartScreen
