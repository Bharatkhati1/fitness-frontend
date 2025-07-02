import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../../../public/assets/img/footerLogo.png";

const NavItems = {
  admin: [
    { id: 1, name: "Slider Management", path: "slider-management", subMenu: [
      { name: "Manage", path: "manage" },
      // { name: "Why Us Image", path: "why-us-image" },
    ], },
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
    {
      id: 6, name: "Team Management", path: "team-management" ,
      subMenu: [
        { name: "Team", path: "manage" },
        { name: "Message", path: "message" },
      ],
    },
    {
      id: 7,
      name: "Consultant",
      path: "consultants",
      subMenu: [
        { name: "Manage Consultant", path: "manage" },
        { name: "Manage Leaves", path: "leaves" },
      ],
    },
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
      path: "inquiries"
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
        { name: "All Users", path: "users" },
        { name: "Orders", path: "orders" },
        { name: "Testimonials", path: "testimonials" },
        { name: "Appointments", path: "appointments" },
        { name: "About Us", path: "about-us" },
        { name: "Job Applications", path: "applied-jobs" },
        { name: "Contact Details", path: "contact-details" },
        { name: "Privacy Policy", path: "privacy-policy" },
        { name: "Refund Policy", path: "refund-policy" },
        { name: "Careers", path: "career" },
        { name: "Innovation", path: "innovation" },
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
  ],
  "b2b-partner": [
    { id: 1, name: "Dashboard", path: "dashboard" },
    { id: 2, name: "Coupon List", path: "coupons" },
    { id: 3, name: "Ledger", path: "ledger" },
  ],
  "service-provider": [
    { id: 1, name: "Dashboard", path: "dashboard" },
    { id: 2, name: "Appointments", path: "appointment" },
    { id: 3, name: "Ledger", path: "ledger" },
  ],
};

const MainNavbarLeft = () => {
  const { pathname } = useLocation();

  let type = "";
  if (pathname.includes("/admin")) {
    type = "admin";
  } else if (pathname.includes("/b2b-partner")) {
    type = "b2b-partner";
  } else if (pathname.includes("/service-provider")) {
    type = "service-provider";
  }

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
          {NavItems[type]?.map((item) => {
            const isParentActive = pathname.includes(item.path);
            return (
              <li className="nav-item" key={item.id}>
                <Link
                  to={
                    item.subMenu
                      ? `/${type}/${item.path}/${item.subMenu[0].path}`
                      : `/${type}/${item.path}`
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
                              to={`/${type}/${item.path}/${sub.path}`}
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
