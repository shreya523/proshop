import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Row, Col, ListGroup, Card, Button, Form, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import CheckoutSteps from "../components/CheckoutSteps"
import Loader from "../components/Loader"
import Message from "../components/Message"
import {
  saveShippingAddress,
  getShippingAddresses,
} from "../actions/shippingAddressActions"

const ShippingScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [show, setShow] = useState(false)

  const handleModal = () => setShow(!show)

  const shippingAddresses = useSelector((state) => state.shippingAddress)
  const { loading, error, addresses } = shippingAddresses

  const shippingAddressCreate = useSelector(
    (state) => state.shippingAddressCreate
  )
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = shippingAddressCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  let itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    selectedItems = 0

  if (cartItems && cartItems.length > 0) {
    selectedItems = cart.cartItems.filter((item) => item.selected).length
    itemsPrice = addDecimals(
      cart.cartItems.reduce((acc, item) => {
        if (item.selected) {
          acc += item.qty * item.price
        }
        return acc
      }, 0)
    )
    shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100)
    taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)))
    totalPrice = (
      Number(itemsPrice) +
      Number(shippingPrice) +
      Number(taxPrice)
    ).toFixed(2)
  }

  const [selectedAddress, setSelectedAddress] = useState(
    "63e30c46606a6b22c529943a"
  )
  const selectedAddressChangeHandler = (e) => {
    setSelectedAddress(e.target.value)
  }

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [pincode, setPincode] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [type, setType] = useState("")
  const [defaultAddress, setDefaultAddress] = useState(true)

  useEffect(() => {
    if (!userInfo) {
      navigate("/")
    } else if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
      navigate("/cart")
    } else {
      dispatch(getShippingAddresses())
    }
  }, [navigate, dispatch, userInfo, cart, loadingCreate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      saveShippingAddress({
        name,
        phone,
        pincode,
        address,
        city,
        state,
        defaultAddress,
        type,
      })
    )
    // navigate("/payment")
  }

  const editHandler = (addressId) => {
    setShow(true)

    addresses.map((address) => {
      if (address._id === addressId) {
        setName(address.name)
        setPhone(address.phone)
        setPincode(address.pincode)
        setAddress(address.address)
        setCity(address.city)
        setState(address.state)
        setType(address.type)
        setDefaultAddress(address.defaultAddress)
      }
      return ""
    })
  }

  return (
    <>
      <CheckoutSteps step={2}></CheckoutSteps>
      {loading || loadingCreate ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Modal show={show} onHide={handleModal} className='modal-90w'>
            <Modal.Header closeButton>
              <Modal.Title>Adde New Address</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Full Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='phone'>
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    minLength={10}
                    type='text'
                    placeholder='Enter Mobile Number'
                    value={phone}
                    required
                    onChange={(e) => setPhone(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='pincode'>
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    minLength={6}
                    maxLength={6}
                    type='text'
                    placeholder='Enter Pincode'
                    value={pincode}
                    required
                    onChange={(e) => setPincode(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='address'>
                  <Form.Label>
                    Address (House No, Building, Street, Area)
                  </Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter address'
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter city'
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='state'>
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter State'
                    value={state}
                    required
                    onChange={(e) => setState(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='type'>
                  <Form.Label>Address Type</Form.Label>
                  <Form.Control
                    as='select'
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  >
                    <option>Select an Address Type</option>
                    <option value='Home'>Home</option>
                    <option value='Work'>Work</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Check
                    type='checkbox'
                    defaultChecked={defaultAddress}
                    label='Make this my default address'
                    onChange={(e) => setDefaultAddress(e.target.check)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type='button'
                className='btn btn-danger'
                style={{ width: "100%" }}
                variant='primary'
                onClick={(e) => {
                  submitHandler(e)
                  handleModal()
                }}
              >
                Save This Address
              </button>
            </Modal.Footer>
          </Modal>
          <Row>
            <Col md={8}>
              <Row>
                <Col md={8}>
                  <h1>Select Shipping Address</h1>
                </Col>
                <Col md={4}>
                  <button
                    type='button'
                    className='btn btn-outline-dark rounded'
                    style={{ width: "100%" }}
                    onClick={handleModal}
                  >
                    Add New Address
                  </button>
                </Col>
              </Row>
              <ListGroup variant='flush'>
                {addresses &&
                  addresses.map((address) => (
                    <ListGroup.Item
                      key={address._id}
                      style={{ border: "none" }}
                    >
                      <Card>
                        <Row>
                          <Col md={1}>
                            <Form.Group className='m-3'>
                              <Form.Check
                                className=''
                                type='radio'
                                id={address._id}
                                name='selectedAddress'
                                value={address._id}
                                checked={selectedAddress === address._id}
                                onChange={selectedAddressChangeHandler}
                              ></Form.Check>
                            </Form.Group>
                          </Col>
                          <Col md={11}>
                            <Card.Body>
                              <Card.Title style={{ fontWeight: "15000" }}>
                                {address.name} - {address.type}
                              </Card.Title>
                              <Card.Text className='m-0'>
                                {address.address}
                              </Card.Text>
                              <Card.Text>
                                {address.city}, {address.state} -{" "}
                                {address.pincode}
                              </Card.Text>
                              <Card.Text>Mobile: {address.phone}</Card.Text>
                              <button
                                type='button'
                                className='btn btn-outline-primary rounded m-2'
                                onClick={() => {
                                  editHandler(address._id)
                                }}
                              >
                                Edit
                              </button>
                              <button
                                type='button'
                                className='btn btn-outline-primary rounded m-2'
                              >
                                Remove
                              </button>
                            </Card.Body>
                          </Col>
                        </Row>
                      </Card>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
              {addresses && addresses.length === 0 && (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId='name'>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter Full Name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId='phone'>
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      minLength={10}
                      type='text'
                      placeholder='Enter Mobile Number'
                      value={phone}
                      required
                      onChange={(e) => setPhone(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId='pincode'>
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control
                      minLength={6}
                      maxLength={6}
                      type='text'
                      placeholder='Enter Pincode'
                      value={pincode}
                      required
                      onChange={(e) => setPincode(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId='address'>
                    <Form.Label>
                      Address (House No, Building, Street, Area)
                    </Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter address'
                      value={address}
                      required
                      onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter city'
                      value={city}
                      required
                      onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId='state'>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter State'
                      value={state}
                      required
                      onChange={(e) => setState(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId='type'>
                    <Form.Label>Address Type</Form.Label>
                    <Form.Select aria-label='Address Type' required>
                      <option>Select an Address Type</option>
                      <option value='Home'>Home</option>
                      <option value='Work'>Work</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Check
                      type='checkbox'
                      defaultChecked={defaultAddress}
                      label='Make this my default address'
                      onChange={(e) => setDefaultAddress(e.target.check)}
                    />
                  </Form.Group>
                  <Button type='submit' variant='primary'>
                    Save This Address
                  </Button>
                </Form>
              )}
            </Col>
            <Col md={4}>
              {cartItems && cartItems.length > 0 && (
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h2>Price details ({selectedItems} items)</h2>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>Total MRP</span>
                        <span className='text-end'>${itemsPrice}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>Shipping Cost</span>
                        <span>${shippingPrice}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>Other Taxes</span>
                        <span>${taxPrice}</span>
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
                        <span>${totalPrice}</span>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <button
                        type='button'
                        className='btn btn-danger'
                        style={{ width: "100%" }}
                      >
                        Proceed To Checkout
                      </button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ShippingScreen
