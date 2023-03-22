import React from "react"
import { Row, Col, ListGroup, Image, Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import Message from "../components/Message"

const CartItem = ({
  item,
  updateCartItemsSelectionHandler,
  updateCartItemsQuantityHandler,
  removeCartItemsHandler,
}) => {
  return (
    <ListGroup.Item>
      <input
        type='checkbox'
        defaultChecked={item.selected}
        className='form-check-input'
        onChange={(e) => {
          updateCartItemsSelectionHandler(e, item._id)
        }}
      />
      <Row>
        <Col md={2}>
          <Image src={item.image} alt={item.name} fluid rounded />
        </Col>
        <Col md={3}>
          <Link
            to={`/product/${item.product}`}
            style={{
              cursor: "pointer",
              textDecoration: "none",
              fontWeight: "450",
            }}
          >
            {item.name}
          </Link>
        </Col>
        <Col md={2}>
          {item.price?.toLocaleString("en-IN", {
            maximumFractionDigits: 2,
            style: "currency",
            currency: "INR",
          })}
        </Col>
        <Col md={2}>
          <Form.Control
            as='input'
            value={item.qty}
            type='number'
            min='1'
            onChange={(e) => {
              updateCartItemsQuantityHandler(e, item._id)
            }}
          ></Form.Control>
        </Col>
        <Col md={2}>
          <Button
            type='button'
            variant='light'
            onClick={() => {
              removeCartItemsHandler(item._id)
            }}
          >
            <i className='fas fa-trash'></i>
          </Button>
        </Col>
      </Row>
      {item.qty > item.countInStock && (
        <>
          <div>&nbsp;</div>
          <Message variant='danger'>
            Max {item.countInStock} quantity is available
          </Message>
        </>
      )}
    </ListGroup.Item>
  )
}

export default CartItem
