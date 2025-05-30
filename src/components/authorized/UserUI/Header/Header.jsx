import React from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../../../../public/assets/img/logo.png";
import CartIcon from "../../../../../public/assets/img/carticon.png";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../../store/auth/AuthExtraReducers";

const Header = () => {
  const { userAccessToken } = useSelector((state) => state.auth);
  const {pathname } = useLocation()
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser(true));
  };
  return (
    <header id="fixed-header" className="sticky">
      <div className="container">
        <div className="navInner d-flex justify-content-between align-items-center">
          <div className="navLeft">
            <Navbar.Brand as={Link} to="/">
              <img src={Logo} />
            </Navbar.Brand>
          </div>
          <div className="navRight d-flex align-items-center">
            <Navbar expand="lg">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="">
                  <Nav.Link as={Link} to="/" className={pathname.length==1&&`active`}>
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/about-us"}  className={pathname.includes("/about-us")&&`active`}>
                    About Us
                  </Nav.Link>
                  <Nav.Link as={Link}  className={pathname.includes("/packages")&&`active`}>
                    Packages
                  </Nav.Link>
                  <Nav.Link as={Link} to="/tools" className={pathname.includes("/tools")&&`active`}>
                    Tools
                  </Nav.Link>
                  <Nav.Link as={Link}  className={pathname.includes("/testimonials")&&`active`}>
                    Testimonials
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/blogs"}  className={pathname.includes("/blogs")&&`active`}>
                    Blogs
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/contact-us"} className={pathname.includes("/contact-us")&&`active`}>
                    Contact Us
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <div className="Login-info d-flex align-items-center">
              <a className="carticon">
                <img src={CartIcon} />
              </a>
              {userAccessToken.length>0 ? (
                <button onClick={() => handleLogout()} className="header-btn ">
                  Logout
                </button>
              ) : (
                <Link to="/login-user" className="header-btn ">
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
