import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Row, Col, ListGroup, Card, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"

//Components
import CheckoutSteps from "../components/CheckoutSteps"
import Loader from "../components/Loader"
import Message from "../components/Message"
import PriceDetails from "../components/PriceDetails"
import ShippingAddressForm from "../components/ShippingAddressForm"
import ShippingAddress from "../components/ShippingAddress"

//Redux-actions
import {
  getShippingAddresses,
  deleteShippingAddress,
} from "../actions/shippingAddressActions"

//Controller
import { priceDetails } from "../controllers/PriceDetailsController"

const ShippingScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [show, setShow] = useState(false)
  const [address, setAddress] = useState(null)

  const shippingAddresses = useSelector((state) => state.shippingAddress)
  const { loading, error, data } = shippingAddresses

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const { loading: loadingCreate } = useSelector(
    (state) => state.shippingAddressCreate
  )

  const { loading: loadingDelete } = useSelector(
    (state) => state.shippingAddressDelete
  )

  const { loading: loadingUpdate } = useSelector(
    (state) => state.shippingAddressUpdate
  )

  const { cartItems } = useSelector((state) => state.cart)
  const { selectedItems } = priceDetails(cartItems)
  const [selectedAddress, setSelectedAddress] = useState(
    JSON.parse(localStorage.getItem("shippingAddress"))
  )

  const checkoutHandler = () => {
    if (userInfo) {
      if (!selectedAddress && data?.defaultAddress) {
        const address = data.addresses.find(
          (address) => address._id === data?.defaultAddress
        )
        localStorage.setItem("shippingAddress", JSON.stringify(address))
      }
      navigate("/payment")
    } else navigate("/login")
  }

  const selectedAddressHandler = (e) => {
    const address = data.addresses.find(
      (address) => address._id === e.target.value
    )
    localStorage.setItem("shippingAddress", JSON.stringify(address))
    setSelectedAddress(JSON.parse(localStorage.getItem("shippingAddress")))
  }

  useEffect(() => {
    if (!userInfo) {
      navigate("/login")
    } else if (selectedItems < 1) {
      navigate("/cart")
    } else {
      dispatch(getShippingAddresses())
      setSelectedAddress(JSON.parse(localStorage.getItem("shippingAddress")))
    }
  }, [
    navigate,
    dispatch,
    userInfo,
    selectedItems,
    loadingUpdate,
    loadingCreate,
    loadingDelete,
  ])

  const editHandler = (address) => {
    setAddress({
      ...address,
      defaultAddress: data?.defaultAddress === address._id,
    })
    setShow(true)
  }
  const deleteHandler = (id) => {
    dispatch(deleteShippingAddress(id))
  }

  const closeModal = () => {
    setShow(false)
  }

  const openModal = () => {
    setAddress(null)
    setShow(true)
  }

  return (
    <>
      <CheckoutSteps step={2}></CheckoutSteps>
      {loading || loadingCreate || loadingDelete || loadingUpdate ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Modal show={show} onHide={closeModal} className='modal-90w'>
            <Modal.Header closeButton>
              <Modal.Title>
                {address ? "Edit Address" : "Add New Address"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ShippingAddressForm address={address} closeModal={closeModal} />
            </Modal.Body>
          </Modal>
          <Row>
            <Col md={8}>
              {data && data.addresses.length === 0 ? (
                <>
                  <h1>Add Shipping Address</h1>
                  <ShippingAddressForm />
                </>
              ) : (
                <>
                  <Row>
                    <Col md={8}>
                      <h1>Select Shipping Address</h1>
                    </Col>
                    <Col md={4}>
                      <button
                        type='button'
                        className='btn btn-outline-dark rounded'
                        style={{ width: "100%" }}
                        onClick={openModal}
                      >
                        Add New Address
                      </button>
                    </Col>
                  </Row>
                  <ListGroup variant='flush'>
                    {data?.addresses.some(
                      (address) => data?.defaultAddress === address._id
                    ) && (
                      <h4 className='mx-3 mt-3 fw-normal'>Default Address</h4>
                    )}
                    {data?.addresses.map(
                      (address) =>
                        address._id === data.defaultAddress && (
                          <ShippingAddress
                            key={address._id}
                            address={address}
                            editHandler={editHandler}
                            deleteHandler={deleteHandler}
                            selectedAddressHandler={selectedAddressHandler}
                            defaultChecked={
                              selectedAddress
                                ? selectedAddress._id === address._id
                                : true
                            }
                          />
                        )
                    )}

                    <h4 className='mx-3 mt-3 fw-normal'>Other Addresses</h4>
                    {data &&
                      data.addresses.map(
                        (address) =>
                          address._id !== data.defaultAddress && (
                            <ShippingAddress
                              key={address._id}
                              address={address}
                              editHandler={editHandler}
                              deleteHandler={deleteHandler}
                              selectedAddressHandler={selectedAddressHandler}
                              defaultChecked={
                                selectedAddress
                                  ? selectedAddress._id === address._id
                                  : false
                              }
                            />
                          )
                      )}
                    <ListGroup.Item style={{ border: "none" }}>
                      <Card>
                        <Card.Body>
                          <button
                            type='button'
                            className='btn btn-secondary '
                            style={{
                              fontSize: "1.075rem",
                              color: "#4bbf73",
                            }}
                            onClick={openModal}
                          >
                            <i className='fa fa-solid fa-plus'></i> Add New
                            Address
                          </button>
                        </Card.Body>
                      </Card>
                    </ListGroup.Item>
                  </ListGroup>
                </>
              )}
            </Col>
            <Col md={4}>
              <PriceDetails />
              <button
                type='button'
                className='btn btn-danger'
                style={{ width: "100%" }}
                disabled={!selectedAddress && !data?.defaultAddress}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </button>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ShippingScreen
