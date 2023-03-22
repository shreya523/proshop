import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Form, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { login } from "../actions/userActions"
import { getWishlistItems } from "../actions/wishlistActions.js"

const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const navigate = useNavigate()
  useEffect(() => {
    if (userInfo) {
      dispatch(getWishlistItems())
      navigate("/")
    }
  }, [userInfo, navigate, dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  return (
    <>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader></Loader>}
      <Card
        className='bg-gradient'
        style={{
          maxWidth: "430px",
          margin: "0 auto 20px",
          borderRadius: "8px",
        }}
      >
        <Card.Header className='text-center text-danger'>
          <h3 className='text-capitalize fw-normal'>Log in to your account</h3>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br />
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                autoComplete='on'
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br />
            <button
              className='btn btn-danger'
              type='submit'
              style={{ width: "100%" }}
            >
              Sign In
            </button>
          </Form>
        </Card.Body>
        <Card.Footer className='text-muted text-center pt-3'>
          <p>
            New User?{" "}
            <Link to={`/register`} className='text-danger'>
              Register
            </Link>
          </p>
        </Card.Footer>
      </Card>
    </>
  )
}

export default LoginScreen
