import React from "react";
import Header from "../../components/authorized/UserUI/Header/Header.jsx";
import Footer from "../../components/authorized/UserUI/Footer/Footer.jsx";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import HealthBg from "../../../public/assets/img/HealthBg.png";

import searchIcon from "../../../public/assets/img/searchIcon.png";

import BlogImg1 from "../../../public/assets/img/Blog1.png";
import BlogImg2 from "../../../public/assets/img/Blog2.png";
import BlogImg3 from "../../../public/assets/img/Blog3.png";
import BlogImg4 from "../../../public/assets/img/Blog4.png";
import BlogImg5 from "../../../public/assets/img/Blog5.png";
import BlogImg6 from "../../../public/assets/img/Blog6.png";

import readMoreimg from "../../../public/assets/img/ReadMoreicon.png";

import leftp from "../../../public/assets/img/leftp.png";

import leftR from "../../../public/assets/img/rightp.png";

function Blogs() {
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
              ></input>
              <button className="SearchBtn">
                <img src={searchIcon}></img>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="filtersBox">
        <div className="container">
          <div className="filtersBoxInner d-flex">
            <div className="filterOwl">
              <OwlCarousel
                className="owl-theme"
                autoplay={false}
                dots={false}
                items={1}
                autoplaySpeed={500}
                autoplayTimeout={3000}
                margin={0}
                nav={true}
              >
                <div class="item">
                  <ul className="taginfolist d-flex">
                    <li className="active">
                      <span className="tag-info">All</span>
                    </li>

                    <li>
                      <span className="tag-info">Health</span>
                    </li>

                    <li>
                      <span className="tag-info">Fitness</span>
                    </li>

                    <li>
                      <span className="tag-info">Disease</span>
                    </li>

                    <li>
                      <span className="tag-info">Mental Health</span>
                    </li>

                    <li>
                      <span className="tag-info">Medicine</span>
                    </li>

                    <li>
                      <span className="tag-info">Injury</span>
                    </li>
                  </ul>
                </div>

                <div class="item">
                  <ul className="taginfolist d-flex">
                    <li className="active">
                      <span className="tag-info">All</span>
                    </li>

                    <li>
                      <span className="tag-info">Health</span>
                    </li>

                    <li>
                      <span className="tag-info">Fitness</span>
                    </li>

                    <li>
                      <span className="tag-info">Disease</span>
                    </li>

                    <li>
                      <span className="tag-info">Mental Health</span>
                    </li>

                    <li>
                      <span className="tag-info">Medicine</span>
                    </li>

                    <li>
                      <span className="tag-info">Injury</span>
                    </li>
                  </ul>
                </div>
              </OwlCarousel>
            </div>

            <select class="form-select" aria-label="Default select example">
              <option selected>Sort By</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
      </div>
      <div className="OurBlogs">
        <div className="container">
          <div className="row OurBlogsRows">
            <div className="col-md-6 OurHealthBlogContent">
              <figure>
                <div className="OurBlogsTag">Health</div>
                <img src={BlogImg1} />
              </figure>
              <figcaption>
                <h3>Understanding Glutathione : Benefits and Myths</h3>

                <div className="Bytext">
                  <span>By Nivesh Sharma . 4/21/2025 . 2 min read</span>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled......
                  <a>
                    Read More <img src={readMoreimg}></img>
                  </a>
                </p>
              </figcaption>
            </div>
            <div className="col-md-6 OurHealthBlogContent">
              <figure>
                <div className="OurBlogsTag">Health</div>
                <img src={BlogImg2} />
              </figure>
              <figcaption>
                <h3>Understanding Protein Intake for Different Individuals</h3>

                <div className="Bytext">
                  <span>By Nivesh Sharma . 4/21/2025 . 2 min read</span>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled......
                  <a>
                    Read More <img src={readMoreimg}></img>
                  </a>
                </p>
              </figcaption>
            </div>
            <div className="col-md-6 OurHealthBlogContent ">
              <figure>
                <div className="OurBlogsTag">Health</div>
                <img src={BlogImg3} />
              </figure>
              <figcaption>
                <h3>
                  Cortisol : Strategies to Reduce Levels for Better Health
                </h3>

                <div className="Bytext">
                  <span>By Nivesh Sharma . 4/21/2025 . 2 min read</span>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled......
                  <a>
                    Read More <img src={readMoreimg}></img>
                  </a>
                </p>
              </figcaption>
            </div>
            <div className="col-md-6 OurHealthBlogContent ">
              <figure>
                <div className="OurBlogsTag">Health</div>
                <img src={BlogImg4} />
              </figure>
              <figcaption>
                <h3>
                  The Disadvantages of Ego Lifting: Understanding the Risks of
                  Weight Training
                </h3>

                <div className="Bytext">
                  <span>By Nivesh Sharma . 4/21/2025 . 2 min read</span>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled......
                  <a>
                    Read More <img src={readMoreimg}></img>
                  </a>
                </p>
              </figcaption>
            </div>
            <div className="col-md-6 OurHealthBlogContent ">
              <figure>
                <div className="OurBlogsTag">Health</div>
                <img src={BlogImg5} />
              </figure>
              <figcaption>
                <h3>
                  The Disadvantages of Ego Lifting: Understanding the Risks of
                  Weight Training
                </h3>

                <div className="Bytext">
                  <span>By Nivesh Sharma . 4/21/2025 . 2 min read</span>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled......
                  <a>
                    Read More <img src={readMoreimg}></img>
                  </a>
                </p>
              </figcaption>
            </div>
            <div className="col-md-6 OurHealthBlogContent ">
              <figure>
                <div className="OurBlogsTag">Health</div>
                <img src={BlogImg6} />
              </figure>
              <figcaption>
                <h3>
                  The Disadvantages of Ego Lifting: Understanding the Risks of
                  Weight Training
                </h3>

                <div className="Bytext">
                  <span>By Nivesh Sharma . 4/21/2025 . 2 min read</span>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled......
                  <a>
                    Read More <img src={readMoreimg}></img>
                  </a>
                </p>
              </figcaption>
            </div>
          </div>

          <div className="paginationBox d-flex justify-content-center">
            <ul class="pagination">
              <li class="page-item ">
                <a class="page-link" href="#">
                  <img src={leftp}></img>
                </a>
              </li>
              <li class="page-item active">
                <a class="page-link" href="#">
                  1
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  2
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  3
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  <img src={leftR}></img>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Blogs;
