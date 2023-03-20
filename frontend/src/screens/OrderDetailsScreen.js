import React, { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions"
import {
  ORDER_PAY_RESET,
  ORDER_DELIVERED_RESET,
} from "../constants/orderConstants"

const OrderDetailsScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const orderId = useParams().id

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }
  const paidHandler = () => {
    dispatch(payOrder(orderId))
  }

  useEffect(() => {
    if (!userInfo) {
      navigate("/")
    }
    if (!order || order._id !== orderId || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVERED_RESET })
      dispatch(getOrderDetails(orderId))
    }
  }, [dispatch, order, orderId, successPay, successDeliver, navigate, userInfo])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Row>
      <Col md={8}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>Order Items</h2>
            {order.orderItems.length === 0 ? (
              <Message>Order is empty</Message>
            ) : (
              <ListGroup variant='flush'>
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Shipping</h2>
            <p>
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
              {order.shippingAddress.pincode}, {order.shippingAddress.state}
            </p>
            {order.isDelivered ? (
              <Message variant='success'>
                Delivered on {order.deliveredAt.substring(0, 10)}
              </Message>
            ) : (
              <Message variant='danger'>Not Delivered</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Payment Method</h2>
            <p>
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <Message variant='success'>
                Paid on {order.paidAt.substring(0, 10)}
              </Message>
            ) : (
              <Message variant='danger'>Not Paid</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Updates sent to</h2>
            <p>
              <i className='fa-solid fa-phone' aria-hidden='true'></i>{" "}
              {order.shippingAddress.phone}
              <br />
              <i class='fa fa-envelope' aria-hidden='true'></i> {userInfo.email}
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Order</h2>
            <strong>Order-Id:</strong> {order._id}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Shipping Cost</span>
                <span className='text-end'>₹{order.shippingPrice}</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Other Taxes</span>
                <span className='text-end'>₹{order.taxPrice}</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Total Amount</span>
                <span className='text-end'>₹{order.totalPrice}</span>
              </div>
            </ListGroup.Item>
            {loadingDeliver && <Loader />}
            {userInfo.isAdmin && !order.isDelivered && (
              <ListGroup.Item>
                <Row>
                  <Col md={6}>
                    <button
                      type='button'
                      className='btn btn-danger'
                      style={{ width: "100%", height: "100%" }}
                      onClick={paidHandler}
                      disabled={order.paymentMethod !== "COD"}
                    >
                      Mark As Paid
                    </button>
                  </Col>
                  <Col md={6}>
                    <button
                      type='button'
                      className='btn btn-danger'
                      style={{ width: "100%", height: "100%" }}
                      onClick={deliverHandler}
                      disabled={!order.isPaid}
                    >
                      Mark As Delivered
                    </button>
                  </Col>
                </Row>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default OrderDetailsScreen
