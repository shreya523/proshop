import {
  SHIPPING_ADD_ADD_REQUEST,
  SHIPPING_ADD_ADD_SUCCESS,
  SHIPPING_ADD_ADD_FAIL,
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

export const shippingAddressAddReducer = (state = {}, action) => {
  switch (action.type) {
    case SHIPPING_ADD_ADD_REQUEST:
      return { loading: true }
    case SHIPPING_ADD_ADD_SUCCESS:
      return { loading: false, success: true }
    case SHIPPING_ADD_ADD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return {}
  }
}

export const getShippingAddressesReducer = (state = {}, action) => {
  switch (action.type) {
    case SHIPPING_ADD_GET_REQUEST:
      return { loading: true }
    case SHIPPING_ADD_GET_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      }
    case SHIPPING_ADD_GET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return {}
  }
}

export const removeShippingAddressesReducer = (state = {}, action) => {
  switch (action.type) {
    case SHIPPING_ADD_REMOVE_REQUEST:
      return { loading: true }
    case SHIPPING_ADD_REMOVE_SUCCESS:
      return { loading: false, success: true }
    case SHIPPING_ADD_REMOVE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return {}
  }
}

export const updateShippingAddressesReducer = (state = {}, action) => {
  switch (action.type) {
    case SHIPPING_ADD_UPDATE_REQUEST:
      return { loading: true }
    case SHIPPING_ADD_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case SHIPPING_ADD_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return {}
  }
}
