import { combineReducers, applyMiddleware } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productTopRatedReducer,
  productReviewcreateReducer,
} from "./reducers/productReducers"
import {
  cartAddReducer,
  getCartItemsReducer,
  removeCartItemsReducer,
  updateCartItemReducer,
} from "./reducers/cartReducers"
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  orderListAllReducer,
  orderDeliverReducer,
} from "./reducers/orderReducers"
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers"
import {
  wishlistAddItemReducer,
  wishlistGetReducer,
  wishlistRemoveItemReducer,
} from "./reducers/wishlistReducer"
import {
  shippingAddressAddReducer,
  getShippingAddressesReducer,
  removeShippingAddressesReducer,
  updateShippingAddressesReducer,
} from "./reducers/shippingReducers"

const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productTopRated: productTopRatedReducer,
  productReviewCreate: productReviewcreateReducer,
  cartCreate: cartAddReducer,
  cart: getCartItemsReducer,
  cartRemove: removeCartItemsReducer,
  cartUpdate: updateCartItemReducer,
  wishlistAdd: wishlistAddItemReducer,
  wishlist: wishlistGetReducer,
  removeWishlistItem: wishlistRemoveItemReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderListAll: orderListAllReducer,
  shippingAddress: getShippingAddressesReducer,
  shippingAddressCreate: shippingAddressAddReducer,
  shippingAddressDelete: removeShippingAddressesReducer,
  shippingAddressUpdate: updateShippingAddressesReducer,
})

const cartFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : []

const wishlistFromStorage = localStorage.getItem("wishlistItems")
  ? JSON.parse(localStorage.getItem("wishlistItems"))
  : []

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null

const initialState = {
  cart: { cartItems: cartFromStorage },
  wishlist: { wishlistItems: wishlistFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
  orderDetails: { loading: true },
  orderListMy: { loading: true },
}

const middleware = [thunk]
const store = configureStore(
  {
    reducer: reducers,
    preloadedState: initialState,
  },
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
