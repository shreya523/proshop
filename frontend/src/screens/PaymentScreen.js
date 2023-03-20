import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Col, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import PriceDetails from "../components/PriceDetails"
import CheckoutSteps from "../components/CheckoutSteps"
import useRazorpay from "react-razorpay"
import axios from "axios"
import { createOrder } from "../actions/orderActions"
import { removeCartItems } from "../actions/cartActions"
import { priceDetails } from "../controllers/PriceDetailsController"

const PaymentScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [paymentMethod, setPaymentMethod] = useState("COD")

  //State data
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const selectedAddress = JSON.parse(localStorage.getItem("shippingAddress"))

  const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
    priceDetails(cartItems)

  //createOrderHandler
  const createOrderHandler = (response = "") => {
    const paymentResult = response
      ? {
          razorpay_payment_id: response.razorpay_payment_id,
        }
      : {}
    dispatch(
      createOrder({
        orderItems: cartItems.filter((item) => item.selected),
        shippingAddress: selectedAddress,
        paymentResult,
        paymentMethod: paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      })
    )
    dispatch(
      removeCartItems(
        cartItems.filter((item) => item.selected).map((item) => item._id)
      )
    )
    localStorage.removeItem("shippingAddress")
    navigate("/order-success")
  }

  //Razorpay
  const Razorpay = useRazorpay()
  const handlePaymentViaRazorPay = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const order = await axios.post(`/api/config/razorpay`, {}, config)

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: totalPrice * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "PROSHOP",
      description: "Test Transaction",
      image: "/images/favicon.ico",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: function (response) {
        if (response?.razorpay_payment_id) {
          createOrderHandler(response)
        } else {
          console.log(
            "Something went wrong! Please try in some time or choose other method"
          )
        }
      },
      prefill: {
        name: userInfo.name,
        email: userInfo.email,
        contact: userInfo.phone,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    }

    const rzp1 = new Razorpay(options)

    rzp1.on("payment.failed", function (response) {
      console.log(
        "Something went wrong! Please try in some time or choose other method"
      )
    })

    rzp1.open()
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (paymentMethod === "razorpay") {
      handlePaymentViaRazorPay()
    } else {
      createOrderHandler()
    }
  }

  return (
    <>
      <CheckoutSteps step={3}></CheckoutSteps>
      <h1>Payment Method</h1>
      <Row>
        <Col md={8}>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label as='legend'>Select Method</Form.Label>
              <Col>
                <Form.Check
                  type='radio'
                  label='Cash On Delivery'
                  id='COD'
                  name='paymentMethod'
                  value='COD'
                  defaultChecked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
                <Form.Check
                  type='radio'
                  label='Pay Now'
                  id='razorpay'
                  name='paymentMethod'
                  value='razorpay'
                  defaultChecked={paymentMethod === "razorpay"}
                  onChange={(e) => {
                    setPaymentMethod(e.target.value)
                  }}
                ></Form.Check>
              </Col>
            </Form.Group>
          </Form>
        </Col>
        <Col md={4}>
          <PriceDetails />
          <button
            type='submit'
            className='btn btn-danger'
            style={{ width: "100%" }}
            onClick={submitHandler}
          >
            Place Order
          </button>
        </Col>
      </Row>
    </>
  )
}

export default PaymentScreen
