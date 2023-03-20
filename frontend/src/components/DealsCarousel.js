import React from "react"
import { Carousel, Image } from "react-bootstrap"

const DealsCarousel = () => {
  return (
    <Carousel variant='dark' pause='hover'>
      <Carousel.Item>
        <Image src='/images/Apple-iPhone-14.jpg' alt='iPhone 14 plus' fluid />
      </Carousel.Item>
      <Carousel.Item>
        <Image
          src='/images/Infinity-Headphone.jpg'
          alt='Infinity Headphone'
          fluid
        />
      </Carousel.Item>
      <Carousel.Item>
        <Image
          src='/images/smartwatches_under1500.jpg'
          alt='Smart Watches'
          fluid
        />
      </Carousel.Item>
    </Carousel>
  )
}

export default DealsCarousel
