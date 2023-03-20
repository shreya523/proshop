import React from "react"
import { Helmet } from "react-helmet"

const Meta = ({ title, description, keywords }) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description}></meta>
        <meta name='keywords' content={keywords}></meta>
      </Helmet>
    </div>
  )
}

Meta.defaultProps = {
  title: "Welcome To Proshop",
  description: "Find best products at affordable rates",
  keywords: "electronics, buy, iphone, cheap products",
}

export default Meta
