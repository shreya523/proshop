import React from "react"
import ShippingAddressForm from "../components/ShippingAddressForm"
import { Modal } from "react-bootstrap"
import ProductReviewForm from "./ProductReviewForm"

const ModalComponent = ({ addressId, show, closeModal, title }) => {
  return (
    <Modal show={show} onHide={() => closeModal()} className='modal-90w'>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProductReviewForm></ProductReviewForm>
        <ShippingAddressForm addressId={addressId} />
      </Modal.Body>
      <Modal.Footer>
        <button
          type='button'
          className='btn btn-danger'
          style={{ width: "100%" }}
          variant='primary'
          onClick={(e) => {
            closeModal()
          }}
        >
          Save This Address
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalComponent
