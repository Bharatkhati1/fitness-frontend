import React from "react";
import wuIcon1 from "../../../../../public/assets/img/wuIcon-1.png";
import wuIcon2 from "../../../../../public/assets/img/wuIcon-2.png";
import wuIcon3 from "../../../../../public/assets/img/wuIcon-3.png";
import wuIcon4 from "../../../../../public/assets/img/wuIcon-4.png";
import wuIcon5 from "../../../../../public/assets/img/wuIcon-5.png";
const Whyus = () => {
  return (
    <section className="WhyUs SectionSpace mt-4">
    <div className="container">
      <div class="PageTitle text-center"><h2>why us ?</h2></div>
      <div className="row justify-content-center g-lg-4 g-3">
        <div className="col-md-4 col-sm-6">
          <div className="WhyUsinner">
            <figure>
              <img src={wuIcon1} />
            </figure>
            <h4>Personalized Care:</h4>
            <p>
              Tailored solutions powered by AI and human expertise, designed
              to fit  your unique needs and lifestyle.
            </p>
          </div>
        </div>
        <div className="col-md-4 col-sm-6">
          <div className="WhyUsinner">
            <figure>
              <img src={wuIcon2} />
            </figure>
            <h4>Accessibility:</h4>
            <p>
              Tailored solutions powered by AI and human expertise, designed
              to fit  your unique needs and lifestyle.
            </p>
          </div>
        </div>
        <div className="col-md-4 col-sm-6">
          <div className="WhyUsinner">
            <figure>
              <img src={wuIcon3} />
            </figure>
            <h4>Holistic Approach:</h4>
            <p>
              Tailored solutions powered by AI and human expertise, designed
              to fit  your unique needs and lifestyle.
            </p>
          </div>
        </div>
        <div className="col-md-4 col-sm-6">
          <div className="WhyUsinner">
            <figure>
              <img src={wuIcon4} />
            </figure>
            <h4>Empowering Community:</h4>
            <p>
              Tailored solutions powered by AI and human expertise, designed
              to fit  your unique needs and lifestyle.
            </p>
          </div>
        </div>
        <div className="col-md-4 col-sm-6 ">
          <div className="WhyUsinner">
            <figure>
              <img src={wuIcon5} />
            </figure>
            <h4>Proven Results:</h4>
            <p>
              Tailored solutions powered by AI and human expertise, designed
              to fit  your unique needs and lifestyle.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Whyus;
