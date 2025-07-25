import React, { useState, useEffect } from "react";
import { Modal } from "antd";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { toast } from "react-toastify";
import { webAxios } from "../../utils/constants";
import userApiRoutes from "../../utils/Api/Routes/userApiRoutes";
import { Link } from "react-router-dom";

function Innovation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [innovation, setinnovation] = useState([]);
  const [categories, setBlogCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sliders, setSliders] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const limit = 10;

  const getinnovation = async (
    page = 1,
    category = "all",
    search = "",
    sortBy = "ASC"
  ) => {
    try {
      const query = {
        page,
        limit,
        type: "innovation",
        order: sortBy,
        ...(category !== "all" && { category }),
        ...(search && { search }),
      };

      const response = await webAxios.get(userApiRoutes.get_blogs(query));
      setinnovation(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch innovation"
      );
    }
  };

  const getBlogCategories = async () => {
    try {
      const response = await webAxios.get(
        userApiRoutes.get_master_categories("innovation")
      );
      const categoriesData = response.data.data;
      setBlogCategories(categoriesData);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  };


  const getSliders = async () => {
    try {
      const response = await webAxios.get(
        userApiRoutes.get_sliders("innovation-page")
      );
      setSliders(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to fetch sliders");
    }
  };

  const handleSelectCategory = (id) => {
    setSelectedCategory(id);
    setCurrentPage(1);
  };

  useEffect(() => {
    getinnovation(currentPage, selectedCategory);
  }, [currentPage, selectedCategory]);

  useEffect(() => {
    getBlogCategories();
    getSliders();
  }, []);
  return (
    <>
      <div className="innerSpace mt-4">
        <div className="container">
          <div className="innovation">
            <div className="row g-1">
              {sliders && sliders.length > 0 && (
                <>
                  {/* Primary Slider (Left Section) */}
                  <div className="col-md-7">
                    <div className="imgcard">
                      <img
                        crossOrigin="anonymous"
                        src={
                          sliders.find((s) => s.isPrimary)?.image_url ||
                          sliders[0]?.image_url
                        }
                        alt="Primary"
                      />
                      <div className="imgcardcontent">
                        <h4>
                          {sliders.find((s) => s.isPrimary)?.heading ||
                            sliders[0]?.heading ||
                            "Intelligence. Innovation. Impact."}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Other Sliders (Right Section) */}
                  <div className="col-md-5">
                    <div className="row g-1">
                      {sliders
                        .filter((s) => !s.isPrimary)
                        .slice(0, 4)
                        .map((img, idx) => (
                          <div className="col-md-6" key={idx}>
                            <div className="imgsmcard">
                              <img
                                src={img.image_url}
                                crossOrigin="anonymous"
                                alt={`Slider ${idx}`}
                              />
                              <div className="imgsmcardcontent">
                                <p>{img.heading}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="filtersBox innovationfilters">
            <div className="filtersBoxInner">
              <div className="filterOwl">
                <ul className="taginfolist ps-4">
                  <div className="row">
                    <div className="col-xxl-auto col-sm-auto taginfoleft pe-0 d-none d-lg-block">
                      <li
                        className={selectedCategory === "all" ? "active" : ""}
                        onClick={() => handleSelectCategory("all")}
                      >
                        <span className="tag-info">All</span>
                      </li>
                    </div>
                    <div className="col-xxl col-sm taginforight d-none d-lg-block">
                      {categories.length > 0 && (
                        <OwlCarousel
                          className="owl-theme"
                          autoplay={false}
                          margin={10}
                          dots={false}
                          nav
                          autoWidth
                        >
                          {categories.map((cat) => (
                            <li
                              key={cat.id}
                              className={selectedCategory === cat.id ? "active px-2" : "px-2"}
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
                        className="btn btn-primary filter-btn"
                        onClick={() => setShowMobileFilters(true)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M1.5 1.5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 .4.8L10 8.333V13.5a.5.5 0 0 1-.8.4l-2-1.5a.5.5 0 0 1-.2-.4V8.333L1.1 1.8a.5.5 0 0 1 .4-.8z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </ul>
              </div>
            </div>
          </div>

          {/* Mobile Filter Overlay */}
          <div
            className={`mobile-filters-overlay ${showMobileFilters ? "show" : ""}`}
            onClick={() => setShowMobileFilters(false)}
          >
            <div className="mobile-filters-card" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn btn btn-primary btn-link w-100 text-end" onClick={() => setShowMobileFilters(false)}>
                 ✖
              </button>
              <ul className="list-unstyled  gap-2">
                <li
                  className={selectedCategory === "all" ? "active mb-2" : "mb-2"}
                  onClick={() => { handleSelectCategory("all"); setShowMobileFilters(false); }}
                >
                  <span className="tag-info">All</span>
                </li>
                {categories.map((cat) => (
                  <li
                    key={cat.id}
                    className={selectedCategory === cat.id ? "active mb-2" : "mb-2"}
                    onClick={() => { handleSelectCategory(cat.id); setShowMobileFilters(false); }}
                  >
                    <span className="tag-info">{cat.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {innovation.length > 0 ? (
            innovation.map((inov) => (
              <div className="innovationlist mt-4">
                <div className="row align-items-center mb-4">
                  <div className="col-md-5">
                    <figure>
                      <img crossOrigin="anonymous" src={inov.image_url}></img>
                    </figure>
                  </div>

                  <div className="col-md-7 text-center ps-4">
                    <h3 className="">{inov.title}</h3>
                    <div class="Bytext text-center">
                      <span>
                        By {inov.auther} .{" "}
                        {new Date(inov.date)
                          .toLocaleDateString("en-GB")
                          .replaceAll("/", "-")}{" "}
                        . {inov.readTime} min read
                      </span>
                    </div>

                    <hr className="dashed-text"></hr>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: inov.shortDescription,
                      }}
                    ></p>

                    <Link
                      className="btn btn-primary max-width hvr-shutter-out-horizontal"
                      to={`/innovation-details/${inov.slug}`}
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <h5>No Data found.</h5>
            </div>
          )}
        </div>

        <div className="stayaheadbg">
          <div className="container">
            <div className="row">
              <div className="col-md-9">
                <h4>Stay Ahead in Health — One Inbox at a Time</h4>
                <span>
                  Get powerful fitness tips, nutrition insights, mental wellness
                  hacks, and exclusive updates delivered straight to you.
                </span>

                <p>
                  Join a growing community that believes in smart,
                  science-backed living — because your wellness journey deserves
                  the latest, every step of the way.
                </p>

                <a className="btn btn-primary max-width hvr-shutter-out-horizontal" onClick={showModal}>
                  subscribe to our newsletter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="stayModal"
      >
        <div className="staybgmodal">
          <h4>Don’t Miss a Beat of Your Wellness Journey</h4>

          <p>
            Be the first to receive expert fitness tips, nutrition insights,
            mental health hacks, event invites, and more — straight to your
            inbox.
          </p>

          <div className="formfield  col-md-6">
            <label>Your Email ID*</label>
            <input
              type="text"
              placeholder="Enter your email id"
              className="form-control"
            ></input>
            <a className="btn btn-primary w-100 mt-3">subscribe</a>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Innovation;
