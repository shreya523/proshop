import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Row, Col, Form, Button, Table } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getUserDetails, updateUserProfile } from "../actions/userActions"
import { listMyOrders } from "../actions/orderActions"
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants"

const ProfileScreen = ({ location }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  //   const redirect = location.search ? location.search.split("=")[1] : "/"
  // const {redirect} = useParams()
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo) {
      navigate("/login")
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails("profile"))
      } else {
        dispatch(listMyOrders())
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [userInfo, navigate, dispatch, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage("Password and Confirm password should be same!")
    } else dispatch(updateUserProfile({ id: user._id, name, email, password }))
  }
  return (
    <Row>
      <Col md={3}>
        <h1>Sign Up</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {success && <Message variant='success'>Profile Updated!</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader></Loader>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type='name'
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
              autoComplete='off'
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
              autoComplete='off'
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <br />
          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Id</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/my/orders/details/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
