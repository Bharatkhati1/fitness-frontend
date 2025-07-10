import React from "react";
import { logoutUser } from "../../../../store/auth/AuthExtraReducers";
import userImage from "../../../../../public/assets/images/users/avatar-1.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NavItems } from "../MainNavbarLeft/MainNavbarLeft";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const TopBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  let type = "";
  if (pathname.includes("/admin")) {
    type = "admin";
  } else if (pathname.includes("/b2b-partner")) {
    type = "b2b-partner";
  } else if (pathname.includes("/service-provider")) {
    type = "service-provider";
  }

  const handleLogout = () => {
    dispatch(logoutUser(false, type));
  };

  const getUserType = () => {
    if (pathname.includes("/admin")) return "admin";
    if (pathname.includes("/b2b-partner")) return "b2b-partner";
    if (pathname.includes("/service-provider")) return "service-provider";
    return "";
  };
  // Function to extract display name from NavItems
  const getTitleFromNavItems = (pathname) => {
    const userType = getUserType();
    if (!userType) return "Profile";

    const segments = pathname.split("/").filter(Boolean);
    if (segments.length < 2) return "Dashboard";

    const fullPath = segments.slice(1).join("/"); // skip leading slash segment

    const navGroups = NavItems[userType];
    if (!navGroups) return "Dashboard";

    for (const group of Object.values(navGroups)) {
      for (const item of group.items) {
        if (item.path == fullPath) {
          return item.name;
        }

        if (item.subMenu) {
          for (const subItem of item.subMenu) {
            const combinedSubPath = `${item.path}/${subItem.path}`;
            if (combinedSubPath == fullPath) {
              return `${item.name} / ${subItem.name}`;
            }
          }
        }
      }
    }

    return "Profile";
  };

  const pageTitle = getTitleFromNavItems(pathname);
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
              <h4
                className="fw-bold topbar-button pe-none text-uppercase mb-0"
                style={{ marginLeft: "280px" }}
              >
                {pageTitle}
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
                <Link className="dropdown-item" to={`/${type}/profile`}>
                  <i className="bx bx-user-circle text-muted fs-18 align-middle me-1"></i>
                  <span className="align-middle">Profile</span>
                </Link>
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
