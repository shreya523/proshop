import React, { useState, useEffect } from "react"
import Meta from "../components/Meta.js"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams, useNavigate } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Form } from "react-bootstrap"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Rating from "../components/Rating"
import { listProductDetails } from "../actions/productActions.js"
import { addToCart } from "../actions/cartActions.js"
import {
  addToWishlist,
  removeFromWishlist,
} from "../actions/wishlistActions.js"
import Loader from "../components/Loader"
import Message from "../components/Message"
import Toast from "../components/Toast.js"

const ProductDetailsScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [qty, setQty] = useState(1)
  const [wishListed, setWishListed] = useState(false)
  const [addedInCart, setAddedInCart] = useState(false)

  const { id } = useParams()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const wishlist = useSelector((state) => state.wishlist)
  const { wishlistItems } = wishlist

  const addToCartHandler = async () => {
    if (userInfo) {
      if (qty > 0) {
        dispatch(addToCart(id, qty)).then(
          (res) => {
            setAddedInCart(true)
            toastSuccess("Added in the cart")
          },
          (rej) => {
            toastError("Something went wrong")
          }
        )
      } else {
        toastError("Quantity should be greater than 1")
      }
    } else {
      navigate(`/login`)
    }
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

  const addToWishlistHandler = () => {
    if (userInfo) {
      dispatch(addToWishlist([product._id])).then((res) => {
        setWishListed(true)
      })
    } else {
      navigate(`/login`)
    }
  }

  const removeFromWishlistHandler = () => {
    dispatch(removeFromWishlist(product._id)).then((res) =>
      setWishListed(false)
    )
  }

  const navigateToCartHandler = () => {
    navigate(`/cart`)
  }
  const changeQtyHandler = (e) => {
    if (product.countInStock > 0) {
      if (qty >= product.countInStock) {
        toastError(`Max ${product.countInStock} quantity is available`)
      } else {
        setQty(e.target.value)
      }
    }
  }

  useEffect(() => {
    if (userInfo && wishlistItems && wishlistItems.length > 0) {
      setWishListed(
        wishlistItems.some((wishlistItem) => wishlistItem.product === id)
      )
    }
    dispatch(listProductDetails(id))
  }, [dispatch, id, userInfo, wishlistItems])

  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Toast />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={6}>
              <Row>
                <Col md={6}>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      ></Rating>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Price:{" "}
                      {product.price?.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                        style: "currency",
                        currency: "INR",
                      })}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Description: {product.description}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={6}>
                  <Card>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <Row>
                          <Col>Price</Col>
                          <Col>
                            <strong>
                              {product.price?.toLocaleString("en-IN", {
                                maximumFractionDigits: 2,
                                style: "currency",
                                currency: "INR",
                              })}
                            </strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Status</Col>
                          <Col>
                            {product.countInStock > 0
                              ? "In Stock"
                              : "Currently Unavailable"}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      {product.countInStock > 0 && (
                        <ListGroup.Item>
                          <Row>
                            <Col>Qty</Col>
                            <Col>
                              <Form.Control
                                as='input'
                                value={qty}
                                type='number'
                                min='1'
                                onChange={changeQtyHandler}
                              ></Form.Control>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )}
                      <ListGroup.Item>
                        {!addedInCart ? (
                          <Row>
                            <Col md={8}>
                              <button
                                style={{ width: "100%", height: "100%" }}
                                onClick={addToCartHandler}
                                className='btn btn-danger'
                                type='button'
                                disabled={
                                  product.countInStock === 0 ||
                                  qty > product.countInStock
                                }
                              >
                                Add to Cart
                              </button>
                            </Col>
                            {!wishListed ? (
                              <Col md={4}>
                                <button
                                  style={{ width: "100%", height: "100%" }}
                                  className='btn btn-secondary'
                                  type='button'
                                  onClick={addToWishlistHandler}
                                >
                                  <i className='fa-regular fa-heart fa-2xl'></i>
                                </button>
                              </Col>
                            ) : (
                              <Col md={4}>
                                <button
                                  style={{ width: "100%", height: "100%" }}
                                  className='btn btn-secondary'
                                  type='button'
                                  onClick={removeFromWishlistHandler}
                                >
                                  <i className='fa-sharp fa-solid fa-heart fa-2xl'></i>
                                </button>
                              </Col>
                            )}
                          </Row>
                        ) : (
                          <button
                            style={{ width: "100%", height: "100%" }}
                            className='btn btn-danger'
                            type='button'
                            onClick={navigateToCartHandler}
                          >
                            Go to Cart
                          </button>
                        )}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
              <Row className='mx-1'>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant='flush'>
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <Row>
                        <Col md={3}>
                          <Rating value={review.rating}></Rating>
                        </Col>
                        <Col md={9}>
                          <p>{review.comment}</p>
                          <strong>{review.name}</strong> |{" "}
                          <span>{review.createdAt.substring(0, 10)}</span>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductDetailsScreen
