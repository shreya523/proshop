import React from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Nav, Navbar, NavDropdown } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../actions/userActions"
import SearchBox from "./SearchBox"

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg='light' variant='light' expand='lg' collapseOnSelect>
        {/* <Container> */}
        <LinkContainer to='/'>
          <Navbar.Brand>
            <span className='pro-text'>PRO</span>
            <span className='shop-text'>SHOP</span>
          </Navbar.Brand>
        </LinkContainer>
        <SearchBox />
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <LinkContainer to='/cart'>
              <Nav.Link>
                <i className='fas fa-shopping-cart fa-xl'></i> Cart
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/wishlist'>
              <Nav.Link>
                <i className='fa-sharp fa-solid fa-heart fa-xl'></i> Wishlist
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <div className='dropdown nav-link'>
                <i className='fa fa-user fa-xl' aria-hidden='true'></i>{" "}
                {userInfo.name}
                <div className='dropdown-content'>
                  <LinkContainer to='/my/profile'>
                    <Nav.Link>Profile</Nav.Link>
                  </LinkContainer>
                  {!userInfo.isAdmin && (
                    <LinkContainer to='/my/orders'>
                      <Nav.Link>My Orders</Nav.Link>
                    </LinkContainer>
                  )}
                  <Nav.Link onClick={logoutHandler}> Logout</Nav.Link>
                </div>
              </div>
            ) : (
              <LinkContainer to='/login'>
                <Nav.Link>
                  <i className='fas fa-user fa-xl'></i> Sign In
                </Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' id='adminmenu'>
                <LinkContainer to='/admin/userlist'>
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/productlist'>
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/orderlist'>
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>
    </header>
  )
}

export default Header
