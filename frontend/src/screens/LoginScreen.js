import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Row, Col, Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { login } from "../actions/userActions"
import { getWishlistItems } from "../actions/wishlistActions.js"
import FromContainer from "../components/FromContainer"

const LoginScreen = ({ location }) => {
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
    <FromContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader></Loader>}
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
        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New User? <Link to={`/register`}>Register</Link>
        </Col>
      </Row>
    </FromContainer>
  )
}

export default LoginScreen
