import axios from "axios"
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

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_ADD_REQUEST,
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
    const { data } = await axios.post(`/api/cart`, { id, qty }, config)

    dispatch({
      type: CART_ADD_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CART_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    return false
  }
}

export const getCartItems = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_GET_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/cart`, config)

    dispatch({
      type: CART_GET_SUCCESS,
      payload: data,
    })
    localStorage.setItem("cartItems", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: CART_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const removeCartItems = (cartItemIds) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_ITEM_REMOVE_REQUEST,
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
      `/api/cart`,
      { cartItemIds, type: "REMOVE" },
      config
    )

    dispatch({
      type: CART_ITEM_REMOVE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CART_ITEM_REMOVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateCartItem =
  (cartItemIds, updateData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CART_ITEM_UPDATE_REQUEST,
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
      const { qty, selected } = updateData
      const { data } = await axios.put(
        `/api/cart`,
        { cartItemIds, selected, qty, type: "UPDATE" },
        config
      )

      dispatch({
        type: CART_ITEM_UPDATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CART_ITEM_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
