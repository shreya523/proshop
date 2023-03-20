import React from "react"
import { useNavigate } from "react-router-dom"

const OrderSuccessScreen = () => {
  const navigate = useNavigate()
  return (
    <div className=''>
      <center className='py-0 '>
        <img
          src='/images/img_confirm.png'
          alt='Order Success'
          height={"500px"}
        />

        <h1 className='p-0 mb-0' style={{ color: "rgb(0 150 136)" }}>
          Order Confirmation!
        </h1>
        <p>Thank you for your purchase</p>
        <button className='btn' onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </center>
    </div>
  )
}

export default OrderSuccessScreen
