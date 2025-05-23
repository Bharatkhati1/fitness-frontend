import React from "react";
import Header from "../authorized/UserUI/Header/Header";
import Footer from "../authorized/UserUI/Footer/Footer";
import BmiBanner from "../../../public/assets/img/BmiCalulatorBanner.png";
import Form from "react-bootstrap/Form";

import wightImg1 from "../../../public/assets/img/weightInfoimg1.png";
import wightImg2 from "../../../public/assets/img/weightInfoimg2.png";
import wightImg3 from "../../../public/assets/img/weightInfoimg3.png";
import wightImg4 from "../../../public/assets/img/weightInfoimg4.png";

function BmiCalculatorPage() {
  return (
    <>
      <Header />
      <section className="innerbanner">
        <figure>
          <img src={BmiBanner} />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>BMI Calculator</h2>
            <p>
              Your Journey to Better Health Begins with One Simple Number – Know
              Your BMI, Know Yourself.
            </p>
          </div>
        </div>
      </section>
      <section className="InnnerPage bmiCalculator InnerSpace">
        <div className="container">
          <div className="InnerPageTitle">
            <h4>what is bmi ? </h4>
            <p>
              BMI stands for Body Mass Index — it’s a simple calculation used to
              estimate whether a person has a healthy body weight for their
              height.
            </p>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="bmiCalculatorBg">
                <div className="calculateHead">
                  <h4>Calculate your bMI by putting values below </h4>
                </div>
                <div className="calculatebody">
                  <div className="calculaField mb-3">
                    <label>Height:</label>
                    <div className="calculainSelect">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Enter value"
                      ></input>

                      <Form.Select aria-label="Default select example">
                        <option>cm</option>
                        <option value="1">inch</option>
                        <option value="2">ft</option>
                      </Form.Select>
                    </div>
                  </div>
                  <div className="calculaField mb-3">
                    <label>Weight:</label>
                    <div className="calculainSelect">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Enter value"
                      ></input>

                      <Form.Select aria-label="Default select example">
                        <option>cm</option>
                        <option value="1">kg</option>
                        <option value="2">ft</option>
                      </Form.Select>
                    </div>
                  </div>

                  <div className="calculateButton text-center mt-4">
                    <button className="btn btn-primary sm-btn hvr-shutter-out-horizontal">
                      calculate your bmi
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-5 ms-auto">
              <div className="calulaterResult">
                <div className="calulaterResultHead">
                  <h3>Result</h3>
                </div>

                <div className="calulaterResultBody">
                  <ul className="wightList">
                    <li>
                      <figure>
                        <img src={wightImg1} />
                      </figure>
                      <h4>&#60; 18.5</h4>
                    </li>

                    <li>
                      <figure>
                        <img src={wightImg2} />
                      </figure>
                      <h4> 18.5-24.9</h4>
                    </li>

                    <li>
                      <figure>
                        <img src={wightImg3} />
                      </figure>
                      <h4> 25.0-29.9</h4>
                    </li>
                    <li>
                      <figure>
                        <img src={wightImg4} />
                      </figure>
                      <h4>= ; 30.0</h4>
                    </li>
                  </ul>

                  <div className="yourBmi">
                    Your BMI:
                    <span>
                      19.7 <b>(Normal)</b>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
export default BmiCalculatorPage;
