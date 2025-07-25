import React, { useEffect, useState } from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../../../../public/assets/img/footerLogo.png";
import CartIcon from "../../../../../public/assets/img/carticon.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../../store/auth";
import userAxios from "../../../../utils/Api/userAxios";
import userApiRoutes from "../../../../utils/Api/Routes/userApiRoutes";
import ProfileIcon from "./Profile_icon.png";
import LoginModal from "../../../unauthorized/Modal/LoginModal";
import { toast } from "react-toastify";

const Header = () => {
  const {
    userAccessToken,
    isLoggedIn,
    cartItems = [],
  } = useSelector((state) => state.auth);
  const contactUsDetails = useSelector((state) => state.auth.contactUsDetails);
  const [openLogin, setOpenLogin] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchCartitems = async () => {
    try {
      const res = await userAxios.get(userApiRoutes.get_cart_item());
      dispatch(authActions.setCartItems(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCartNavigate = () => {
    if (userAccessToken && userAccessToken.length > 0) {
      navigate("/cart");
    } else {
      setOpenLogin(true);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchCartitems();
    }
  }, []);

  const handleLoginModalClose = () => {
    if (isLoggedIn) {
      toast.success("Login successfully.");
    }
    setOpenLogin(false);
  };
  return (
    <>
      <LoginModal visible={openLogin} onClose={() => handleLoginModalClose()} />
      <header id="fixed-header" className="sticky">
        <div className="container">
          <div className="navInner d-flex justify-content-between align-items-center">
            <div className="navLeft">
              <Navbar.Brand as={Link} to="/">
                <img src={contactUsDetails?.frontLogoUrl || Logo} crossOrigin="anonymous" />
              </Navbar.Brand>
            </div>
            <div className="navRight d-flex align-items-center">
              <Navbar
                expand="lg"
                expanded={expanded}
                onToggle={() => setExpanded(!expanded)}
              >
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="">
                    <Nav.Link
                      as={Link}
                      to="/"
                      onClick={() => setExpanded(false)}
                      className={pathname.length == 1 && `active`}
                    >
                      Home
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to={"/about-us"}
                      onClick={() => setExpanded(false)}
                      className={pathname.includes("/about-us") && `active`}
                    >
                      About Us
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to={"/all-packages"}
                      onClick={() => setExpanded(false)}
                      className={pathname.includes("/all-packages") && `active`}
                    >
                      Packages
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/tools"
                      onClick={() => setExpanded(false)}
                      className={pathname.includes("/tools") && `active`}
                    >
                      Tools
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to={"/testimonials"}
                      onClick={() => setExpanded(false)}
                      className={pathname.includes("/testimonials") && `active`}
                    >
                      Testimonials
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to={"/blogs"}
                      onClick={() => setExpanded(false)}
                      className={pathname.includes("/blogs") && `active`}
                    >
                      Blogs
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to={"/contact-us"}
                      onClick={() => setExpanded(false)}
                      className={pathname.includes("/contact-us") && `active`}
                    >
                      Contact Us
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
              <div className="Login-info d-flex align-items-center">
                <div onClick={() => handleCartNavigate()} className="carticon">
                  <img src={CartIcon} />
                  {cartItems.length > 0 && (
                    <span className="cart-item-count">{cartItems.length}</span>
                  )}
                </div>
                {userAccessToken.length > 0 ? (
                  <Link to="/profile" className="header-btn ">
                    <img src={ProfileIcon} className="me-2" /> My Profile
                  </Link>
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
    </>
  );
};

export default Header;
