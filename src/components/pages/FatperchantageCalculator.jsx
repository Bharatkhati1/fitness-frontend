import React from "react";
import Header from "../authorized/UserUI/Header/Header";
import Footer from "../authorized/UserUI/Footer/Footer";
import FatBannerBg from "../../../public/assets/img/FatBannerBg.png";
import Form from "react-bootstrap/Form";
import Diet3 from "../../../public/assets/img/Diet3.png";
function FatperchantageCalculator() {
return (
<>
<Header />
<section className="innerbanner">
   <figure>
      <img src={FatBannerBg} />
   </figure>
   <div className="container">
      <div className="innerbannerContent">
         <h2>fat percentage Calculator</h2>
         <p>Understand Your Body Beyond the Scale</p>
      </div>
   </div>
</section>
<section className="InnnerPage bmiCalculator InnerSpace">
   <div className="container">
      <div className="InnerPageTitle">
         <h4>what is fat percentage ? </h4>
         <p>
            Body fat percentage is the proportion of a person's body weight
            that is made up of fat tissue. It is expressed as a percentage and
            indicates how much of the body’s mass consists of fat compared to
            everything else (muscle, bone, water, organs, etc.).
         </p>
      </div>
      <div className="row align-items-center">
         <div className="col-md-6">
            <div className="bmiCalculatorBg">
               <div className="calculateHead">
                  <h4>Calculate your fat loss by putting values below </h4>
               </div>
               <div className="calculatebody">
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
                           <option>Kg</option>
                           <option value="1">inch</option>
                           <option value="2">ft</option>
                        </Form.Select>
                     </div>
                  </div>
                  <div className="calculaField mb-3">
                     <label>Waist:</label>
                     <div className="calculainSelect">
                        <input
                           className="form-control"
                           type="number"
                           placeholder="Enter value"
                           ></input>
                        <Form.Select aria-label="Default select example">
                           <option>Cm</option>
                           <option value="1">inch</option>
                           <option value="2">ft</option>
                        </Form.Select>
                     </div>
                  </div>
                  <div className="calculaField mb-3">
                     <label>Neck:</label>
                     <div className="calculainSelect">
                        <input
                           className="form-control"
                           type="number"
                           placeholder="Enter value"
                           ></input>
                        <Form.Select aria-label="Default select example">
                           <option>Cm</option>
                           <option value="1">inch</option>
                           <option value="2">ft</option>
                        </Form.Select>
                     </div>
                  </div>
                  <div className="calculaField mb-3">
                     <label>Hip:</label>
                     <div className="calculainSelect">
                        <input
                           className="form-control"
                           type="number"
                           placeholder="Enter value"
                           ></input>
                        <Form.Select aria-label="Default select example">
                           <option>Cm</option>
                           <option value="1">inch</option>
                           <option value="2">ft</option>
                        </Form.Select>
                        <span className="taginfo">*Only for Women*</span>
                     </div>
                  </div>
               </div>
               <div className="calculateButton text-center mt-4">
                  <button className="btn btn-primary sm-btn hvr-shutter-out-horizontal">
                  calculate your fat percentage
                  </button>
               </div>
            </div>
         </div>
         <div className="col-md-6  ps-4">
            <div className="calulaterResult calulaterDiet">
               <h4 className="mb-3">Result</h4>
               <div className="ResultBox">
                  <div className="ResultBoxinner-left">
                     <p>
                        Based on the information provided, your estimated body fat
                        percentage using the U.S. Navy Body Fat Formula is
                     </p>
                     <span className="day-text">15.4 %</span>
                     <ul className="optinallyList">
                        <li>Optionally, compare to standard ranges:</li>
                        <li>◦ Men: 10–20% (average)</li>
                        <li>◦ Women: 18–28% (average)</li>
                     </ul>
                     <p className="smallNote">
                        Disclaimer: Please note that this is an estimate. For a
                        precise assessment, consult a qualified health
                        professional.
                     </p>
                     <figure className="Diet3">
                        <img src={Diet3} />
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
export default FatperchantageCalculator;