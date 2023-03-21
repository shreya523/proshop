import axios from "axios"
import {
  SHIPPING_ADD_ADD_FAIL,
  SHIPPING_ADD_ADD_REQUEST,
  SHIPPING_ADD_ADD_SUCCESS,
  SHIPPING_ADD_GET_REQUEST,
  SHIPPING_ADD_GET_SUCCESS,
  SHIPPING_ADD_GET_FAIL,
  SHIPPING_ADD_REMOVE_REQUEST,
  SHIPPING_ADD_REMOVE_SUCCESS,
  SHIPPING_ADD_REMOVE_FAIL,
  SHIPPING_ADD_UPDATE_REQUEST,
  SHIPPING_ADD_UPDATE_SUCCESS,
  SHIPPING_ADD_UPDATE_FAIL,
} from "../constants/shippingConstants"

export const saveShippingAddress =
  (shippingAddress) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SHIPPING_ADD_ADD_REQUEST,
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
        `${process.env.REACT_APP_BASE_URL}/api/shipping`,
        { shippingAddress },
        config
      )
      if (shippingAddress.defaultAddress) {
        localStorage.setItem("shippingAddress", JSON.stringify(data))
      }

      dispatch({
        type: SHIPPING_ADD_ADD_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: SHIPPING_ADD_ADD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getShippingAddresses = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SHIPPING_ADD_GET_REQUEST,
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
      `${process.env.REACT_APP_BASE_URL}/api/shipping`,
      config
    )

    dispatch({
      type: SHIPPING_ADD_GET_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SHIPPING_ADD_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteShippingAddress = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SHIPPING_ADD_REMOVE_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const selectedAddress = JSON.parse(localStorage.getItem("shippingAddress"))
    if (selectedAddress && selectedAddress._id === id) {
      localStorage.removeItem("shippingAddress")
    }
    await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/api/shipping/${id}`,
      config
    )

    dispatch({
      type: SHIPPING_ADD_REMOVE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: SHIPPING_ADD_REMOVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateShippingAddress =
  (address) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SHIPPING_ADD_UPDATE_REQUEST,
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
        `${process.env.REACT_APP_BASE_URL}/api/shipping/${address._id}`,
        address,
        config
      )

      if (address.defaultAddress) {
        localStorage.setItem("shippingAddress", JSON.stringify(data))
      }

      dispatch({
        type: SHIPPING_ADD_UPDATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: SHIPPING_ADD_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
