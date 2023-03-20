import React, { useEffect, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { Row, Col, ListGroup, Card, Form, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"

//Components
import Message from "../components/Message"
import Loader from "../components/Loader"
import Rating from "../components/Rating"
import Toast from "../components/Toast.js"

//Redux-actions
import { createProductReview } from "../actions/productActions.js"
import { listMyOrders } from "../actions/orderActions"

import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const OrderScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()
  const status = searchParams.get("status")
  const time = searchParams.get("time")

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading, error, orders } = orderListMy

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate

  const [statusFilter, setStatusFilter] = useState(status ? status : "All")
  const statusFilterChangeHandler = (e) => {
    setStatusFilter(e.target.value)
  }

  const [timeFilter, setTimeFilter] = useState(time ? time : "Anytime")

  const [productId, setProductId] = useState("")
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [show, setShow] = useState(false)

  const timeFilterChangeHandler = (e) => {
    setTimeFilter(e.target.value)
  }
  const applyFilterHandler = () => {
    setSearchParams(`status=${statusFilter}&time=${timeFilter}`)
  }
  const clearFilterHandler = () => {
    setSearchParams("")
    setStatusFilter("All")
    setTimeFilter("Anytime")
  }

  const changeRatingHandler = (rating) => {
    setRating(rating)
  }
  const submitReviewHandler = () => {
    dispatch(createProductReview(productId, { rating, comment })).then(() => {
      setComment("")
      setProductId("")
      setShow(false)
    })
  }

  const toastSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })

  const toastError = (msg) =>
    toast.error(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })

  const closeModal = () => {
    setShow(false)
  }

  useEffect(() => {
    if (!userInfo) {
      navigate("/")
    } else if (status && time) {
      dispatch(listMyOrders(status, time))
    } else {
      dispatch(listMyOrders())
      if (successProductReview) {
        toastSuccess("Review Successfully Submitted!")
      } else if (errorProductReview) {
        toastError(errorProductReview)
      }
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    status,
    time,
    successProductReview,
    errorProductReview,
  ])

  return loading || loadingProductReview ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <Toast />
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Rating editMode={true} changeRatingHandler={changeRatingHandler} />
            <div className='form-group'>
              <textarea
                className='form-control'
                rows='5'
                id='comment'
                placeholder='Please write product review here'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className='btn btn-danger'
            style={{ width: "100%" }}
            variant='primary'
            onClick={() => {
              submitReviewHandler()
            }}
          >
            Submit Review
          </button>
        </Modal.Footer>
      </Modal>

      <h1>All orders</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            {orders.map((order) => (
              <ListGroup.Item key={order._id} style={{ border: "none" }}>
                <Card>
                  <Card.Header as='h5'>{order.status}</Card.Header>
                  {order.orderItems.map((item) => (
                    <ListGroup variant='flush' key={item._id}>
                      <ListGroup.Item>
                        <Link
                          to={`/my/orders/details/${order._id}`}
                          style={{ cursor: "pointer", textDecoration: "none" }}
                        >
                          <Row>
                            <Col md={4}>
                              <Card.Body>
                                <Card.Img
                                  src={item.image}
                                  style={{
                                    display: "block",
                                    maxWidth: "230px",
                                    maxHeight: "95px",
                                    width: "auto",
                                    height: "auto",
                                  }}
                                />
                              </Card.Body>
                            </Col>
                            <Col md={8}>
                              <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>₹{item.price}</Card.Text>
                              </Card.Body>
                            </Col>
                          </Row>
                        </Link>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <button
                          className='btn '
                          onClick={() => {
                            setShow(true)
                            setProductId(item.product)
                          }}
                        >
                          Rate Product
                        </button>

                        {/* {item.review ? (
                          <Row>
                            <Col md={4}>Rate Product</Col>
                            <Col md={8}>
                              <Row>
                                <Col>
                                  <Rating value={item.review.rating} />
                                </Col>
                                <Col>
                                  <button className='btn btn-secondary p-0'>
                                    Edit Review
                                  </button>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        ) : (
                          <Row>
                            <Col md={4}>Rate Product</Col>
                            <Col md={8}>
                              <Row>
                                <Col md={4}>
                                  <Rating
                                    editMode={true}
                                    changeRatingHandler={changeRatingHandler}
                                    productId={item.product}
                                  />
                                </Col>
                                <Col md={8}>
                                  {productId === item.product &&
                                    rating !== 0 && (
                                      <>
                                        <button className='btn btn-secondary py-0'>
                                          Write Review
                                        </button>
                                        |
                                        <button
                                          className='btn btn-secondary py-0'
                                          onClick={() =>
                                            submitReviewHandler(item._id)
                                          }
                                        >
                                          Submit Review
                                        </button>
                                      </>
                                    )}
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        )} */}
                      </ListGroup.Item>
                    </ListGroup>
                  ))}
                </Card>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>
                  <i className='fa fa-filter'></i> Filter
                </h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Form.Group>
                  <Form.Label as='legend'>Status</Form.Label>
                  <Col>
                    <Form.Check
                      type='radio'
                      label='All'
                      id='all'
                      name='statusFilter'
                      value='All'
                      checked={statusFilter === "All"}
                      onChange={statusFilterChangeHandler}
                    ></Form.Check>
                    <Form.Check
                      type='radio'
                      label='On the way'
                      id='onTheWay'
                      name='statusFilter'
                      value='On the way'
                      checked={statusFilter === "On the way"}
                      onChange={statusFilterChangeHandler}
                    ></Form.Check>
                    <Form.Check
                      type='radio'
                      label='Delivered'
                      id='delivered'
                      name='statusFilter'
                      value='Delivered'
                      checked={statusFilter === "Delivered"}
                      onChange={statusFilterChangeHandler}
                    ></Form.Check>
                    <Form.Check
                      type='radio'
                      label='Cancelled'
                      id='cancelled'
                      name='statusFilter'
                      value='Cancelled'
                      checked={statusFilter === "Cancelled"}
                      onChange={statusFilterChangeHandler}
                    ></Form.Check>
                    <Form.Check
                      type='radio'
                      label='Returned'
                      id='returned'
                      name='statusFilter'
                      value='Returned'
                      checked={statusFilter === "Returned"}
                      onChange={statusFilterChangeHandler}
                    ></Form.Check>
                  </Col>
                </Form.Group>
              </ListGroup.Item>
              <ListGroup.Item>
                <Form.Group>
                  <Form.Label as='legend'>Time</Form.Label>
                  <Col>
                    <Form.Check
                      type='radio'
                      label='Anytime'
                      id='anytime'
                      name='timeFilter'
                      value='Anytime'
                      checked={timeFilter === "Anytime"}
                      onChange={timeFilterChangeHandler}
                    ></Form.Check>
                    <Form.Check
                      type='radio'
                      label='Last 30 days'
                      id='last30days'
                      name='timeFilter'
                      value='Last 30 days'
                      checked={timeFilter === "Last 30 days"}
                      onChange={timeFilterChangeHandler}
                    ></Form.Check>
                    <Form.Check
                      type='radio'
                      label='Last 6 months'
                      id='last6months'
                      name='timeFilter'
                      value='Last 6 months'
                      checked={timeFilter === "Last 6 months"}
                      onChange={timeFilterChangeHandler}
                    ></Form.Check>
                    <Form.Check
                      type='radio'
                      label='Last year'
                      id='lastyear'
                      name='timeFilter'
                      value='Last year'
                      checked={timeFilter === "Last year"}
                      onChange={timeFilterChangeHandler}
                    ></Form.Check>
                  </Col>
                </Form.Group>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={6}>
                    <button
                      type='button'
                      className='btn btn-outline-dark'
                      style={{ width: "100%", height: "100%" }}
                      onClick={clearFilterHandler}
                    >
                      Clear filters
                    </button>
                  </Col>
                  <Col md={6}>
                    <button
                      type='button'
                      className='btn btn-danger'
                      style={{ width: "100%", height: "100%" }}
                      onClick={applyFilterHandler}
                    >
                      Apply
                    </button>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
