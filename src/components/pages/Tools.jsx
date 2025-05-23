import React from "react";
import Header from "../authorized/UserUI/Header/Header";
import Footer from "../authorized/UserUI/Footer/Footer";
import CalorieCalculatorBanner from "../../../public/assets/img/ToolsBannerBg.png";

import tootlsImg1 from "../../../public/assets/img/tootlsImg1.png";

export default function Tools() {
  return (
    <>
      <Header />

      <section className="innerbanner">
        <figure>
          <img src={CalorieCalculatorBanner} />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>YOUR FITNESS TOOLS</h2>
            <p>
              Access our calorie, BMI, and fat percentage calculators to enhance
              your health journey today!
            </p>
          </div>
        </div>
      </section>

      <div className="row">
        <div className="col-md-9">
          <h4>BMI Calculator</h4>
          <p>
            Determine your Body Mass Index to assess your weight status and
            overall health risk. Body Mass Index (BMI) is a numerical value
            derived from an individual's weight and height, commonly used to
            categorize body composition and assess overall health. It is
            calculated by dividing a person's weight in kilograms by the square
            of their height in meters.
          </p>
          <a className="btn btn-primary">calculate your bmi</a>
        </div>

        <div className="col-md-3">
          <figure>
            <img src={tootlsImg1} />
          </figure>
        </div>
      </div>
      <Footer />
    </>
  );
}
