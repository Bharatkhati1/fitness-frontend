import React, { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import HealthBg from "../../../../../public/assets/img/HealthBg.png";
import searchIcon from "../../../../../public/assets/img/searchIcon.png";
import readMoreimg from "../../../../../public/assets/img/ReadMoreicon.png";
import leftp from "../../../../../public/assets/img/leftp.png";
import leftR from "../../../../../public/assets/img/rightp.png";
import { webAxios } from "../../../../utils/constants";
import userApiRoutes from "../../../../utils/Api/Routes/userApiRoutes";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import useDebounce from "../../../Hooks/useDebounce";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setBlogCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("DESC");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const limit = 10;

  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  const getBlogs = async (
    page = 1,
    category = "all",
    search = "",
    sortBy = "ASC"
  ) => {
    try {
      const query = {
        page,
        limit,
        type: "blogs",
        order: sortBy,
        ...(category !== "all" && { category }),
        ...(search && { search }),
      };

      const response = await webAxios.get(userApiRoutes.get_blogs(query));
      setBlogs(response.data.data);
      setTotalPages(Math.ceil(response.data.total / limit));
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to fetch blogs");
    }
  };

  const getBlogCategories = async () => {
    try {
      const response = await webAxios.get(userApiRoutes.get_blog_categories);
      const categoriesData = response.data.data;
      setBlogCategories(categoriesData);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch categories"
      );
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
    setSelectedCategory(id);
    setCurrentPage(1);
  };

  useEffect(() => {
    getBlogs(currentPage, selectedCategory, debouncedSearchTerm, sortBy);
  }, [currentPage, selectedCategory, sortBy, debouncedSearchTerm]);

  useEffect(() => {
    getBlogCategories();
  }, []);

  return (
    <>
      <section className="innerbanner">
        <figure>
          <img src={HealthBg} />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>health blogs</h2>
            <p>Discover Our Catering Tips With Trends And Latest News.</p>
            <div className="SearchBox">
              <input
                type="text"
                placeholder="Search here"
                className="form-control"
                value={searchTerm}
                onChange={(e) => {
                  handleSelectCategory("all");
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

      <div className="filtersBox">
        <div className="container">
          <div className="filtersBoxInner">
            <div className="filterOwl">
              <ul className="taginfolist ps-4">
                <div className="row">
                  <div className="col-xxl-auto col-sm-auto taginfoleft pe-0 d-none d-lg-block">
                    <li
                      style={{ zIndex: "1000" }}
                      className={selectedCategory == "all" ? "active" : ""}
                      onClick={() => handleSelectCategory("all")}
                    >
                      <span className="tag-info">All</span>
                    </li>
                  </div>
                  <div className="col-xxl col-sm taginforight pe-4 d-none d-lg-block">
                    {categories.length > 0 && (
                      <OwlCarousel
                        className="owl-theme"
                        autoplay={false}
                        margin={12}
                        dots={false}
                        items={5}
                        nav
                        responsive={{
                          0: { items: 1 },
                          481: { items: 2 },
                          768: { items: 3 },
                          992: { items: 4 },
                          1200: { items: 5 },
                        }}
                      >
                        {categories.map((cat) => (
                          <li
                            key={cat.id}
                            className={selectedCategory === cat.id ? "active" : ""}
                            onClick={() => {
                              setSearchTerm("");
                              handleSelectCategory(cat.id);
                            }}
                          >
                            <span className="tag-info">{cat.name}</span>
                          </li>
                        ))}
                      </OwlCarousel>
                    )}
                  </div>
                  <div className="col-auto d-lg-none d-block ms-auto">
                    <button
                      className="btn btn-primary filter-btn"
                      onClick={() => setShowMobileFilters(true)}
                    >
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
                        if (value === "1") {
                          setSortBy("ASC");
                        } else if (value === "2") {
                          setSortBy("DESC");
                        }
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
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filter overlay */}
      <div
        className={`mobile-filters-overlay ${showMobileFilters ? "show" : ""}`}
        onClick={() => setShowMobileFilters(false)}
      >
        <div className="mobile-filters-card" onClick={(e) => e.stopPropagation()}>
          <button
            className="close-btn btn btn-primary btn-link w-100 text-end"
            onClick={() => setShowMobileFilters(false)}
          >
             ✖
          </button>
          <ul className="list-unstyled  gap-2">
            <li
              className={selectedCategory === "all" ? "active mb-2" : "mb-2"}
              onClick={() => {
                handleSelectCategory("all");
                setShowMobileFilters(false);
              }}
            >
              <span className="tag-info">All</span>
            </li>
            {categories.map((cat) => (
              <li
                key={cat.id}
                className={selectedCategory === cat.id ? "active mb-2" : "mb-2"}
                onClick={() => {
                  setSearchTerm("");
                  handleSelectCategory(cat.id);
                  setShowMobileFilters(false);
                }}
              >
                <span className="tag-info">{cat.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="OurBlogs  mt-lg-0 mt-3">
        <div className="container">
          <div className="row g-lg-5 g-3">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <div className="col-md-6 OurHealthBlogContent" key={blog.id}>
                  <figure>
                    {blog?.BlogCategory?.name?.length > 0 && (
                      <div className="OurBlogsTag">
                        {blog?.BlogCategory?.name || "Health"}
                      </div>
                    )}
                    <img
                      crossOrigin="anonymous"
                      src={blog.image_url}
                      alt={blog.title}
                    />
                  </figure>
                  <figcaption>
                    <h3>{blog.title}</h3>
                    <div className="Bytext">
                      <span>
                        {blog.auther && <>By {blog.auther}.</>}
                        {blog.date || blog.createdAt ? (
                          <>
                            {" "}
                            {new Date(
                              blog.date || blog.createdAt
                            ).toLocaleDateString("en-GB")}
                            .
                          </>
                        ) : null}
                        {blog.readTime != "null" && (
                          <> {blog.readTime} min read</>
                        )}
                      </span>
                    </div>
                    <div className="contentlinkmain">
                      <div className="contentlink"

                        dangerouslySetInnerHTML={{
                          __html: blog.shortDescription,
                        }}
                      />
                      <Link
                        style={{ color: "green" }}
                        to={`/blog/${blog.title
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        Read More <img src={readMoreimg} />
                      </Link>
                    </div>
                  </figcaption>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <h5>No blog found.</h5>
              </div>
            )}
          </div>

          {blogs.length > 0 && (
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

export default Blogs;
