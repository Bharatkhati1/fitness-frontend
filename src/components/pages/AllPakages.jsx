import React from "react";
import Header from "../../components/authorized/UserUI/Header/Header.jsx";
import Footer from "../../components/authorized/UserUI/Footer/Footer.jsx";
import searchIcon from "../../../public/assets/img/searchIcon.png";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import allpakagesbg from "../../../public/assets/img/allpakagesbg.png";

import Icon1 from "../../../public/assets/img/Icon1.svg";
import Icon2 from "../../../public/assets/img/Icon2.svg";
import Icon3 from "../../../public/assets/img/Icon3.svg";
import Icon4 from "../../../public/assets/img/Icon4.svg";
import Icon5 from "../../../public/assets/img/Icon5.svg";
import Icon6 from "../../../public/assets/img/Icon6.svg";

import productimg1 from "../../../public/assets/img/productimg1.png";
import productimg2 from "../../../public/assets/img/productimg2.png";
import productimg3 from "../../../public/assets/img/productimg3.png";

function AllPakages() {
  return (
    <>
      <Header />
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
              ></input>
              <button className="SearchBtn">
                <img src={searchIcon}></img>
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
              loop={true}
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
              <div class="item">
                <div className="servicelist">
                  <figure>
                    <img src={Icon1}></img>
                  </figure>
                  <p>All packages</p>
                </div>
              </div>

              <div class="item">
                <div className="servicelist">
                  <figure>
                    <img src={Icon2}></img>
                  </figure>
                  <p>fitness</p>
                </div>
              </div>

              <div class="item">
                <div className="servicelist">
                  <figure>
                    <img src={Icon3}></img>
                  </figure>
                  <p>disease management</p>
                </div>
              </div>
              <div class="item">
                <div className="servicelist">
                  <figure>
                    <img src={Icon4}></img>
                  </figure>
                  <p>injury/pain management</p>
                </div>
              </div>
              <div class="item">
                <div className="servicelist">
                  <figure>
                    <img src={Icon5}></img>
                  </figure>
                  <p>medical consultation</p>
                </div>
              </div>
              <div class="item">
                <div className="servicelist">
                  <figure>
                    <img src={Icon6}></img>
                  </figure>
                  <p>alternative medicine</p>
                </div>
              </div>

              <div class="item">
                <div className="servicelist">
                  <figure>
                    <img src={Icon6}></img>
                  </figure>
                  <p>alternative medicine</p>
                </div>
              </div>

              <div class="item">
                <div className="servicelist">
                  <figure>
                    <img src={Icon4}></img>
                  </figure>
                  <p>alternative medicine</p>
                </div>
              </div>

              <div class="item">
                <div className="servicelist">
                  <figure>
                    <img src={Icon2}></img>
                  </figure>
                  <p>alternative medicine</p>
                </div>
              </div>
              <div class="item">
                <div className="servicelist">
                  <figure>
                    <img src={Icon2}></img>
                  </figure>
                  <p>alternative medicine</p>
                </div>
              </div>
              <div class="item">
                <div className="servicelist">
                  <figure>
                    <img src={Icon2}></img>
                  </figure>
                  <p>alternative medicine</p>
                </div>
              </div>
              <div class="item">
                <div className="servicelist">
                  <figure>
                    <img src={Icon2}></img>
                  </figure>
                  <p>alternative medicine</p>
                </div>
              </div>
            </OwlCarousel>
          </div>
        </div>

        <div className="productslists">
          <div className="container">
            <h4 className="producttitle">25 products</h4>

            <OwlCarousel
              className="owl-theme"
              autoplay={false}
              dots={false}
              items={3}
              autoplaySpeed={500}
              autoplayTimeout={3000}
              loop={true}
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
              <div class="item">
                <div className="product-list">
                  <figure>
                    <img src={productimg1} />
                  </figure>

                  <figcaption>
                    <h3>ANKLE n FOOT PAIN/INJURY REHABILITATION - 3 MONTHS</h3>

                    <div className="price mb-3">
                      <del> ₹7999.00</del>
                      <span>₹3999.00</span>
                    </div>

                    <div className="btnbox text-center">
                      {" "}
                      <a className="btn btn-primary sm-btn m-auto hvr-shutter-out-horizontal">
                        know more
                      </a>
                    </div>
                  </figcaption>
                </div>
              </div>

              <div class="item">
                <div className="product-list">
                  <figure>
                    <img src={productimg2} />
                  </figure>

                  <figcaption>
                    <h3>ANKLE n FOOT PAIN/INJURY REHABILITATION - 3 MONTHS</h3>

                    <div className="price mb-3">
                      <del> ₹7999.00</del>
                      <span>₹3999.00</span>
                    </div>

                    <div className="btnbox text-center">
                      <a className="btn btn-primary sm-btn m-auto hvr-shutter-out-horizontal">
                        know more
                      </a>
                    </div>
                  </figcaption>
                </div>
              </div>

              <div class="item">
                <div className="product-list">
                  <figure>
                    <img src={productimg3} />
                  </figure>

                  <figcaption>
                    <h3>ANKLE n FOOT PAIN/INJURY REHABILITATION - 3 MONTHS</h3>

                    <div className="price mb-3">
                      <del> ₹7999.00</del>
                      <span>₹3999.00</span>
                    </div>

                    <div className="btnbox text-center">
                      <a className="btn btn-primary sm-btn m-auto hvr-shutter-out-horizontal">
                        know more
                      </a>
                    </div>
                  </figcaption>
                </div>
              </div>

              <div class="item">
                <div className="product-list">
                  <figure>
                    <img src={productimg1} />
                  </figure>

                  <figcaption>
                    <h3>ANKLE n FOOT PAIN/INJURY REHABILITATION - 3 MONTHS</h3>

                    <div className="price mb-3">
                      <del> ₹7999.00</del>
                      <span>₹3999.00</span>
                    </div>

                    <div className="btnbox text-center">
                      <a className="btn btn-primary sm-btn m-auto hvr-shutter-out-horizontal">
                        know more
                      </a>
                    </div>
                  </figcaption>
                </div>
              </div>

              <div class="item">
                <div className="product-list">
                  <figure>
                    <img src={productimg2} />
                  </figure>

                  <figcaption>
                    <h3>ANKLE n FOOT PAIN/INJURY REHABILITATION - 3 MONTHS</h3>

                    <div className="price mb-3">
                      <del> ₹7999.00</del>
                      <span>₹3999.00</span>
                    </div>

                    <div className="btnbox text-center">
                      <a className="btn btn-primary sm-btn m-auto hvr-shutter-out-horizontal">
                        know more
                      </a>
                    </div>
                  </figcaption>
                </div>
              </div>
            </OwlCarousel>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default AllPakages;
0;
