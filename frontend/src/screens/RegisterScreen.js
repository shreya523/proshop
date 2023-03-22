import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Row, Col, Form, Button, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { register } from "../actions/userActions"

const RegisterScreen = ({ location }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
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
    } else dispatch(register(name, email, password, phone))
  }
  return (
    <>
      {message && <Message variant='danger'>{message}</Message>}
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
          <h3 className='text-capitalize fw-normal'>Create new account</h3>
        </Card.Header>

        <Card.Body>
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
            </Form.Group>{" "}
            <br />
            <Form.Group controlId='phone'>
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                minLength={10}
                type='text'
                placeholder='Enter Mobile Number'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
            <button
              className='btn btn-danger'
              type='submit'
              style={{ width: "100%" }}
            >
              Create an Account
            </button>
          </Form>
        </Card.Body>
        <Card.Footer className='text-muted text-center pt-3'>
          <p>
            Alredy have account?{" "}
            <Link to={`/login`} className='text-danger'>
              Log In
            </Link>
          </p>
        </Card.Footer>
      </Card>
    </>
  )
}

export default RegisterScreen
