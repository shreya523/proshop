import React from "react"
import { Row, Col, ListGroup, Card, Form } from "react-bootstrap"

const ShippingAddress = ({
  address,
  editHandler,
  deleteHandler,
  selectedAddressHandler,
  defaultChecked,
}) => {
  return (
    <ListGroup.Item style={{ border: "none" }}>
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
                defaultChecked={defaultChecked}
                onChange={selectedAddressHandler}
              ></Form.Check>
            </Form.Group>
          </Col>
          <Col md={11}>
            <Card.Body>
              <Card.Title style={{ fontWeight: "15000" }}>
                {address.name} - {address.type}
              </Card.Title>
              <Card.Text className='m-0'>{address.address}</Card.Text>
              <Card.Text>
                {address.city}, {address.state} - {address.pincode}
              </Card.Text>
              <Card.Text>Mobile: {address.phone}</Card.Text>
              <button
                type='button'
                className='btn btn-outline-primary rounded m-1 py-1'
                style={{
                  fontWeight: "500",
                  borderWidth: "1.5px",
                }}
                onClick={() => editHandler(address)}
              >
                Edit
              </button>
              <button
                type='button'
                className='btn btn-outline-primary rounded m-1 py-1'
                onClick={() => {
                  deleteHandler(address._id)
                }}
                style={{
                  fontWeight: "500",
                  borderWidth: "1.5px",
                }}
              >
                Remove
              </button>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </ListGroup.Item>
  )
}

export default ShippingAddress
