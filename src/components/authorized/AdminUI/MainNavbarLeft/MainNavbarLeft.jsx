import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../../../public/assets/images/logo-light.png";

const NavItems = [
  { id: 1, name: "Slider Management", path: "slider-management" },
  { id: 2, name: "Service Management", path: "service-management" },
  { id: 3, name: "Package Management", path: "package-management" },
  // { id: 4, name: "Blog Management", path: "blog-management", subMenu: [
  //     { name: "Blogs", path: "blog" },
  //     { name: "Category", path: "category" }
  //   ]
  // },
  // { id: 5, name: "Success Story", path: "success-stories" }
];

const MainNavbarLeft = () => {
  const { pathname } = useLocation();

  return (
    <div className="main-nav">
      <div className="logo-box">
        <a className="logo-light">
          <img src={logo} height="50" alt="logo light" />
        </a>
      </div>

      <div className="scrollbar" data-simplebar>
        <ul className="navbar-nav" id="navbar-nav">
          <li className="menu-title">General</li>

          {NavItems.map((item) => {
            const isActive = pathname.includes(item.path);
            return (
              <li className="nav-item" key={item.id}>
                <Link
                  to={`/admin/${item.path}`}
                  className={`nav-link ${isActive ? "active" : ""}`}
                >
                  <span className="nav-icon">
                    <iconify-icon icon="solar:widget-5-bold-duotone"></iconify-icon>
                  </span>
                  <span className="nav-text">{item.name}</span>
                </Link>

                {/* Submenu if exists and current path is within this parent */}
                {item.subMenu && isActive && (
                  <div className="collapse show" id={`sidebar-${item.path}`}>
                    <ul className="nav sub-navbar-nav">
                      {item.subMenu.map((sub, index) => {
                        const isSubActive = pathname.includes(sub.path);
                        return (
                          <li className={`sub-nav-item ${isSubActive ? "active" : ""}`} key={index}>
                            <Link
                              to={`/admin/${item.path}/${sub.path}`}
                              className={`sub-nav-link ${isSubActive ? "active" : ""}`}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MainNavbarLeft;
