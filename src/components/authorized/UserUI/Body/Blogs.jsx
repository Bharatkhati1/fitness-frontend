import React, { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import HealthBg from "../../../../../public/assets/img/HealthBg.png";
import searchIcon from "../../../../../public/assets/img/searchIcon.png";
import readMoreimg from "../../../../../public/assets/img/ReadMoreicon.png";
import leftp from "../../../../../public/assets/img/leftp.png";
import leftR from "../../../../../public/assets/img/rightp.png";
import { webAxios } from "../../../../utils/Api/userAxios";
import userApiRoutes from "../../../../utils/Api/Routes/userApiRoutes";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setBlogCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 10;

  const getBlogs = async (page = 1, category = "all", search = "") => {
    try {
      const query = {
        page,
        limit,
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
      const chunkSize = 6;
      const categoriesData = response.data.data;
      const chunked = [];
      for (let i = 0; i < categoriesData.length; i += chunkSize) {
        chunked.push(categoriesData.slice(i, i + chunkSize));
      }
      setBlogCategories(categoriesData);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    getBlogs(1, selectedCategory, searchTerm);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
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
    getBlogs(currentPage, selectedCategory, searchTerm);
  }, [currentPage, selectedCategory]);

  useEffect(() => {
    getBlogCategories();
  }, []);
  return (
    <>
      <section className="innerbanner blogbanner">
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
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button className="SearchBtn" onClick={handleSearch}>
                <img src={searchIcon} alt="Search" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="filtersBox">
        <div className="container">
          <div className="filtersBoxInner d-flex">
            <div className="filterOwl">
              <ul className="taginfolist d-flex">
                <li
                  // data-item="all"
                  className={selectedCategory === "all" ? "active" : ""}
                  onClick={() => handleSelectCategory("all")}
                >
                  <span className="tag-info">All</span>
                </li>
                <OwlCarousel
                  className="owl-theme"
                  autoplay={false}
                  dots={false}
                  items={7}
                  nav
                >
                  {categories.map((cat) => (
                    <li
                      // data-item={cat.id}
                      className={selectedCategory === cat.id ? "active" : ""}
                      onClick={() => handleSelectCategory(cat.id)}
                    >
                      <span className="tag-info">{cat.name}</span>
                    </li>
                  ))}
                </OwlCarousel>
              </ul>
            </div>

            <select className="form-select">
              <option selected>Sort By</option>
              <option value="1">Recent</option>
              <option value="2">Popular</option>
            </select>
          </div>
        </div>
      </div>

      <div className="OurBlogs">
        <div className="container">
          <div className="row OurBlogsRows">
            {blogs.length>0?blogs.map((blog) => (
              <div className="col-md-6 OurHealthBlogContent" key={blog.id}>
                <figure>
                  <div className="OurBlogsTag">
                    {blog.categoryName || "Health"}
                  </div>
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
                      {new Date(blog.createdAt).toLocaleDateString("en-GB")} . 2
                      min read
                    </span>
                  </div>
                  <p>
                    {blog.shortDescription}
                    <Link to={`/blog/${blog.title
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}>
                      Read More <img src={readMoreimg} />
                    </Link>
                  </p>
                </figcaption>
              </div>
            )):<h3 ><b>No blog found !</b></h3>}
          </div>

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
        </div>
      </div>
    </>
  );
}

export default Blogs;
