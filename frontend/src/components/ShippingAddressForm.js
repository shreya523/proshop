import React, { useState } from "react"
import { Form } from "react-bootstrap"
import { useDispatch } from "react-redux"
import {
  saveShippingAddress,
  updateShippingAddress,
} from "../actions/shippingAddressActions"

const ShippingAddressForm = (props) => {
  const dispatch = useDispatch()

  if (props.address && props.address.defaultAddress) {
    localStorage.setItem("shippingAddress", JSON.stringify(props.address))
  }

  const _id = props.address ? props.address._id : ""
  const [name, setName] = useState(props.address ? props.address.name : "")
  const [phone, setPhone] = useState(props.address ? props.address.phone : "")
  const [pincode, setPincode] = useState(
    props.address ? props.address.pincode : ""
  )
  const [address, setAddress] = useState(
    props.address ? props.address.address : ""
  )
  const [city, setCity] = useState(props.address ? props.address.city : "")
  const [state, setState] = useState(props.address ? props.address.state : "")
  const [type, setType] = useState(props.address ? props.address.type : "")
  const [defaultAddress, setDefaultAddress] = useState(
    props.address ? props.address.defaultAddress : true
  )
  const [error, setError] = useState({})

  const validationHandler = (e) => {
    let formValid = true

    if (name.trim() === "") {
      formValid = false
      setError((prevState) => ({
        ...prevState,
        name: "Name is required",
      }))
    } else if (!name.match(/^[ a-zA-Z]+$/)) {
      formValid = false

      setError((prevState) => ({
        ...prevState,
        name: "Only alphabets allowed",
      }))
    }
    if (String(phone).trim() === "") {
      formValid = false

      setError((prevState) => ({
        ...prevState,
        phone: "Mobile number is required",
      }))
    } else if (
      !String(phone)
        .trim()
        .match(
          /^((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}$/
        )
    ) {
      formValid = false

      setError((prevState) => ({
        ...prevState,
        phone: "Mobile number is not valid",
      }))
    }
    if (pincode.trim() === "") {
      formValid = false

      setError((prevState) => ({
        ...prevState,
        pincode: "Pincode is required",
      }))
    } else if (!pincode.trim().match(/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/)) {
      formValid = false

      setError((prevState) => ({
        ...prevState,
        pincode: "Pincode is not valid",
      }))
    }
    if (address.trim() === "") {
      formValid = false

      setError((prevState) => ({
        ...prevState,
        address: "Address is required",
      }))
    }
    if (city.trim() === "") {
      formValid = false

      setError((prevState) => ({
        ...prevState,
        city: "City is required",
      }))
    }
    if (state.trim() === "") {
      formValid = false

      setError((prevState) => ({
        ...prevState,
        state: "State is required",
      }))
    }
    if (type === "Select an Address Type") {
      formValid = false

      setError((prevState) => ({
        ...prevState,
        type: "Address type is required",
      }))
    }

    return formValid
  }

  const submitHandler = (e) => {
    e.preventDefault()
    setError({})
    if (validationHandler()) {
      if (!props.address) {
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
      } else {
        dispatch(
          updateShippingAddress({
            _id,
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
      }
      props.closeModal()
    }
  }

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group controlId='name'>
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter Full Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required={true}
        ></Form.Control>
        {error.name && <span className='invalid-feedback'>{error.name}</span>}
      </Form.Group>
      <Form.Group controlId='phone'>
        <Form.Label>Mobile Number</Form.Label>
        <Form.Control
          minLength={10}
          type='text'
          placeholder='Enter Mobile Number'
          value={phone}
          required={true}
          onChange={(e) => setPhone(e.target.value)}
        ></Form.Control>
        {error.phone && <span className='invalid-feedback'>{error.phone}</span>}
      </Form.Group>
      <Form.Group controlId='pincode'>
        <Form.Label>Pincode</Form.Label>
        <Form.Control
          minLength={6}
          type='text'
          placeholder='Enter Pincode'
          value={pincode}
          required={true}
          onChange={(e) => setPincode(e.target.value)}
        ></Form.Control>
        {error.pincode && (
          <span className='invalid-feedback'>{error.pincode}</span>
        )}
      </Form.Group>
      <Form.Group controlId='address'>
        <Form.Label>Address (House No, Building, Street, Area)</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter address'
          value={address}
          required
          onChange={(e) => setAddress(e.target.value)}
        ></Form.Control>
        {error.address && (
          <span className='invalid-feedback'>{error.address}</span>
        )}
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
        {error.city && <span className='invalid-feedback'>{error.city}</span>}
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
        {error.state && <span className='invalid-feedback'>{error.state}</span>}
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
        {error.type && <span className='invalid-feedback'>{error.type}</span>}
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Check
          type='checkbox'
          defaultChecked={defaultAddress}
          label='Make this my default address'
          onChange={(e) => setDefaultAddress(e.target.checked)}
        />
      </Form.Group>
      <button
        className='btn btn-danger'
        style={{ width: "100%" }}
        variant='primary'
        onClick={(e) => {
          submitHandler(e)
        }}
      >
        Save This Address
      </button>
    </Form>
  )
}

export default ShippingAddressForm
