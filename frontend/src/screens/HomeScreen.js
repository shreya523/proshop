import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import Meta from "../components/Meta.js"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col } from "react-bootstrap"
import Product from "../components/Product.js"
import Loader from "../components/Loader.js"
import Message from "../components/Message.js"
import Paginate from "../components/Paginate.js"
import DealsCarousel from "../components/DealsCarousel.js"
import { listProducts } from "../actions/productActions.js"
import { useParams } from "react-router-dom"

const HomeScreen = () => {
  const keyword = useParams().keyword
  const { pageNumber } = useParams()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, pages, page } = productList

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      {!keyword ? (
        // <ProductCarousel />
        <DealsCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          ></Paginate>
        </>
      )}
    </>
  )
}

export default HomeScreen
