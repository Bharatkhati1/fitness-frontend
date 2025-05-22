import React from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../../../../../public/assets/img/logo.png";
import CartIcon from "../../../../../public/assets/img/carticon.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../../store/auth/AuthExtraReducers";

const Header = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const dispatch=useDispatch()
 const handleLogout =()=>{
  dispatch(logoutUser(navigate))
 }
  return (
    <header id="fixed-header" className="sticky">
      <div className="container">
        <div className="navInner d-flex justify-content-between align-items-center">
          <div className="navLeft">
            <Navbar.Brand href="#home">
              <img src={Logo} />
            </Navbar.Brand>
          </div>
          <div className="navRight d-flex align-items-center">
            <Navbar expand="lg">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="">
                  <Link to={"/home"} className="active">
                    Home
                  </Link>
                  <Nav.Link href="#link">About</Nav.Link>
                  <NavDropdown title="Packages" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="#home">Tools</Nav.Link>
                  <Nav.Link href="#link">Testimonials</Nav.Link>
                  <Nav.Link href="#link">Blogs</Nav.Link>
                  <Nav.Link href="#link">Contact Us</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <div className="Login-info d-flex align-items-center">
              <a className="carticon">
                <img src={CartIcon} />
              </a>
              {isLoggedIn ? (
                <button onClick={()=>handleLogout()} className="header-btn ">
                  Logout
                </button>
              ) : (
                <Link to="/LoginUser" className="header-btn ">
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
