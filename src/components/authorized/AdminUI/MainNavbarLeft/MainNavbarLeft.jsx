import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../../../public/assets/img/footerLogo.png";

const NavItems = [
  { id: 1, name: "Slider Management", path: "slider-management" },
  {
    id: 2,
    name: "Service Management",
    path: "service-management",
    subMenu: [
      { name: "Services", path: "services" },
      { name: "Packages", path: "packages" },
    ],
  },
  {
    id: 4,
    name: "Blog Management",
    path: "blog-management",
    subMenu: [
      { name: "Blogs", path: "blog" },
      { name: "Category", path: "category" },
    ],
  },
  { id: 5, name: "Success Story", path: "success-stories" },
  { id: 6, name: "Team Management", path: "team-management" },
  { id: 7, name: "Consultant", path: "consultants" },
  {
    id: 8,
    name: "Smart Kitchen",
    path: "smart-kitchen",
    subMenu: [
      { name: "Recepies", path: "recepies" },
      { name: "Category", path: "category" },
    ],
  },
  {
    id: 9,
    name: "Inquiries",
    path: "inquiries",
    subMenu: [
      { name: "Community", path: "community" },
      { name: "Inquiry", path: "inquiry" },
    ],
  },
  {
    id: 10,
    name: "Partner Management",
    path: "partner-management",
    subMenu: [
      { name: "Partners", path: "partners" },
      { name: "Category", path: "category" },
    ],
  },
  {
    id: 11,
    name: "Event management",
    path: "event-management",
    subMenu: [
      { name: "Event", path: "event" },
      { name: "Event Type", path: "type" },
      { name: "Event Header", path: "header" },
    ],
  },
  { id: 12, name: "Careers", path: "careers" },
  {
    id: 13,
    name: "News and Media",
    path: "news-media",
    subMenu: [
      { name: "Manage", path: "manage" },
      { name: "Category", path: "category" },
    ],
  },
  {
    id: 14,
    name: "Company Settings",
    path: "company-settings",
    subMenu: [
      {name:"All Users", path:"users"},
      { name: "Contact Details", path: "contact-details" },
      { name: "Privacy Policy", path: "privacy-policy" },
      { name: "Return Policy", path: "return-policy" },
      { name: "Careers", path: "career" },
    ],
  },
  {
    id: 14,
    name: "Innovation",
    path: "innovation",
    subMenu: [
      { name: "Manage", path: "manage" },
      { name: "Category", path: "category" },
    ],
  },
  {
    id: 15,
    name: "Coupons",
    path: "coupon",
  },
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
            const isParentActive = pathname.includes(item.path);
            return (
              <li className="nav-item" key={item.id}>
                <Link
                  to={
                    item.subMenu
                      ? `/admin/${item.path}/${item.subMenu[0].path}`
                      : `/admin/${item.path}`
                  }
                  className={`nav-link ${isParentActive ? "active" : ""}`}
                >
                  <span className="nav-icon">
                    <iconify-icon icon="solar:widget-5-bold-duotone"></iconify-icon>
                  </span>
                  <span className="nav-text">{item.name}</span>
                </Link>

                {item.subMenu && isParentActive && (
                  <div className="collapse show" id={`sidebar-${item.path}`}>
                    <ul className="nav sub-navbar-nav">
                      {item.subMenu.map((sub, index) => {
                        const isSubActive = pathname.includes(sub.path);
                        return (
                          <li
                            className={`sub-nav-item ${
                              isSubActive ? "active" : ""
                            }`}
                            key={index}
                          >
                            <Link
                              to={`/admin/${item.path}/${sub.path}`}
                              className={`sub-nav-link ${
                                isSubActive ? "active" : ""
                              }`}
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
