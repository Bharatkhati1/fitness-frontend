import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../../../public/assets/images/logo-light.png"

const MainNavbarLeft = () => {
  const { pathname } = useLocation();

  const Navitems = [
    { name: "Slider Management ", path: "slider-management" },
    { name: "Service Management ", path: "service-management" },
    { name: "Package Management ", path: "package-management" },
    { name: "Success Story", path: "success-stories" },
  ];

  return (
    <div className="main-nav">
      <div className="logo-box">
        <a className="logo-light">
          <img
            src={logo}
            height="50"
            alt="logo light"
          />
        </a>
      </div>
      <div className="scrollbar" data-simplebar>
        <ul className="navbar-nav" id="navbar-nav">
          <li className="menu-title">General</li>
          {Navitems.map((item) => (
            <li className="nav-item">
              <Link
                to={`/admin/${item.path}`}
                className={`nav-link ${
                  pathname.includes(item.path) && "active"
                }`}
              >
                <span className="nav-icon">
                  <iconify-icon icon="solar:widget-5-bold-duotone"></iconify-icon>
                </span>
                <span className="nav-text">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainNavbarLeft;
