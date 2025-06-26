import React from "react";
import { logoutUser } from "../../../../store/auth/AuthExtraReducers";
import userImage from "../../../../../public/assets/images/users/avatar-1.jpg"
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const TopBar = () => {

  const pathAndName = {
    "/service-management": "Service Management",
    "/slider-management": "Slider Management",
    "/package-management":"Package Management",
    "/tools":"Tools"
  };

  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser(false));
  };
  return (
    <header className="topbar">
      <div className="container-fluid">
        <div className="navbar-header">
          <div className="d-flex align-items-center">
            <div className="topbar-item">
              <button type="button" className="button-toggle-menu me-2">
                <iconify-icon
                  icon="solar:hamburger-menu-broken"
                  className="fs-24 align-middle"
                ></iconify-icon>
              </button>
            </div>

            <div className="topbar-item">
              <h4 className="fw-bold topbar-button pe-none text-uppercase mb-0">
                {pathAndName[pathname]}
              </h4>
            </div>
          </div>

          <div className="d-flex align-items-center gap-1">

            <div className="dropdown topbar-item">
              <a
                type="button"
                className="topbar-button"
                id="page-header-user-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="d-flex align-items-center">
                  <img
                    className="rounded-circle"
                    width="32"
                    src={userImage}
                    alt="avatar-3/"
                  />
                </span>
              </a>
              <div className="dropdown-menu dropdown-menu-end">
                <h6 className="dropdown-header">Welcome!</h6>
                <button
                  className="dropdown-item text-danger"
                  onClick={() => handleLogout()}
                >
                  <i className="bx bx-log-out fs-18 align-middle me-1"></i>
                  <span className="align-middle">Logout</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
