import React, { useEffect } from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../../../../public/assets/img/footerLogo.png";
import CartIcon from "../../../../../public/assets/img/carticon.png";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../../store/auth/AuthExtraReducers";
import { authActions } from "../../../../store/auth";
import { toast } from "react-toastify";
import userAxios from "../../../../utils/Api/userAxios";
import userApiRoutes from "../../../../utils/Api/Routes/userApiRoutes";

const Header = () => {
  const { userAccessToken,isLoggedIn} = useSelector((state) => state.auth);
  const {pathname } = useLocation()
  const dispatch = useDispatch();

  const fetchCartitems = async () => {
    try {
      const res = await userAxios.get(userApiRoutes.get_cart_item);
      dispatch(authActions.setCartItems(res?.data?.data));
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser(true));
  };
  useEffect(()=>{
    if(isLoggedIn){
      fetchCartitems()
    }

  },[])
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
                  <Nav.Link as={Link} to={"/all-packages"}  className={pathname.includes("/all-packages")&&`active`}>
                    Packages
                  </Nav.Link>
                  <Nav.Link as={Link} to="/tools" className={pathname.includes("/tools")&&`active`}>
                    Tools
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/testimonials"} className={pathname.includes("/testimonials")&&`active`}>
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
              <Link to={"/cart"} className="carticon">
                <img src={CartIcon} />
              </Link>
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
