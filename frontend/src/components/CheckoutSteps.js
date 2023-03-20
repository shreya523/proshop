import React from "react"
import { Nav } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

const CheckoutSteps = ({ step }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      {step > 0 ? (
        <LinkContainer to='/cart'>
          <Nav.Link
            className={`${
              step === 1 ? "text-success" : "text-secondary"
            } fw-semibold text-uppercase `}
          >
            Cart
          </Nav.Link>
        </LinkContainer>
      ) : (
        <Nav.Link className='fw-semibold text-uppercase text-muted' disabled>
          Cart
        </Nav.Link>
      )}
      <span className='py-2'>--------</span>
      {step > 1 ? (
        <LinkContainer to='/shipping'>
          <Nav.Link
            className={`${
              step === 2 ? "text-success" : "text-secondary"
            } fw-semibold text-uppercase `}
          >
            Shipping
          </Nav.Link>
        </LinkContainer>
      ) : (
        <Nav.Link className='fw-semibold text-uppercase text-muted' disabled>
          Shipping
        </Nav.Link>
      )}
      <span className='py-2'>--------</span>
      {step > 2 ? (
        <LinkContainer to='/payment'>
          <Nav.Link
            className={`${
              step === 3 ? "text-success" : "text-secondary"
            } fw-semibold text-uppercase `}
          >
            Payment
          </Nav.Link>
        </LinkContainer>
      ) : (
        <Nav.Link className='fw-semibold text-uppercase text-muted' disabled>
          Payment
        </Nav.Link>
      )}
    </Nav>
  )
}

export default CheckoutSteps
