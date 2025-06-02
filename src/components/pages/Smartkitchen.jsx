import React from "react";
import Header from "../../components/authorized/UserUI/Header/Header.jsx";
import Footer from "../../components/authorized/UserUI/Footer/Footer.jsx";
import searchIcon from "../../../public/assets/img/searchIcon.png";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import kichinbanner from "../../../public/assets/img/kichinbanner.png";

import kichinimg1 from "../../../public/assets/img/smkichin1.png";
import kichinimg2 from "../../../public/assets/img/smkichin2.png";
import kichinimg3 from "../../../public/assets/img/smkichin3.png";
import kichinimg4 from "../../../public/assets/img/smkichin4.png";
import kichinimg5 from "../../../public/assets/img/smkichin5.png";
import kichinimg6 from "../../../public/assets/img/smkichin6.png";
import kichinimg7 from "../../../public/assets/img/smkichin7.png";

import smproductimg1 from "../../../public/assets/img/smproductimg1.png";
import smproductimg2 from "../../../public/assets/img/smproductimg2.png";
import smproductimg3 from "../../../public/assets/img/smproductimg3.png";
import smproductimg4 from "../../../public/assets/img/smproductimg4.png";
import smproductimg5 from "../../../public/assets/img/smproductimg5.png";
import smproductimg6 from "../../../public/assets/img/smproductimg6.png";
import smproductimg7 from "../../../public/assets/img/smproductimg7.png";
import smproductimg8 from "../../../public/assets/img/smproductimg8.png";
import smproductimg9 from "../../../public/assets/img/smproductimg9.png";
import smproductimg10 from "../../../public/assets/img/smproductimg10.png";

import leftp from "../../../public/assets/img/leftp.png";

