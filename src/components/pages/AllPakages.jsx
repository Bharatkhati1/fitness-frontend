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
    }, []);

  return (
    <>
      <section className="innerbanner blogbanner">
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
        <div className="container">
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

        <div className="productslists">
          <div className="container">
            <h4 className="producttitle">{totalItems} Package</h4>

            {Array.isArray(allPackages) && allPackages.length > 0 ? (
              <div className="row">
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
                         <div className="col-12"><h3 className="text-center">{pkg.name}</h3></div> 

                        <div className="col-12 align-content-end">  <div className="btnbox text-center d-flex flex-column gap-2 mt-2">
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
                          </div></div> 
                        </figcaption>
                      </div>
                    </div>
                  );
                })}
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
