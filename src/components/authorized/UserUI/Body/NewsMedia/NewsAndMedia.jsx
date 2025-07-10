import React, { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import BannerImag from "../../../../../../public/assets/img/new-media-banner.png";
import searchIcon from "../../../../../../public/assets/img/searchIcon.png";
import leftp from "../../../../../../public/assets/img/leftp.png";
import leftR from "../../../../../../public/assets/img/rightp.png";
import { webAxios } from "../../../../../utils/constants";
import userApiRoutes from "../../../../../utils/Api/Routes/userApiRoutes";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import useDebounce from "../../../../Hooks/useDebounce";

function NewsAndMedia() {
  const [newsItems, setNewsItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("DESC");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const limit = 10;

  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  const getNewsItems = async (
    page = 1,
    category = "all",
    search = "",
    sort = "ASC"
  ) => {
    try {
      const query = {
        page,
        limit,
        type: "news-media",
        order: sort,
        ...(category !== "all" && { category }),
        ...(search && { search }),
      };

      const response = await webAxios.get(userApiRoutes.get_blogs(query));
      setNewsItems(response.data.data);
      setTotalPages(Math.ceil(response.data.total / limit));
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to fetch news");
    }
  };

  const getCategories = async () => {
    try {
      const response = await webAxios.get(
        userApiRoutes.get_master_categories("news-media")
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error(error);
    }
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

  const handleSelectCategory = (id) => {
    setSearchTerm("");
    setSelectedCategory(id);
    setCurrentPage(1);
  };

  useEffect(() => {
    getNewsItems(currentPage, selectedCategory, debouncedSearchTerm, sortBy);
  }, [currentPage, selectedCategory, sortBy, debouncedSearchTerm]);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <section className="innerbanner ">
        <figure>
          <img src={BannerImag} alt="Banner" />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>news & media</h2>
            <p>
              Stay informed with our latest news, media updates and insights.
            </p>
            <div className="SearchBox">
              <input
                type="text"
                placeholder="Search here"
                className="form-control"
                value={searchTerm}
                onChange={(e) => {
                  setSelectedCategory("all");
                  setSearchTerm(e.target.value);
                }}
              />
              <button className="SearchBtn">
                <img src={searchIcon} alt="Search" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter Overlay */}
      <div className={`mobile-filters-overlay ${showMobileFilters ? "show" : ""}`} onClick={() => setShowMobileFilters(false)}>
        <div className="mobile-filters-card" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn btn btn-primary btn-link w-100 text-end" onClick={() => setShowMobileFilters(false)}> ✖</button>
          <ul className="list-unstyled gap-2">
            <li
              className={selectedCategory === "all" ? "active mb-2" : "mb-2"}
              onClick={() => { handleSelectCategory("all"); setShowMobileFilters(false); }}
            >
              <span className="tag-info">All</span>
            </li>
            {categories.map((cat) => (
              <li
                key={cat.id}
                className={selectedCategory === cat.id ? "active mb-2" : " mb-2"}
                onClick={() => { handleSelectCategory(cat.id); setShowMobileFilters(false); }}
              >
                <span className="tag-info">{cat.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>


      <div className="filtersBox">
        <div className="container">
          <div className="filtersBoxInner">
            <div className="filterOwl">
              <div className="taginfolist ps-4">
                <div className="row">
                  <div className="col-xxl-auto col-sm-auto d-lg-block d-none taginfoleft pe-0">
                    <li
                      className={selectedCategory === "all" ? "active" : ""}
                      onClick={() => handleSelectCategory("all")}
                    >
                      <span className="tag-info">All</span>
                    </li>
                  </div>
                  <div className="col-xxl col-sm taginforight d-lg-block d-none pe-4">
                    {categories.length > 0 && (
                      <OwlCarousel
                        className="owl-theme"
                        autoplay={false}
                        margin={10}
                        dots={false}
                        items={5}
                        responsive={{
                          0: {
                            items: 1
                          },
                          767: {
                            items: 2
                          },
                          976: {
                            items: 3
                          },
                          1200: {
                            items: 4
                          },
                          1400: {
                            items: 4
                          },
                          1600: {
                            items: 5
                          },
                        }
                        }
                        nav={true}
                      >
                        {categories.map((cat) => (
                          <li
                            key={cat.id}
                            className={
                              selectedCategory === cat.id
                                ? "active px-2"
                                : "px-2"
                            }
                            onClick={() => handleSelectCategory(cat.id)}
                          >
                            <span className="tag-info">{cat.name}</span>
                          </li>
                        ))}
                      </OwlCarousel>
                    )}
                  </div>
                  <div className="col-auto d-lg-none d-block ms-auto">
                    <button
                      onClick={() => setShowMobileFilters(true)}
                      className="btn btn-primary filter-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M1.5 1.5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 .4.8L10 8.333V13.5a.5.5 0 0 1-.8.4l-2-1.5a.5.5 0 0 1-.2-.4V8.333L1.1 1.8a.5.5 0 0 1 .4-.8z" />
                      </svg>
                    </button>
                  </div>

                  <div className="col-auto sortbyright">
                    <select
                      className="form-select"
                      onChange={(e) => {
                        const value = e.target.value;
                        setSortBy(value == "1" ? "ASC" : "DESC");
                      }}
                    >
                      <option value="" disabled selected>
                        Sort By
                      </option>
                      <option value="2">Newest</option>
                      <option value="1">Oldest</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div>

      <div className="OurBlogs mt-lg-0 mt-4">
        <div className="container">
          <div className="row g-lg-5 g-3">
            {newsItems.length > 0 ? (
              newsItems.map((item) => (
                <div className="col-md-6 OurHealthBlogContent" key={item.id}>
                  <figure>
                    {item?.BlogCategory?.name && (
                      <div className="OurBlogsTag">
                        {item?.BlogCategory?.name}
                      </div>
                    )}
                    <img
                      crossOrigin="anonymous"
                      src={item.image_url}
                      alt={item.title}
                    />
                  </figure>
                  <figcaption>
                    <h3>{item.title}</h3>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item.shortDescription,
                      }}
                    ></p>
                    <Link
                      className="btn btn-primary max-width mt-1"
                      to={`/news-media/${item.slug}`}
                    >
                      Read More
                    </Link>
                  </figcaption>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <h5>No news or media found.</h5>
              </div>
            )}
          </div>

          {newsItems.length > 0 && (
            <div className="paginationBox d-flex justify-content-center">
              <ul className="pagination">
                {/* Previous Button */}
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
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
                    className={`page-item ${page === currentPage ? "active" : ""
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
                  className={`page-item ${currentPage === totalPages ? "disabled" : ""
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
    </>
  );
}

export default NewsAndMedia;
