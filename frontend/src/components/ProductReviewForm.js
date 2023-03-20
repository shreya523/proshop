import React from "react"
import { Form } from "react-bootstrap"
import Rating from "./Rating"

const ProductReviewForm = ({ changeRatingHandler, productId }) => {
  return (
    <Form>
      <Rating
        editMode={true}
        changeRatingHandler={changeRatingHandler}
        productId={productId}
      />
      <div class='form-group'>
        <textarea
          class='form-control'
          rows='5'
          id='comment'
          placeholder='Please write product review here'
        ></textarea>
      </div>
    </Form>
  )
}

export default ProductReviewForm
