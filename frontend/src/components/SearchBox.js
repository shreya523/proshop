import React, { useState } from "react"
import { Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const SearchBox = () => {
  const [keyword, setKeyword] = useState("")
  const navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate(`/`)
    }
    setKeyword("")
  }
  return (
    <Form onSubmit={submitHandler} className='d-flex'>
      <Form.Control
        type='text'
        name='q'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5 rounded-5'
      ></Form.Control>
      <button type='submit' className='btn p-2'>
        <i className='fa fa-search fa-xl'></i>
      </button>
    </Form>
  )
}

export default SearchBox
