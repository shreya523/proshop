import {
  CART_ADD_REQUEST,
  CART_ADD_SUCCESS,
  CART_ADD_FAIL,
  CART_GET_REQUEST,
  CART_GET_SUCCESS,
  CART_GET_FAIL,
  CART_ITEM_REMOVE_REQUEST,
  CART_ITEM_REMOVE_SUCCESS,
  CART_ITEM_REMOVE_FAIL,
  CART_ITEM_UPDATE_REQUEST,
  CART_ITEM_UPDATE_SUCCESS,
  CART_ITEM_UPDATE_FAIL,
} from "../constants/cartConstants"

export const cartAddReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_ADD_REQUEST:
      return { loading: true }
    case CART_ADD_SUCCESS:
      return { loading: false, success: true, cart: action.payload }
    case CART_ADD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getCartItemsReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_GET_REQUEST:
      return { loading: true }
    case CART_GET_SUCCESS:
      return { loading: false, success: true, cartItems: action.payload }
    case CART_GET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const removeCartItemsReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_ITEM_REMOVE_REQUEST:
      return { loading: true }
    case CART_ITEM_REMOVE_SUCCESS:
      return { loading: false, success: true }
    case CART_ITEM_REMOVE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const updateCartItemReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_ITEM_UPDATE_REQUEST:
      return { loading: true }
    case CART_ITEM_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case CART_ITEM_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
