import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../../../public/assets/img/footerLogo.png";
import { useSelector } from "react-redux";

export const NavItems = {
  admin: [
    {
      id: 1,
      name: "Slider Management",
      path: "slider-management",
    },
    {
      id: 2,
      name: "Service Management",
      path: "service-management",
      subMenu: [
        { id: 21, name: "Services", path: "services" },
        { id: 22, name: "Packages", path: "packages" },
      ],
    },
    {
      id: 3,
      name: "Smart Kitchen",
      path: "smart-kitchen",
      subMenu: [
        { id: 31, name: "Recipes", path: "recepies" },
        { id: 32, name: "Category", path: "category" },
        { id: 33, name: "Tags", path: "tags" },
      ],
    },
    {
      id: 4,
      name: "Blog Management",
      path: "blog-management",
      subMenu: [
        { id: 41, name: "Blog", path: "blog" },
        { id: 42, name: "Category", path: "category" },
      ],
    },
    {
      id: 5,
      name: "User Management",
      path: "all-users",
    },
    {
      id: 6,
      name: "Consultant Management",
      path: "consultants",
      subMenu: [
        { id: 61, name: "Manage consultant", path: "manage" },
        { id: 62, name: "Manage Leaves", path: "leaves" },
      ],
    },
    {
      id: 7,
      name: "Partner Management",
      path: "partner-management",
      subMenu: [
        { id: 71, name: "Category", path: "category" },
        { id: 72, name: "Partners", path: "partners" },
      ],
    },
    {
      id: 8,
      name: "Order Management",
      path: "order-management",
      subMenu: [
        { id: 81, name: "Packages", path: "orders" },
        { id: 82, name: "Appointments", path: "appointments" },
      ],
    },
    {
      id: 9,
      name: "Payment",
      path: "payment-history",
    },
    {
      id: 10,
      name: "Coupons",
      path: "coupons",
    },
    {
      id: 11,
      name: "News & Media",
      path: "news-media",
      subMenu: [
        { id: 111, name: "Manage", path: "manage" },
        { id: 112, name: "Category", path: "category" },
      ],
    },
    {
      id: 12,
      name: "Testimonials",
      path: "testimonials-management",
      subMenu: [
        { id: 121, name: "Manage Testimonials", path: "testimonials" },
        {
          id: 122,
          name: "Client Success Stories",
          path: "success-stories",
        },
      ],
    },
    {
      id: 13,
      name: "Careers Page",
      path: "career-page",
      subMenu: [
        { id: 131, name: "Page Content", path: "page-content" },
        { id: 132, name: "Manage Jobs", path: "manage-jobs" },
      ],
    },
    {
      id: 14,
      name: "Event Management",
      path: "event-management",
      subMenu: [
        { id: 141, name: "Event", path: "event" },
        { id: 142, name: "Event Type", path: "type" },
        { id: 143, name: "Event Header", path: "header" },
      ],
    },
    {
      id: 15,
      name: "Innovation",
      path: "innovation",
      subMenu: [
        { id: 151, name: "Manage", path: "manage" },
        { id: 152, name: "Category", path: "category" },
        { id: 153, name: "Header Images", path: "header-image" },
      ],
    },
    {
      id: 16,
      name: "About Us",
      path: "about-us-page",
      subMenu: [
        { id: 161, name: "Team Management", path: "team-management" },
        {
          id: 162,
          name: "Message from co-founders",
          path: "cofounder-message",
        },
        { id: 163, name: "Our Story Image", path: "story-image" },
      ],
    },
    {
      id: 17,
      name: "Inquiries",
      path: "inquiries",
    },
    {
      id: 18,
      name: "Company Settings",
      path: "company-settings",
      subMenu: [
        { id: 181, name: "Privacy Policy", path: "privacy-policy" },
        { id: 182, name: "T&C", path: "terms-conditions" },
        { id: 183, name: "Refund Policy", path: "refund-policy" },
      ],
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
const NavItem = ({ item, userType, pathname }) => {
  // Create the base path for this item
  const basePath = `/${userType}/${item.path}`;

  // Check if current path is exactly or starts with this item's base path
  const isParentActive =
    pathname === basePath ||
    (item.subMenu && pathname.startsWith(`${basePath}/`));

  return (
    <li className="nav-item">
      <Link
        to={item.subMenu ? `${basePath}/${item.subMenu[0].path}` : basePath}
        className={`nav-link ${
          isParentActive ? "active" : ""
        } d-flex justify-content-between`}
      >
        <div className="d-flex align-items-center gap-2 justify-content-between">
          <span className="nav-icon">
            <iconify-icon icon="solar:widget-5-bold-duotone"></iconify-icon>
          </span>
          <span className="nav-text">{item.name}</span>
        </div>
        {item.subMenu && (
          <span className="nav-arrow">
            <iconify-icon
              icon={
                isParentActive ? "mingcute:down-line" : "mingcute:right-line"
              }
            ></iconify-icon>
          </span>
        )}
      </Link>

      {item.subMenu && (
        <div className={`collapse ${isParentActive ? "show" : ""}`}>
          <ul className="nav sub-navbar-nav">
            {item.subMenu.map((sub) => {
              const subPath = `${basePath}/${sub.path}`;
              const isSubActive =
                pathname === subPath || pathname.startsWith(`${subPath}/`);
              return (
                <li
                  className={`sub-nav-item ${isSubActive ? "active" : ""}`}
                  key={sub.id}
                >
                  <Link
                    to={subPath}
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
};

const MainNavbarLeft = () => {
  const { pathname } = useLocation();
  const contactUsDetails = useSelector((state) => state.auth.contactUsDetails);

  const userType = pathname.includes("/admin")
    ? "admin"
    : pathname.includes("/b2b-partner")
    ? "b2b-partner"
    : pathname.includes("/service-provider")
    ? "service-provider"
    : "";

  const navItems = NavItems[userType] || [];
  console.log(contactUsDetails);
  return (
    <div className="main-nav">
      <div className="logo-box">
        <a className="logo-light">
          <img
            src={contactUsDetails?.adminLogoUrl || logo}
            crossOrigin="anonymous"
            height="50"
            alt="logo light"
          />
        </a>
      </div>

      <div className="scrollbar" data-simplebar>
        <ul className="navbar-nav" id="navbar-nav">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              userType={userType}
              pathname={pathname}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainNavbarLeft;
