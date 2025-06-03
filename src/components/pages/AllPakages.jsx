import React, { useEffect, useState } from "react";
import searchIcon from "../../../public/assets/img/searchIcon.png";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import allpakagesbg from "../../../public/assets/img/allpakagesbg.png";
import Icon1 from "../../../public/assets/img/Icon1.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../store/auth/AuthExtraReducers.jsx";
import { Link } from "react-router-dom";

function AllPakages() {
  const dispatch = useDispatch();
  const { allPackages = [], allServices = [] } = useSelector(
    (state) => state.auth
  );
  const [search, setSearch] = useState("");
  const [serviceId, setServiceId] = useState(null);

  console.log(allPackages);
  useEffect(() => {
    dispatch(fetchAllProducts({ search, serviceId }));
  }, [search, serviceId]);

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
            <OwlCarousel
              className="owl-theme"
              autoplay={false}
              dots={false}
              items={6}
              autoplaySpeed={500}
              autoplayTimeout={3000}
              margin={10}
              nav={true}
              responsive={{
                0: {
                  items: 1, // 0px and up
                },
                481: {
                  items: 2, // 0px and up
                },
                768: {
                  items: 3, // 600px and up
                },
                992: {
                  items: 4, // 600px and up
                },
                1200: {
                  items: 6, // 1000px and up
                },
              }}
            >
              <>
                <div
                  className={`item ${
                    serviceId == null ? `active-selected-service` : ``
                  }`}
                  onClick={() => setServiceId(null)}
                >
                  <div className="servicelist package-image">
                    <figure>
                      <img crossOrigin="anonymous" src={Icon1}></img>
                    </figure>
                    <p>All</p>
                  </div>
                </div>
                {allServices.map((srv) => (
                  <div
                    className={`item ${
                      srv.id == serviceId ? `active-selected-service` : ``
                    }`}
                    onClick={() => setServiceId(srv.id)}
                  >
                    <div className="servicelist package-image">
                      <figure>
                        <img crossOrigin="anonymous" src={srv.image_url}></img>
                      </figure>
                      <p>{srv.name}</p>
                    </div>
                  </div>
                ))}
              </>
            </OwlCarousel>
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
          </div>
        </div>
      </section>
    </>
  );
}

export default AllPakages;
0;
