import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Row, Col, Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { register } from "../actions/userActions"
import FromContainer from "../components/FromContainer"

const RegisterScreen = ({ location }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  //   const redirect = location.search ? location.search.split("=")[1] : "/"
  // const {redirect} = useParams()
  const dispatch = useDispatch()
  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const navigate = useNavigate()
  useEffect(() => {
    if (userInfo) {
      navigate("/")
    }
  }, [userInfo, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage("Password and Confirm password should be same!")
    } else dispatch(register(name, email, password))
  }
  return (
    <FromContainer>
      <h2>User Profile</h2>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader></Loader>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
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
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Alredy have account? <Link to={`/login`}>Log In</Link>
        </Col>
      </Row>
    </FromContainer>
  )
}

export default RegisterScreen
