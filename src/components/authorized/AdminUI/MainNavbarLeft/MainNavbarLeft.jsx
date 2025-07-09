import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../../../public/assets/img/footerLogo.png";

// export const NavItems = {
//   admin: {
//     // Content Management Group
//     content: {
//       groupName: "Content Management",
//       items: [
//         {
//           id: 1,
//           name: "Slider Management",
//           path: "slider-management",
//         },
//         {
//           id: 2,
//           name: "Blog Management",
//           path: "blog-management",
//           subMenu: [
//             { name: "Blogs", path: "blog" },
//             { name: "Category", path: "category" },
//           ],
//         },
//         {
//           id: 3,
//           name: "News and Media",
//           path: "news-media",
//           subMenu: [
//             { name: "Manage", path: "manage" },
//             { name: "Category", path: "category" },
//           ],
//         },
//       ],
//     },

//     // Services Group
//     services: {
//       groupName: "Services",
//       items: [
//         {
//           id: 4,
//           name: "Service Management",
//           path: "service-management",
//           subMenu: [
//             { name: "Services", path: "services" },
//             { name: "Packages", path: "packages" },
//           ],
//         },
//         {
//           id: 5,
//           name: "Smart Kitchen",
//           path: "smart-kitchen",
//           subMenu: [
//             { name: "Recepies", path: "recepies" },
//             { name: "Category", path: "category" },
//             { name: "Tags", path: "tags" },
//           ],
//         },
//         { id: 6, name: "Success Story", path: "success-stories" },
//       ],
//     },

//     // Team & Partners Group
//     team: {
//       groupName: "Team & Partners",
//       items: [
//         {
//           id: 7,
//           name: "Team Management",
//           path: "team-management",
//           subMenu: [
//             { name: "Team", path: "manage" },
//             { name: "Message", path: "message" },
//           ],
//         },
//         {
//           id: 8,
//           name: "Consultant",
//           path: "consultants",
//           subMenu: [
//             { name: "Manage Consultant", path: "manage" },
//             { name: "Manage Leaves", path: "leaves" },
//           ],
//         },
//         {
//           id: 9,
//           name: "Partner Management",
//           path: "partner-management",
//           subMenu: [
//             { name: "Partners", path: "partners" },
//             { name: "Category", path: "category" },
//           ],
//         },
//       ],
//     },

//     // Events & Innovation Group (NEW GROUP ADDED)
//     innovation: {
//       groupName: "Events & Innovation",
//       items: [
//         {
//           id: 10,
//           name: "Event management",
//           path: "event-management",
//           subMenu: [
//             { name: "Event", path: "event" },
//             { name: "Event Type", path: "type" },
//             { name: "Event Header", path: "header" },
//           ],
//         },
//         {
//           id: 11,
//           name: "Innovation",
//           path: "innovation",
//           subMenu: [
//             { name: "Manage", path: "manage" },
//             { name: "Category", path: "category" },
//           ],
//         },
//       ],
//     },

//     // System Group
//     system: {
//       groupName: "System Settings",
//       items: [
//         { id: 12, name: "Inquiries", path: "inquiries" },
//         { id: 13, name: "Careers", path: "careers" },
//         { id: 14, name: "Coupons", path: "coupon" },
//         {
//           id: 15,
//           name: "Company Settings",
//           path: "company-settings",
//           subMenu: [
//             { name: "All Users", path: "users" },
//             { name: "Orders", path: "orders" },
//             { name: "Payment History", path: "payment-history" },
//             { name: "Testimonials", path: "testimonials" },
//             { name: "Appointments", path: "appointments" },
//             { name: "About Us", path: "about-us" },
//             { name: "Privacy Policy", path: "privacy-policy" },
//             { name: "Terms & Conditions", path: "terms-conditions" },
//             { name: "Refund Policy", path: "refund-policy" },
//             { name: "Careers", path: "career" },
//             { name: "Innovation", path: "innovation" },
//           ],
//         },
//       ],
//     },
//   },

//   // B2B Partner Group
//   "b2b-partner": {
//     main: {
//       groupName: "Partner Dashboard",
//       items: [
//         { id: 1, name: "Dashboard", path: "dashboard" },
//         { id: 2, name: "Coupon List", path: "coupons" },
//         { id: 3, name: "Ledger", path: "ledger" },
//       ],
//     },
//   },

