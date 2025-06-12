import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";

import innovationimg1 from "../../../public/assets/img/innovationimg1.png";
import innovationimg2 from "../../../public/assets/img/innovationimg2.png";
import innovationimg3 from "../../../public/assets/img/innovationimg3.png";

import innovationicon1 from "../../../public/assets/img/innovationicon1.png";
import innovationicon2 from "../../../public/assets/img/innovationicon2.png";
import innovationicon3 from "../../../public/assets/img/innovationicon3.png";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { toast } from "react-toastify";
import { webAxios } from "../../utils/constants";
import useDebounce from "../Hooks/useDebounce";
import userApiRoutes from "../../utils/Api/Routes/userApiRoutes";

function Innovation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [innovation, setinnovation] = useState([]);
  const [categories, setBlogCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
      setTotalPages(Math.ceil(response.data.total / limit));
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
    getinnovation(currentPage, selectedCategory);
  }, [currentPage, selectedCategory]);

  useEffect(() => {
    getBlogCategories();
  }, []);
  return (
    <>
      <div className="innerSpace mt-4">
        <div className="container">
          <div className="innovation">
            <div className="row g-1">
              <div className="col-md-7">
                <div className="imgcard">
                  <img src={innovationimg1}></img>

                  <div className="imgcardcontent">
                    <h4>Intelligence. Innovation. Impact.</h4>
                  </div>
                </div>
              </div>

              <div className="col-md-5">
                <div className="row g-1">
                  <div className="col-md-6 ">
                    <div className="imgsmcard">
                      {" "}
                      <img src={innovationimg2}></img>
                    </div>
                  </div>
                  <div className="col-md-6  ">
                    <div className="innovationcontent">
                      <span className="dotsicon">
                        <img src={innovationicon3}></img>
                      </span>
                      <img src={innovationicon1}></img>
                      <h4>Where daily health meets deep tech.</h4>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="innovationcontent">
                      <span className="dotsicon">
                        <img src={innovationicon3}></img>
                      </span>
                      <img src={innovationicon2}></img>
                      <h4>Where daily health meets deep tech.</h4>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="imgsmcard">
                      {" "}
                      <img src={innovationimg3}></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="filtersBox">
            <div className="container">
              <div className="filtersBoxInner">
                <div className="row">
                  <div className="col-xxl-12 col-md-12 col-xl-12 col-sm-12">
                    <div className="filterOwl">
                      <ul className="taginfolist ">
                        <div className="row">
                          <div className="col-xxl-auto col-sm-auto taginfoleft">
                            <li
                              className={
                                selectedCategory === "all" ? "active" : ""
                              }
                              onClick={() => handleSelectCategory("all")}
                            >
                              <span className="tag-info">All</span>
                            </li>
                          </div>
                          <div className="col-xxl col-sm  taginforight">
                            {categories.length > 0 && (
                              <OwlCarousel
                                className="owl-theme"
                                autoplay={false}
                                margin={10}
                                dots={false}
                                items={7}
                                nav
                                responsive={{
                                  0: {
                                    items: 2, // 0px and up
                                  },
                                  481: {
                                    items: 3, // 0px and up
                                  },
                                  768: {
                                    items: 4, // 600px and up
                                  },
                                  992: {
                                    items: 5, // 600px and up
                                  },
                                  1200: {
                                    items: 7, // 1000px and up
                                  },
                                }}
                              >
                                {categories.map((cat) => (
                                  <li
                                    className={
                                      selectedCategory === cat.id
                                        ? "active"
                                        : ""
                                    }
                                    onClick={() => {
                                      handleSelectCategory(cat.id);
                                    }}
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
                </div>
              </div>
            </div>
          </div>
          {innovation.map((inov) => (
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
                      By {inov.auther} .{inov.date} . {inov.readTime} min read
                    </span>
                  </div>

                  <hr className="dashed-text"></hr>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: inov.shortDescription,
                    }}
                  ></p>

                  <a className="btn btn-primary max-width">read now</a>
                </div>
              </div>
            </div>
          ))}
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

                <a className="btn btn-primary max-width" onClick={showModal}>
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
