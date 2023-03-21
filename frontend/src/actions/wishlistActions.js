import axios from "axios"
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

export const addToWishlist = (productIds) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WISHLIST_ADD_ITEM_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/wishlist`,
      { productIds },
      config
    )

    dispatch({
      type: WISHLIST_ADD_ITEM_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: WISHLIST_ADD_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getWishlistItems = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: WISHLIST_GET_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/wishlist`,
      config
    )

    dispatch({
      type: WISHLIST_GET_SUCCESS,
      payload: data,
    })
    localStorage.setItem("wishlistItems", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: WISHLIST_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const removeFromWishlist = (productId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WISHLIST_REMOVE_ITEM_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/wishlist`,
      { productId },
      config
    )

    dispatch({
      type: WISHLIST_REMOVE_ITEM_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: WISHLIST_REMOVE_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
