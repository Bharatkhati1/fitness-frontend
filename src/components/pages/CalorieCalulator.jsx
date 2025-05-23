import React from "react";
import Header from "../authorized/UserUI/Header/Header";
import Footer from "../authorized/UserUI/Footer/Footer";
import CalorieCalculatorBanner from "../../../public/assets/img/CalorieCalculatorBanner.png";
import Form from "react-bootstrap/Form";

import Diet1 from "../../../public/assets/img/Diet1.png";

function CalorieCalulator() {
  return (
    <>
      <Header />
      <section className="innerbanner">
        <figure>
          <img src={CalorieCalculatorBanner} />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>calorie Calculator</h2>
            <p>Every Calorie Counts—Make Yours Matter.</p>
          </div>
        </div>
      </section>
      <section className="InnnerPage bmiCalculator InnerSpace">
        <div className="container">
          <div className="InnerPageTitle">
            <h4>what is calorie calculator ? </h4>
            <p>
              A calorie calculator is a tool that helps you estimate how many
              calories your body needs each day based on following factors.
            </p>
          </div>
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="bmiCalculatorBg">
                <div className="calculateHead">
                  <h4>Calculate your calories by putting values below </h4>
                </div>
                <div className="calculatebody">
                  <div className="calculaField mb-3">
                    <label>Age:</label>

                    <div className="FieldIn">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter your age"
                      ></input>
                    </div>
                  </div>

                  <div className="calculaField mb-3">
                    <label>Gender:</label>

                    <div className="radioListBox">
                      <ul className="radioList d-flex">
                        <li>
                          <input
                            type="radio"
                            id="test1"
                            name="radio-group"
                            checked
                          />
                          <label for="test1">Male</label>
                        </li>

                        <li>
                          <input type="radio" id="test1" name="radio-group" />
                          <label for="test1">Female</label>
                        </li>
                      </ul>
                    </div>
                  </div>
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

                  <div className="calculaField mb-3">
                    <label>Activity Level:</label>

                    <div className="FieldIn">
                      <Form.Select aria-label="Default select example">
                        <option>Please select one</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </Form.Select>
                    </div>
                  </div>

                  <div className="calculaField mb-3">
                    <label>Goal:</label>

                    <div className="FieldIn">
                      <Form.Select aria-label="Default select example">
                        <option>Please select one</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </Form.Select>
                    </div>
                  </div>

                  <div className="calculateButton text-center mt-4">
                    <button className="btn btn-primary sm-btn hvr-shutter-out-horizontal">
                      calculate your calories
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6  ps-4">
              <div className="calulaterResult calulaterDiet">
                <h4>Result</h4>

                <div className="ResultBox">
                  <div className="ResultBox-left">
                    <p>
                      Based on your details and chosen goal, you should consume
                      around
                    </p>

                    <span className="day-text">
                      2,549 <sub>Calories/day</sub>
                    </span>
                  </div>

                  <div className="ResultBox-right">
                    <figure>
                      <img src={Diet1} />
                    </figure>
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

export default CalorieCalulator;
