import React from "react";
import Header from "../authorized/UserUI/Header/Header";
import Footer from "../authorized/UserUI/Footer/Footer";
import IdealBanner from "../../../public/assets/img/IdealBanner.png";
import Form from "react-bootstrap/Form";

import Diet2 from "../../../public/assets/img/Diet2.png";

function IdealweightPage() {
  return (
    <>
      <Header />
      <section className="innerbanner">
        <figure>
          <img src={IdealBanner} />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>ideal weight Calculator</h2>
            <p>Discover the Weight That’s Right for You.</p>
          </div>
        </div>
      </section>
      <section className="InnnerPage bmiCalculator InnerSpace">
        <div className="container">
          <div className="InnerPageTitle">
            <h4>what is ideal weight ? </h4>
            <p>
              Ideal weight is the estimated body weight range that is considered healthiest for an individual based on factors like height, age, gender, and body composition.
            </p>
          </div>
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="bmiCalculatorBg">
                <div className="calculateHead">
                  <h4>Calculate your Ideal Weight by putting values below   </h4>
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
                    <label>Body Frame:</label>

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
                     calculate your ideal weight
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
                     According to Hamwi’s Formula, <span className="text-primary">your Ideal Weight is:</span>
                    </p>

                    <span className="day-text">
                     165.3 lbs
                    </span>
                  </div>

                  <div className="ResultBox-right">
                    <figure>
                      <img src={Diet2} />
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

export default IdealweightPage;
