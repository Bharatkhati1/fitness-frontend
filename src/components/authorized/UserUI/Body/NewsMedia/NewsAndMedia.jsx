import React, { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import BannerImag from "../../../../../../public/assets/img/new-media-banner.png";
import searchIcon from "../../../../../../public/assets/img/searchIcon.png";
import readMoreimg from "../../../../../../public/assets/img/ReadMoreicon.png";
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
  const [sortBy, setSortBy] = useState("ASC");
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

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSelectCategory = (id) => {
    setSearchTerm("")
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
      <section className="innerbanner blogbanner">
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
                onChange={(e) =>{ setSelectedCategory("all");setSearchTerm(e.target.value)}}
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
            <div className="row">
              <div className="col-md col-sm-9">
                <div className="filterOwl">
                  <ul className="taginfolist">
                    <div className="row">
                      <div className="col-xxl-auto col-sm-auto taginfoleft">
                        <li
                          className={selectedCategory === "all" ? "active" : ""}
                          onClick={() => handleSelectCategory("all")}
                        >
                          <span className="tag-info">All</span>
                        </li>
                      </div>
                      <div className="col-xxl col-sm taginforight">
                        {categories.length > 0 && (
                          <OwlCarousel
                            className="owl-theme"
                            autoplay={false}
                            margin={10}
                            dots={false}
                            autoWidth
                            nav={true}
                          >
                            {categories.map((cat) => (
                              <li
                                key={cat.id}
                                className={
                                  selectedCategory === cat.id ? "active px-2" : "px-2"
                                }
                                onClick={() => handleSelectCategory(cat.id)}
                              >
                                <span className="tag-info">{cat.name}</span>
                              </li>
                            ))}
                          </OwlCarousel>
                        )}
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
              <div className="col-auto sortbyright">

                 <select  className="form-select me-2">

                     <option value="">
                    Filter
                  </option>
                  <option value="1">Recent</option>
                  <option value="2">Oldest</option>


                  </select>
                <select
                  className="form-select"
                  onChange={(e) => {
                    const value = e.target.value;
                    setSortBy(value === "2" ? "ASC" : "DESC");
                  }}
                >
                  <option value="" disabled selected>
                    Sort By
                  </option>
                  <option value="1">Recent</option>
                  <option value="2">Oldest</option>
                </select>

                 
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="OurBlogs">
        <div className="container">
          <div className="row OurBlogsRows">
            {newsItems.length > 0 ? (
              newsItems.map((item) => (
                <div className="col-md-6 OurHealthBlogContent" key={item.id}>
                  <figure>
                    {item?.BlogCategory?.name &&<div className="OurBlogsTag">
                      {item?.BlogCategory?.name}
                    </div>}
                    <img
                      crossOrigin="anonymous"
                      src={item.image_url}
                      alt={item.title}
                    />
                  </figure>
                  <figcaption>
                    <h3>{item.title}</h3>
                    {/* <div className="Bytext">
                      <span>
                        {new Date(item.createdAt).toLocaleDateString("en-GB")}
                      </span>
                    </div> */}
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
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    <img src={leftp} />
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                    key={i + 1}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    <img src={leftR} />
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
