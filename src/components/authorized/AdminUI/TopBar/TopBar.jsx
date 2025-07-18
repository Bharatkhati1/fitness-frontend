import React from "react";
import { logoutUser } from "../../../../store/auth/AuthExtraReducers";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NavItems } from "../MainNavbarLeft/MainNavbarLeft";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useSelector } from "react-redux";

const TopBar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

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

  // Function to extract display name from NavItems
  const getTitleFromNavItems = (pathname) => {
    const userType = pathname.includes("/admin")
      ? "admin"
      : pathname.includes("/b2b-partner")
      ? "b2b-partner"
      : pathname.includes("/service-provider")
      ? "service-provider"
      : null;
  
    if (!userType) return "Profile";
  
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length < 2) return "Dashboard";
  
    const fullPath = segments.slice(1).join("/"); // skip userType segment
    const navItems = NavItems[userType];
    if (!navItems) return "Dashboard";
  
    // Special handling for sections where "Manage" should be shown in title
    const manageSections = ['news-media', 'innovation', 'testimonials'];
  
    for (const item of navItems) {
      // Check main item path match
      if (item.path === fullPath) {
        return item.name;
      }
  
      // Check submenu items
      if (item.subMenu) {
        for (const subItem of item.subMenu) {
          const combinedPath = `${item.path}/${subItem.path}`;
          
          if (combinedPath === fullPath) {
            // For specific sections, show "Manage" in the title
            if (manageSections.includes(item.path) && subItem.path === 'manage') {
              return `${item.name}`;
            }
            // For other sections, show both parent and child
            return `${item.name} / ${subItem.name}`;
          }
        }
      }
    }
  
    // Fallback for nested routes beyond two levels
    for (const item of navItems) {
      if (fullPath.startsWith(item.path + "/")) {
        const subPath = fullPath.replace(item.path + "/", "");
        if (item.subMenu) {
          const subItem = item.subMenu.find(sub => sub.path === subPath.split('/')[0]);
          if (subItem) {
            if (manageSections.includes(item.path) && subItem.path === 'manage') {
              return `${item.name}`;
            }
            return `${item.name} / ${subItem.name}`;
          }
        }
        return item.name;
      }
    }
  
    return "Dashboard";
  };
  // Usage:
  const pageTitle = getTitleFromNavItems(pathname);

  let value = "";
  if (pathname.includes("/admin")) {
    value = "users";
  } else if (pathname.includes("/b2b-partner")) {
    value = "partners";
  } else if (pathname.includes("/service-provider")) {
    value = "consultants";
  }
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
                    width="36"
                    height="36"
                    crossOrigin="anonymous"
                    src={`https://api.dailyfitness.ai:3005/uploads/${value}/${user?.profilePicture}`}
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
