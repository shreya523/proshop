import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Row, Col, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getUserDetails, updateUserProfile } from "../actions/userActions"
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants"

const ProfileScreen = ({ location }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [gender, setGender] = useState("")
  const [DOB, setDOB] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

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
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [userInfo, navigate, dispatch, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage("Password and Confirm password should be same!")
    } else
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
          phone,
          gender,
          DOB,
        })
      )
  }
  return (
    <Row>
      <Col md={2}></Col>
      <Col md={8}>
        <h1>Profile Details</h1>
        {success && <Message variant='success'>Profile Updated!</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading ? (
          <Loader />
        ) : message ? (
          <Message variant='danger'>{message}</Message>
        ) : (
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
            <Form.Group controlId='gender'>
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as='select'
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option>---Select gender---</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Other'>Other</option>
              </Form.Control>
            </Form.Group>
            <br />
            <Form.Group controlId='DOB'>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type='date'
                value={DOB}
                onChange={(e) => setDOB(e.target.value)}
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
            <Row style={{ justifyContent: "center" }}>
              {" "}
              <button
                className='btn btn-danger'
                type='submit'
                style={{ width: "100%" }}
              >
                Update
              </button>
            </Row>
          </Form>
        )}
      </Col>
      <Col md={2}></Col>
    </Row>
  )
}

export default ProfileScreen