//   // Service Provider Group
//   "service-provider": {
//     main: {
//       groupName: "Provider Dashboard",
//       items: [
//         { id: 1, name: "Dashboard", path: "dashboard" },
//         { id: 2, name: "Appointments", path: "appointment" },
//         { id: 3, name: "Ledger", path: "ledger" },
//       ],
//     },
//   },
// };

export const NavItems = {
  admin: {
    // Services Group
    services: {
      groupName: "Services",
      items: [
        {
          id: 4,
          name: "Service Management",
          path: "service-management",
          subMenu: [
            { name: "Services", path: "services" },
            { name: "Packages", path: "packages" },
          ],
        },
        {
          id: 5,
          name: "Smart Kitchen",
          path: "smart-kitchen",
          subMenu: [
            { name: "Recepies", path: "recepies" },
            { name: "Category", path: "category" },
            { name: "Tags", path: "tags" },
          ],
        },
      ],
    },
 
    user: {
      groupName: "User Management",
      items: [
        {
          id: 1,
          name: "All Users",
          path: "company-settings/users",
        },
      ],
    },
    order: {
      groupName: "Order Management",
      items: [
        {
          id: 1,
          name: "Package Orders",
          path: "company-settings/orders",
        },
        {
          id: 1,
          name: "Appointments",
          path: "company-settings/appointments",
        },
      ],
    },
    coupon: {
      groupName: "Coupon Management",
      items: [
        {
          id: 1,
          name: "Coupons",
          path: "coupons",
        },
      ],
    },
    payment: {
      groupName: "Payment Management",
      items: [
        {
          id: 1,
          name: "Payment History",
          path: "payment-history",
        },
      ],
    },
 
 
    // Team & Partners Group
    team: {
      groupName: "B2B Partners & Service Providers",
      items: [
        // {
        //   id: 7,
        //   name: "Team Management",
        //   path: "team-management",
        //   subMenu: [
        //     { name: "Team", path: "manage" },
        //     { name: "Message", path: "message" },
        //   ],
        // },
        {
          id: 8,
          name: "Consultant Management",
          path: "consultants",
          subMenu: [
            { name: "Manage Consultant", path: "manage" },
            { name: "Manage Leaves", path: "leaves" },
          ],
        },
        {
          id: 9,
          name: "Partner Management",
          path: "partner-management",
          subMenu: [
            { name: "Category", path: "category" },
            { name: "Partners", path: "partners" },
          ],
        },
      ],
    },
 
    // Events & Innovation Group (NEW GROUP ADDED)
    // innovation: {
    //   groupName: "Events & Innovation",
    //   items: [
    //     {
    //       id: 10,
    //       name: "Event management",
    //       path: "event-management",
    //       subMenu: [
    //         { name: "Event", path: "event" },
    //         { name: "Event Type", path: "type" },
    //         { name: "Event Header", path: "header" },
    //       ],
    //     },
    //     {
    //       id: 11,
    //       name: "Innovation",
    //       path: "innovation",
    //       subMenu: [
    //         { name: "Manage", path: "manage" },
    //         { name: "Category", path: "category" },
    //         { name: "Header Images", path: "category" },
    //       ],
    //     },
    //   ],
    // },
 
    content: {
      groupName: "Content Management",
      items: [
        {
          id: 1,
          name: "Slider Management",
          path: "slider-management",
        },
        {
          id: 2,
          name: "Blog Management",
          path: "blog-management",
          subMenu: [
            { name: "Blogs", path: "blog" },
            { name: "Category", path: "category" },
          ],
        },
        {
          id: 3,
          name: "News and Media Page",
          path: "news-media",
          subMenu: [
            { name: "Manage", path: "manage" },
            { name: "Category", path: "category" },
          ],
        },
        {
          id: 4,
          name: "Testimonials Management",
          path: "testimonials-management",
          subMenu: [
            { name: "Manage Testimonials", path: "testimonials" },
            { name: "Client Success Stories", path: "success-stories" },
          ],
        },
        {
          id: 4,
          name: "About Us Page",
          path: "about-us-page",
          subMenu: [
            { name: "Team Managament", path: "team-management" },
            { name: "Message from Co-Founders", path: "cofounder-message" },
            { name: "Our Story Image", path: "story-image" },
          ],
        },
        {
          id: 4,
          name: "Careers Page",
          path: "career-page",
          subMenu: [
            { name: "Page Content", path: "page-content" },
            { name: "Manage Jobs", path: "manage-jobs" },
          ],
        },
        {
          id: 10,
          name: "Event Page",
          path: "event-management",
          subMenu: [
            { name: "Event", path: "event" },
            { name: "Event Type", path: "type" },
            { name: "Event Header", path: "header" },
          ],
        },
        {
          id: 11,
          name: "Innovation Page",
          path: "innovation",
          subMenu: [
            { name: "Manage", path: "manage" },
            { name: "Category", path: "category" },
            { name: "Header Images", path: "header-image" },
          ],
        },
      ],
    },
 
    // System Group
    system: {
      groupName: "System Settings",
      items: [
        { id: 12, name: "Inquiries", path: "inquiries" },
        // { id: 13, name: "Careers", path: "careers" },
        // { id: 14, name: "Coupons", path: "coupon" },
        {
          id: 15,
          name: "Company Settings",
          path: "company-settings",
          subMenu: [
            // { name: "All Users", path: "users" },
            // { name: "Orders", path: "orders" },
            // { name: "Payment History", path: "payment-history" },
            // { name: "Testimonials", path: "testimonials" },
            // { name: "Appointments", path: "appointments" },
            // { name: "About Us", path: "about-us" },
            { name: "Privacy Policy", path: "privacy-policy" },
            { name: "Terms & Conditions", path: "terms-conditions" },
            { name: "Refund Policy", path: "refund-policy" },
            // { name: "Careers", path: "career" },
            // { name: "Innovation", path: "innovation" },
          ],
        },
      ],
    },
  },
 
  // B2B Partner Group
  "b2b-partner": {
    main: {
      groupName: "Partner Dashboard",
      items: [
        { id: 1, name: "Dashboard", path: "dashboard" },
        { id: 2, name: "Coupon List", path: "coupons" },
        { id: 3, name: "Ledger", path: "ledger" },
      ],
    },
  },
 
  // Service Provider Group
  "service-provider": {
    main: {
      groupName: "Provider Dashboard",
      items: [
        { id: 1, name: "Dashboard", path: "dashboard" },
        { id: 2, name: "Appointments", path: "appointment" },
        { id: 3, name: "Ledger", path: "ledger" },
      ],
    },
  },
};
const NavItem = ({ item, userType, pathname }) => {
  const isParentActive = pathname.includes(item.path);
  const basePath = `/${userType}/${item.path}`;

  return (
    <li className="nav-item">
      <Link
        to={item.subMenu ? `${basePath}/${item.subMenu[0].path}` : basePath}
        className={`nav-link ${isParentActive ? "active" : ""}`}
      >
        <span className="nav-icon">
          <iconify-icon icon="solar:widget-5-bold-duotone"></iconify-icon>
        </span>
        <span className="nav-text">{item.name}</span>
      </Link>

      {item.subMenu && isParentActive && (
        <div className="collapse show">
          <ul className="nav sub-navbar-nav">
            {item.subMenu.map((sub, index) => {
              const isSubActive = pathname.includes(sub.path);
              return (
                <li
                  className={`sub-nav-item ${isSubActive ? "active" : ""}`}
                  key={index}
                >
                  <Link
                    to={`${basePath}/${sub.path}`}
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

  const userType = pathname.includes("/admin")
    ? "admin"
    : pathname.includes("/b2b-partner")
    ? "b2b-partner"
    : pathname.includes("/service-provider")
    ? "service-provider"
    : "";

  const navGroups = NavItems[userType];

  return (
    <div className="main-nav">
      <div className="logo-box">
        <a className="logo-light">
          <img src={logo} height="50" alt="logo light" />
        </a>
      </div>

      <div className="scrollbar" data-simplebar>
        {navGroups &&
          Object.entries(navGroups).map(([groupKey, group]) => (
            <React.Fragment key={groupKey}>
              <div className="menu-title">{group.groupName}</div>
              <ul className="navbar-nav" id="navbar-nav">
                {group.items.map((item) => (
                  <NavItem
                    key={item.id}
                    item={item}
                    userType={userType}
                    pathname={pathname}
                  />
                ))}
              </ul>
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default MainNavbarLeft;
