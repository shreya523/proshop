import {
  WISHLIST_ADD_ITEM_REQUEST,
  WISHLIST_ADD_ITEM_SUCCESS,
  WISHLIST_ADD_ITEM_FAIL,
  WISHLIST_GET_REQUEST,
  WISHLIST_GET_SUCCESS,
  WISHLIST_GET_FAIL,
  WISHLIST_REMOVE_ITEM_REQUEST,
  WISHLIST_REMOVE_ITEM_SUCCESS,
  WISHLIST_REMOVE_ITEM_FAIL,
} from "../constants/wishlistConstants"

export const wishlistAddItemReducer = (state = {}, action) => {
  switch (action.type) {
    case WISHLIST_ADD_ITEM_REQUEST:
      return { loading: true }
    case WISHLIST_ADD_ITEM_SUCCESS:
      return { loading: false, success: true }
    case WISHLIST_ADD_ITEM_FAIL:
      return { loading: false, error: action.payload }
    default:
      return {}
  }
}

export const wishlistGetReducer = (state = { wishlistItems: [] }, action) => {
  switch (action.type) {
    case WISHLIST_GET_REQUEST:
      return { loading: true }
    case WISHLIST_GET_SUCCESS:
      return { loading: false, success: true, wishlistItems: action.payload }
    case WISHLIST_GET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const wishlistRemoveItemReducer = (state = {}, action) => {
  switch (action.type) {
    case WISHLIST_REMOVE_ITEM_REQUEST:
      return { loading: true }
    case WISHLIST_REMOVE_ITEM_SUCCESS:
      return { loading: false, success: true }
    case WISHLIST_REMOVE_ITEM_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
