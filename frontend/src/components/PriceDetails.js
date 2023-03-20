import React from "react"
import { useSelector } from "react-redux"
import { ListGroup, Card } from "react-bootstrap"
import { priceDetails } from "../controllers/PriceDetailsController"

const PriceDetails = () => {
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const { itemsPrice, shippingPrice, taxPrice, totalPrice, selectedItems } =
    priceDetails(cartItems)

  return (
    <>
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
                <span className='text-end'>₹{itemsPrice}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Shipping Cost</span>
                <span>₹{shippingPrice}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Other Taxes</span>
                <span>₹{taxPrice}</span>
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
                <span>₹{totalPrice}</span>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      )}
    </>
  )
}

export default PriceDetails
