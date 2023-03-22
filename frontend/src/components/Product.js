import React from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import Rating from "./Rating"

const Product = ({ product }) => {
  return (
    <Card className='my-3  rounded'>
      <Link
        to={`/product/${product._id}`}
        style={{ cursor: "pointer", textDecoration: "none" }}
      >
        <Card.Img src={product.image} variant='top'></Card.Img>
      </Link>
      <Card.Body>
        <Link
          to={`/product/${product._id}`}
          style={{ cursor: "pointer", textDecoration: "none" }}
        >
          <Card.Title as='div'>{product.brand}</Card.Title>
          <Card.Text className='text-truncate'>
            <strong>{product.name}</strong>
          </Card.Text>
        </Link>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>
          {product.price?.toLocaleString("en-IN", {
            maximumFractionDigits: 2,
            style: "currency",
            currency: "INR",
          })}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
