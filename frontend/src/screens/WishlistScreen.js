import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col } from "react-bootstrap"
import { Card } from "react-bootstrap"
import Loader from "../components/Loader.js"
import Message from "../components/Message.js"
import { addToCart } from "../actions/cartActions.js"
import {
  getWishlistItems,
  removeFromWishlist,
} from "../actions/wishlistActions.js"

const WishlistScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const wishlist = useSelector((state) => state.wishlist)
  const { loading, wishlistItems } = wishlist

  const removeWishlistItem = useSelector((state) => state.removeWishlistItem)
  const { loading: removeLoading } = removeWishlistItem

  const cartCreate = useSelector((state) => state.cartCreate)
  const { loading: cartCreateLoading } = cartCreate

  useEffect(() => {
    if (userInfo) {
      dispatch(getWishlistItems())
    }
  }, [navigate, dispatch, userInfo, removeLoading])

  return (
    <>
      {loading || removeLoading || cartCreateLoading ? (
        <Loader />
      ) : !userInfo ? (
        <Message>
          Please login to add products in your wishlist{" "}
          <Link to='/login'>Login</Link>
        </Message>
      ) : !wishlistItems || wishlistItems.length === 0 ? (
        <Message>
          Your wishlist is empty <Link to='/'>Add products</Link>
        </Message>
      ) : (
        <>
          <h1>My Wishlist</h1>
          <Row>
            {wishlistItems.map((wishlistItem) => (
              <Col key={wishlistItem._id} sm={12} md={6} lg={4} xl={3}>
                <Card className='rounded'>
                  <Link
                    to={`/product/${wishlistItem.product}`}
                    style={{ cursor: "pointer", textDecoration: "none" }}
                  >
                    <Card.Img src={wishlistItem.image} variant='top'></Card.Img>
                  </Link>
                  <button
                    className='btn card-img-overlay-close'
                    onClick={() => {
                      dispatch(removeFromWishlist(wishlistItem.product))
                    }}
                  >
                    <i className='fa-sharp fa-solid fa-xmark'></i>
                  </button>
                  <Card.Body>
                    <Link
                      to={`/product/${wishlistItem.product}`}
                      style={{ cursor: "pointer", textDecoration: "none" }}
                    >
                      <Card.Text className='text-truncate'>
                        <strong>{wishlistItem.name}</strong>
                      </Card.Text>
                    </Link>
                    <Card.Text as='h3'>
                      {wishlistItem.price?.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                        style: "currency",
                        currency: "INR",
                      })}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer style={{ padding: "none" }}>
                    <button
                      type='button'
                      className='btn btn-danger'
                      style={{
                        width: "100%",
                        borderRadius: "0% 0% 3% 3%",
                        border: "none",
                      }}
                      onClick={() => {
                        if (userInfo) {
                          dispatch(addToCart(wishlistItem.product, 1))
                          dispatch(removeFromWishlist(wishlistItem.product))
                        } else {
                          navigate(`/login`)
                        }
                      }}
                    >
                      Move to cart
                    </button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  )
}

export default WishlistScreen