import leftR from "../../../public/assets/img/rightp.png";
function Smartkitchen() {
  return (
    <>
      <section className="innerbanner blogbanner">
        <h3 className="blogbannertitle">recipe - method - knowledge</h3>
        <figure>
          <img src={kichinbanner} />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>smart kitchen</h2>
            <p>Cook Smart. Eat Right. Live Well.</p>

            <div className="searcwithbtn d-flex">
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

              <div className="btnserch d-flex align-items-center">
                <a className="btn VegBtn">Veg</a>
                <a className="btn Nonvegbtn">non Veg</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="SmartKichin">
        <div className="container">
          <div className="SmartKichinslider">
            <OwlCarousel
              className="owl-theme"
              autoplay={false}
              dots={false}
              items={9}
              autoplaySpeed={500}
              autoplayTimeout={3000}
              loop={true}
              margin={10}
              nav={true}

                  responsive={{
                            0: {
                              items: 2, // 0px and up
                            },
                              481: {
                              items: 3, // 0px and up
                            },
                            768: {
                              items: 5, // 600px and up
                            },
                            992: {
                              items: 7, // 600px and up
                            },
                            1200: {
                              items: 9, // 1000px and up
                            },
                          }}
            >
              <div class="item">
                <div className="SmartKichinbox">
                  <figure>
                    <img src={kichinimg1}></img>
                  </figure>
                  <p>Smoothies</p>
                </div>
              </div>

              <div class="item">
                <div className="SmartKichinbox">
                  <figure>
                    <img src={kichinimg2}></img>
                  </figure>
                  <p>Eggs</p>
                </div>
              </div>

              <div class="item">
                <div className="SmartKichinbox">
                  <figure>
                    <img src={kichinimg3}></img>
                  </figure>
                  <p>Paneer</p>
                </div>
              </div>

              <div class="item">
                <div className="SmartKichinbox">
                  <figure>
                    <img src={kichinimg4}></img>
                  </figure>
                  <p>Chicken</p>
                </div>
              </div>

              <div class="item">
                <div className="SmartKichinbox">
                  <figure>
                    <img src={kichinimg5}></img>
                  </figure>
                  <p>Desserts</p>
                </div>
              </div>

              <div class="item">
                <div className="SmartKichinbox">
                  <figure>
                    <img src={kichinimg6}></img>
                  </figure>
                  <p>Bakes</p>
                </div>
              </div>

              <div class="item">
                <div className="SmartKichinbox">
                  <figure>
                    <img src={kichinimg7}></img>
                  </figure>
                  <p>Salads</p>
                </div>
              </div>

              <div class="item">
                <div className="SmartKichinbox">
                  <figure>
                    <img src={kichinimg2}></img>
                  </figure>
                  <p>Seafood</p>
                </div>
              </div>

              <div class="item">
                <div className="SmartKichinbox">
                  <figure>
                    <img src={kichinimg2}></img>
                  </figure>
                  <p>Soups</p>
                </div>
              </div>

                <div class="item">
                <div className="SmartKichinbox">
                  <figure>
                    <img src={kichinimg5}></img>
                  </figure>
                  <p>Desserts</p>
                </div>
              </div>

              <div class="item">
                <div className="SmartKichinbox">
                  <figure>
                    <img src={kichinimg6}></img>
                  </figure>
                  <p>Bakes</p>
                </div>
              </div>

              <div class="item">
                <div className="SmartKichinbox">
                  <figure>
                    <img src={kichinimg7}></img>
                  </figure>
                  <p>Salads</p>
                </div>
              </div>

              <div class="item">
                <div className="SmartKichinbox">
                  <figure>
                    <img src={kichinimg2}></img>
                  </figure>
                  <p>Seafood</p>
                </div>
              </div>

               <div class="item">
                <div className="SmartKichinbox">
                  <figure>
                    <img src={kichinimg2}></img>
                  </figure>
                  <p>Seafood</p>
                </div>
              </div>

            </OwlCarousel>
          </div>
        </div>
      </section>

      <section className="SmartKichinlist">
        <div className="container">
          <div className="row row-cols-5 SmartKichinlistrow">
            <div className="col">
              <figure>
                <img src={smproductimg1} />
              </figure>

              <figcaption>
                <h4>Strawberry Banana Smoothie</h4>
                <p>A refreshing blend of strawberries, banana, and yogurt.</p>

                <a className="btn btn-primary xm-btn  hvr-shutter-out-horizontal">
                  get recipe
                </a>
              </figcaption>
            </div>
            <div className="col">
              <figure>
                <img src={smproductimg2} />
              </figure>

              <figcaption>
                <h4>Deviled Eggs</h4>
                <p>Hard-boiled eggs with a creamy, tangy filling.</p>

                <a className="btn btn-primary xm-btn  hvr-shutter-out-horizontal">
                  get recipe
                </a>
              </figcaption>
            </div>
            <div className="col">
              <figure>
                <img src={smproductimg3} />
              </figure>

              <figcaption>
                <h4>Grilled Paneer Skewers</h4>
                <p>Spiced paneer cubes grilled with veggies on skewers.</p>

                <a className="btn btn-primary xm-btn  hvr-shutter-out-horizontal">
                  get recipe
                </a>
              </figcaption>
            </div>
            <div className="col">
              <figure>
                <img src={smproductimg4} />
              </figure>

              <figcaption>
                <h4>Roast Chicken with Herbs</h4>
                <p>Whole chicken roasted with garlic, rosemary, and lemon.</p>

                <a className="btn btn-primary xm-btn  hvr-shutter-out-horizontal">
                  get recipe
                </a>
              </figcaption>
            </div>
            <div className="col">
              <figure>
                <img src={smproductimg5} />
              </figure>

              <figcaption>
                <h4>Classic Tiramisu</h4>
                <p>
                  Italian no-bake dessert layered with mascarpone and
                  coffee-soaked biscuits.
                </p>

                <a className="btn btn-primary xm-btn  hvr-shutter-out-horizontal">
                  get recipe
                </a>
              </figcaption>
            </div>
            <div className="col">
              <figure>
                <img src={smproductimg6} />
              </figure>

              <figcaption>
                <h4>Chocolate Muffins</h4>
                <p>Soft, moist muffins packed with rich cocoa flavor.</p>

                <a className="btn btn-primary xm-btn  hvr-shutter-out-horizontal">
                  get recipe
                </a>
              </figcaption>
            </div>

            <div className="col">
              <figure>
                <img src={smproductimg7} />
              </figure>

              <figcaption>
                <h4>Greek Salad</h4>
                <p>
                  A crisp mix of cucumbers, tomatoes, olives, and feta cheese.
                </p>

                <a className="btn btn-primary xm-btn  hvr-shutter-out-horizontal">
                  get recipe
                </a>
              </figcaption>
            </div>

            <div className="col">
              <figure>
                <img src={smproductimg8} />
              </figure>

              <figcaption>
                <h4>Garlic Butter Prawns</h4>
                <p>Juicy prawns tossed in garlic, butter, and fresh herbs.</p>

                <a className="btn btn-primary xm-btn  hvr-shutter-out-horizontal">
                  get recipe
                </a>
              </figcaption>
            </div>

            <div className="col">
              <figure>
                <img src={smproductimg9} />
              </figure>

              <figcaption>
                <h4>Creamy Tomato Basil Soup</h4>
                <p>Smooth tomato soup simmered with fresh basil and cream.</p>

                <a className="btn btn-primary xm-btn  hvr-shutter-out-horizontal">
                  get recipe
                </a>
              </figcaption>
            </div>

            <div className="col">
              <figure>
                <img src={smproductimg10} />
              </figure>

              <figcaption>
                <h4>Mango Lassi Smoothie</h4>
                <p>
                  A chilled yogurt-based mango drink with a hint of cardamom.
                </p>

                <a className="btn btn-primary xm-btn  hvr-shutter-out-horizontal">
                  get recipe
                </a>
              </figcaption>
            </div>
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
      </section>
    </>
  );
}

export default Smartkitchen;
