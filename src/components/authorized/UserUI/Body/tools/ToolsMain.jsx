import React from "react";
import CalorieCalculatorBanner from "../../../../../../public/assets/img/ToolsBannerBg.png";

import toolsImg1 from "../../../../../../public/assets/img/toolsImg1.png";
import toolsImg2 from "../../../../../../public/assets/img/toolsImg2.png";
import toolsImg3 from "../../../../../../public/assets/img/toolsImg3.png";
import toolsImg4 from "../../../../../../public/assets/img/toolsImg4.png";

const ToolsMain = () => {
  return (
    <>
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
    <div className="ToolsPageMain sectionSpace">
      <div className="container">
        <div className="InnerpageHead text-center">
          <h3>Health Calculators Hub</h3>
          <p>
            Explore our essential tools for tracking your health and fitness
            goals effectively and easily
          </p>
        </div>
        <div className="ToolsPageBox mb-4">
          <div className="row">
            <div className="col-md-8 pe-5">
              <h4>BMI Calculator</h4>
              <p>
                Determine your Body Mass Index to assess your weight status
                and overall health risk. Body Mass Index (BMI) is a numerical
                value derived from an individual's weight and height, commonly
                used to categorize body composition and assess overall health.
                It is calculated by dividing a person's weight in kilograms by
                the square of their height in meters.
              </p>
              <a className="btn btn-primary hvr-shutter-out-horizontal">calculate your bmi</a>
            </div>

            <div className="col-md-4">
              <figure>
                <img src={toolsImg1} />
              </figure>
            </div>
          </div>
        </div>

        <div className="ToolsPageBox">
          <div className="row">
            <div className="col-md-8 ps-5">
              <h4>Calorie Calculator</h4>
              <p>
                Calculate your daily calorie needs to maintain or lose weight
                based on your activity level.
              </p>
              <a className="btn btn-primary hvr-shutter-out-horizontal">calculate your calorie intake</a>
            </div>

            <div className="col-md-4">
              <figure>
                <img src={toolsImg2} />
              </figure>
            </div>
          </div>
        </div>

        <div className="ToolsPageBox">
          <div className="row">
            <div className="col-md-8 pe-5">
              <h4>Fat loss Calculator</h4>
              <p>
                Determine your Body Fat Percentage to assess your weight
                status and overall health risk.
              </p>
              <a className="btn btn-primary hvr-shutter-out-horizontal">calculate your fat loss</a>
            </div>

            <div className="col-md-4">
              <figure>
                <img src={toolsImg3} />
              </figure>
            </div>
          </div>
        </div>
        <div className="ToolsPageBox">
          <div className="row">
            <div className="col-md-8 ps-5">
              <h4>IDEAL WEIGHT Calculator</h4>
              <p>
                Calculate your daily calorie needs to maintain or lose weight
                based on your activity level.
              </p>
              <a className="btn btn-primary hvr-shutter-out-horizontal">calculate your ideal weight</a>
            </div>

            <div className="col-md-4">
              <figure>
                <img src={toolsImg4} />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default ToolsMain
