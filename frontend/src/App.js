import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Container } from "react-bootstrap"

//components
import Header from "./components/Header"
import Footer from "./components/Footer"

//user screen
import HomeScreen from "./screens/HomeScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import ProfileScreen from "./screens/ProfileScreen"

//product screen
import ProductDetailsScreen from "./screens/ProductDetailsScreen"

//cart/wishlist screen
import CartScreen from "./screens/CartScreen"
import WishlistScreen from "./screens/WishlistScreen"

//order screen
import OrdersScreen from "./screens/OrdersScreen"
import OrderDetailsScreen from "./screens/OrderDetailsScreen"
import PlaceOrderScreen from "./screens/PlaceOrderScreen"
import ShippingScreen from "./screens/ShippingScreen"
import PaymentScreen from "./screens/PaymentScreen"

//admin screen
import OrderListScreen from "./screens/OrderListScreen"
import UserListScreen from "./screens/UserListScreen"
import UserEditScreen from "./screens/UserEditScreen"
import ProductListScreen from "./screens/ProductListScreen"
import ProductEditScreen from "./screens/ProductEditScreen"
import OrderSuccessScreen from "./screens/OrderSuccessScreen"

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route
              path='/'
              element={
                <main className='py-3'>
                  <HomeScreen />
                </main>
              }
              exact
            />
            <Route path='/search/:keyword' element={<HomeScreen />} exact />
            <Route path='/page/:pageNumber' element={<HomeScreen />} exact />
            <Route
              path='/search/:keyword/page/:pageNumber'
              element={<HomeScreen />}
              exact
            />
            <Route path='/product/:id' element={<ProductDetailsScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/wishlist' element={<WishlistScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/my/profile' element={<ProfileScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/order-success' element={<OrderSuccessScreen />} />
            <Route path='/my/orders' element={<OrdersScreen />} />
            <Route
              path='/my/orders/details/:id'
              element={<OrderDetailsScreen />}
            />
            <Route path='/admin/userlist' element={<UserListScreen />} />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
            <Route
              path='/admin/productlist'
              element={<ProductListScreen />}
              exact
            />
            <Route
              path='/admin/productlist/:pageNumber'
              element={<ProductListScreen />}
              exact
            />
            <Route
              path='/admin/product/:id/edit'
              element={<ProductEditScreen />}
            />
            <Route
              path='/admin/orderlist'
              element={<OrderListScreen />}
              exact
            />
            <Route
              path='/admin/orderlist/:pageNumber'
              element={<OrderListScreen />}
              exact
            />
            <Route
              path='/admin/order/:id/edit'
              element={<OrderDetailsScreen />}
            />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
