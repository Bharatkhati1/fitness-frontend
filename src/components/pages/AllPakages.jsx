import React, { useEffect, useState, useRef } from "react";
import searchIcon from "../../../public/assets/img/searchIcon.png";
import leftp from "../../../public/assets/img/leftp.png";
import leftR from "../../../public/assets/img/rightp.png";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import allpakagesbg from "../../../public/assets/img/allpakagesbg.png";
import Icon1 from "../../../public/assets/img/Icon1.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../store/auth/AuthExtraReducers.jsx";
import { Link } from "react-router-dom";
import useDebounce from "../Hooks/useDebounce.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function AllPakages() {
  const dispatch = useDispatch();
  const { allPackages = [], allServices = [] } = useSelector(
    (state) => state.auth
  );

  const [search, setSearch] = useState("");
  const [serviceId, setServiceId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

  const debouncedSearch = useDebounce(search, 400);
  const debouncedServiceId = useDebounce(serviceId, 400);
  const limit = 9;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 481, settings: { slidesToShow: 1 } },
      { breakpoint: 0, settings: { slidesToShow: 1 } },
    ],
  };

  const formatName = (str) => {
    if (!str) return "";
    if (str === str.toUpperCase()) {
      return str
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    return str;
  };

  const getPaginationRange = () => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];
    let left = currentPage - delta;
    let right = currentPage + delta;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i <= right)) {
        range.push(i);
      }
    }

    let l;
    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l > 2) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    dispatch(
      fetchAllProducts({
        search: debouncedSearch,
        serviceId: debouncedServiceId,
        page: currentPage,
        limit,
        setTotalPages,
        setTotalItems,
      })
    );
  }, [debouncedSearch, currentPage, debouncedServiceId, dispatch]);

  useEffect(() => {
    const equalizeCardHeights = () => {
      const cards = document.querySelectorAll(".card-height");
      let maxHeight = 0;

      cards.forEach((card) => {
        card.style.height = "auto";
      });

      cards.forEach((card) => {
        const height = card.offsetHeight;
        if (height > maxHeight) maxHeight = height;
      });

      cards.forEach((card) => {
        card.style.height = `${maxHeight}px`;
      });
    };
    setTimeout(equalizeCardHeights, 300);

    window.addEventListener("resize", equalizeCardHeights);
    return () => window.removeEventListener("resize", equalizeCardHeights);
  }, [currentPage, allPackages]);

  return (
    <>
      <section className="innerbanner">
        <figure>
          <img src={allpakagesbg} />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>all packages</h2>
            <p>
              Discover all our fitness packages tailored to help you achieve
              your health and wellness goals.
            </p>
            <div className="SearchBox">
              <input
                type="text"
                placeholder="Search here"
                className="form-control"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setServiceId(null);
                }}
              />
              <button
                className="SearchBtn"
                onClick={() =>
                  dispatch(fetchAllProducts({ search, serviceId }))
                }
              >
                <img src={searchIcon} alt="search" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="allpakages sectionSpace ">
        <div className="container  d-none d-lg-block">
          <div class="InnerPageTitle ">
            <h4 className="mb-0">Browse By services</h4>
          </div>
          <div className="Browseservice">
            <div
              className={`item`}
              style={{ width: "175px", height: "fit-content" }}
              onClick={(e) => {
                setServiceId(null);
              }}
            >
              <div
                className={`servicelist ${
                  serviceId == null
                    ? "servicelist  active-selected-service"
                    : ""
                }`}
              >
                <figure>
                  <img crossOrigin="anonymous" src={Icon1} alt="All" />
                </figure>
                <p>All</p>
              </div>
            </div>
            {Array.isArray(allServices) && allServices.length > 0 && (
              <Slider {...settings} style={{ width: "calc(100% - 175px)" }}>
                {allServices.map((srv, index) => (
                  <div
                    key={srv.id}
                    className={`item`}
                    onClick={(e) => {
                      setSearch("");
                      setServiceId(srv.id);
                    }}
                  >
                    <div
                      className={`${
                        srv.id === serviceId
                          ? "active-selected-service servicelist package-image"
                          : "servicelist package-image"
                      }`}
                    >
                      <figure>
                        <img
                          crossOrigin="anonymous"
                          src={srv.image_url}
                          alt={srv.name}
                        />
                      </figure>
                      <p>{formatName(srv.name)}</p>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-auto d-lg-none d-block ms-auto">
            <button
              className="btn btn-primary filter-btn me-4"
              onClick={() => setShowMobileFilters(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M1.5 1.5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 .4.8L10 8.333V13.5a.5.5 0 0 1-.8.4l-2-1.5a.5.5 0 0 1-.2-.4V8.333L1.1 1.8a.5.5 0 0 1 .4-.8z" />
              </svg>
            </button>
          </div>
          {/* Mobile filter overlay */}
          <div
            className={`mobile-filters-overlay ${
              showMobileFilters ? "show" : ""
            }`}
            onClick={() => setShowMobileFilters(false)}
          >
            <div
              className="mobile-filters-card"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-btn btn btn-primary btn-link w-100 text-end"
                onClick={() => setShowMobileFilters(false)}
              >
                ✖
              </button>
              <ul className="list-unstyled  gap-2">
                <li
                  className={serviceId === null ? "active mb-2" : "mb-2"}
                  onClick={() => {
                    setServiceId(null);
                    setShowMobileFilters(false);
                  }}
                >
                  <span className="tag-info">All</span>
                </li>
                {allServices.map((srv) => (
                  <li
                    key={srv.id}
                    className={srv.id === serviceId ? "active mb-2" : "mb-2"}
                    onClick={() => {
                      setSearch("");
                      setServiceId(srv.id);
                      setShowMobileFilters(false);
                    }}
                  >
                    <span className="tag-info">{formatName(srv.name)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="productslists">
          <div className="container">
            <h4 className="producttitle mb-4">{totalItems} Packages</h4>

            {Array.isArray(allPackages) && allPackages.length > 0 ? (
              <div className="position-relative allpakagessec mt-4">
                <div className="arrowrleft">
                  {currentPage > 1 && (
                    <svg
                      onClick={() => handlePageChange(currentPage - 1)}
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      width="30"
                      height="30"
                      x="0"
                      y="0"
                      viewBox="0 0 24 24"
                      style={{ enableBackground: "new 0 0 512 512" }}
                      className=""
                    >
                      <g>
                        <path
                          d="M15 19a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 0-1.41l6-6a1 1 0 0 1 1.41 1.41L10.41 12l5.29 5.29A1 1 0 0 1 15 19z"
                          data-name="17"
                          fill="#000000"
                          opacity="1"
                          data-original="#000000"
                          className=""
                        />
                      </g>
                    </svg>
                  )}
                </div>

                <div className="arrowrright">
                  {currentPage < totalPages && (
                    <svg
                      onClick={() => handlePageChange(currentPage + 1)}
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      width="30"
                      height="30"
                      x="0"
                      y="0"
                      viewBox="0 0 6.35 6.35"
                      style={{ enableBackground: "new 0 0 512 512" }}
                      className=""
                    >
                      <g>
                        <path
                          d="M2.258 1.315a.265.265 0 0 0-.174.469L3.703 3.17l-1.62 1.386a.265.265 0 1 0 .345.4L4.28 3.373a.265.265 0 0 0 0-.403L2.428 1.382a.265.265 0 0 0-.17-.067z"
                          fill="#000000"
                          opacity="1"
                          data-original="#000000"
                          className=""
                        />
                      </g>
                    </svg>
                  )}
                </div>
                <div className="row productslistsrow">
                  {allPackages.map((pkg) => {
                    let parsedActions = [];

                    try {
                      const raw =
                        typeof pkg.actions === "string" ? pkg.actions : "[]";
                      const parsed = JSON.parse(raw);
                      parsedActions = Array.isArray(parsed) ? parsed : [];
                    } catch (err) {
                      console.warn("Invalid JSON for actions:", pkg.actions);
                    }

                    const showButton = (label) =>
                      parsedActions.some((act) => act.name === label);

                    return (
                      <div
                        key={pkg.id}
                        className="col-12 col-sm-6 col-md-4 mb-4 d-flex align-items-stretch"
                      >
                        <div className="product-list w-100">
                          <figure>
                            <img
                              crossOrigin="anonymous"
                              src={pkg.image_url}
                              alt={pkg.name}
                              className="img-fluid"
                            />
                          </figure>

                          <figcaption className="card-height">
                            <div className="row h-100 ">
                              <div className="col-12">
                                <h3 className="text-center">{pkg.name}</h3>
                              </div>

                              <div className="col-12 align-content-end">
                                {" "}
                                <div className="btnbox text-center d-flex flex-column gap-2 mt-2">
                                  {showButton("Know more") && (
                                    <Link
                                      to={`/package/${pkg.name
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")}`}
                                      className="btn btn-primary hvr-shutter-out-horizontal"
                                    >
                                      Know More
                                    </Link>
                                  )}
                                  {showButton("Consult a Doctor") && (
                                    <Link
                                      to={`/experts/${pkg.name
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")}/doctor/${btoa(
                                        pkg.id
                                      )}`}
                                      className="btn btn-primary hvr-shutter-out-horizontal"
                                    >
                                      Consult a Doctor
                                    </Link>
                                  )}
                                  {showButton("Talk to a Therapist") && (
                                    <Link
                                      to={`/experts/${pkg.name
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")}/therapist/${btoa(
                                        pkg.id
                                      )}`}
                                      className="btn btn-primary hvr-shutter-out-horizontal"
                                    >
                                      Talk to a Therapist
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </div>
                          </figcaption>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="col-12 text-center py-5">
                <h5>No package found.</h5>
              </div>
            )}
            {allPackages.length > 0 && (
              <div className="paginationBox d-flex justify-content-center">
                <ul className="pagination">
                  {/* Previous Button */}
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      <img src={leftp} alt="Previous" />
                    </button>
                  </li>

                  {/* Dynamic Page Numbers */}
                  {getPaginationRange().map((page, index) => (
                    <li
                      key={index}
                      className={`page-item ${
                        page === currentPage ? "active" : ""
                      } ${page === "..." ? "disabled" : ""}`}
                    >
                      {page === "..." ? (
                        <span className="page-link">...</span>
                      ) : (
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      )}
                    </li>
                  ))}

                  {/* Next Button */}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      <img src={leftR} alt="Next" />
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default AllPakages;
0;
