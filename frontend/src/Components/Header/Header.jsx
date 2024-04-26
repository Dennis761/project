import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';
import { logout } from '../../Redux/Actions/userActions.js';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CartList from '../Main/Cart/CartList.jsx';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const token = localStorage.getItem('token');

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/homepage" className="brand">
          <IoHomeOutline /> Antique Shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/product" className="nav-link">Products</Nav.Link>
            <Nav.Link as={Link} to="/publish-product" className="nav-link">Publish Product</Nav.Link>
            <Nav.Link as={Link} to="/saved-list" className="nav-link">Saved</Nav.Link>
            <Nav.Link as={Link} to="/rated-list" className="nav-link">Rated</Nav.Link>
            <Nav.Link as={Link} to="/our-policy" className="nav-link">Policy</Nav.Link>
            <Nav.Link as={Link} to="/history" className="nav-link">History</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="Cart" className="dropdown-item">
              <CartList/>
            </NavDropdown>
            <NavDropdown title="Profile" id="collapsible-nav-dropdown" className="profile-dropdown">
              <NavDropdown.Item as={Link} to={`/profile/${token}`} className="dropdown-item">
                My Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => {
                dispatch(logout(navigate))
              }} className="dropdown-item">
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
