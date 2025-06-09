import React, { useEffect, useState, useRef } from "react";
import searchIcon from "../../../public/assets/img/searchIcon.png";
import OwlCarousel from "react-owl-carousel";
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

  const debouncedSearch = useDebounce(search, 400);
  const debouncedServiceId = useDebounce(serviceId, 400);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 6 } },
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

  useEffect(() => {
    dispatch(
      fetchAllProducts({
        search: debouncedSearch,
        serviceId: debouncedServiceId,
      })
    );
  }, [debouncedSearch, debouncedServiceId, dispatch]);

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
                placeholder="Search package name here..."
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
            <h4 className="producttitle">{allPackages.length} products</h4>
            {Array.isArray(allPackages) && allPackages.length > 0 && (
              <OwlCarousel
                className="owl-theme"
                autoplay={false}
                dots={false}
                items={3}
                autoplaySpeed={500}
                autoplayTimeout={3000}
                margin={20}
                nav={true}
                responsive={{
                  0: {
                    items: 1, // 0px and up
                  },
                  481: {
                    items: 2, // 0px and up
                  },
                  768: {
                    items: 2, // 600px and up
                  },
                  992: {
                    items: 3, // 600px and up
                  },
                  1200: {
                    items: 3, // 1000px and up
                  },
                }}
              >
                {allPackages.map((pkg) => (
                  <div class="item">
                    <div className="product-list">
                      <figure>
                        <img crossOrigin="anonymous" src={pkg.image_url} />
                      </figure>

                      <figcaption>
                        <h3 className=" text-center">{pkg.name}</h3>
                        <div className="btnbox text-center">
                          <Link
                            to={`/package/${pkg.name
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                            className="btn btn-primary sm-btn m-auto hvr-shutter-out-horizontal"
                          >
                            know more
                          </Link>
                        </div>
                      </figcaption>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            )}
            {allPackages?.length == 0 && (
              <div className="col-12 text-center py-5">
                <h5>No product found.</h5> 
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
