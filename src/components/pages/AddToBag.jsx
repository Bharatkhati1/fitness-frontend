import React from "react";
import addtobagbg from "../../../public/assets/img/addtobagbg.png";

import osproductimg1 from "../../../public/assets/img/osproductimg1.png";
import osproductimg2 from "../../../public/assets/img/osproductimg2.png";

import deleteicon from "../../../public/assets/img/deleteicon.png";

import discoutimg from "../../../public/assets/img/discoutimg.png";

export default function AddToBag() {
  return (
    <>
      <section className="innerbanner">
        <figure>
          <img src={addtobagbg} />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>add to bag</h2>
          </div>
        </div>
      </section>

      <section className="sectionSpace addtobag">
        <div className="container">
          <div class="InnerPageTitle ">
            <h4>billing details</h4>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="addtobagleft">
                <div className="addtobaghead">
                  <h4>contact details</h4>
                </div>

                <div className="addtobabody">
                  <div className="form-group mb-3">
                    <label>
                      First Name<span className="validation">*</span>
                    </label>

                    <input
                      type="text"
                      value="Rahul"
                      className="form-control"
                    ></input>
                  </div>

                  <div className="form-group mb-3">
                    <label>
                      Last Name<span className="validation">*</span>
                    </label>

                    <input
                      type="text"
                      value="Kumawat"
                      className="form-control"
                    ></input>
                  </div>
                  <div className="form-group mb-3">
                    <label>
                      Email ID<span className="validation">*</span>
                    </label>

                    <input
                      type="text"
                      value="rahulkumawat1213@gmail.com"
                      className="form-control"
                    ></input>
                  </div>
                  <div className="form-group mb-3">
                    <label>
                      Phone Number<span className="validation">*</span>
                    </label>

                    <input
                      value="+91 9877563561"
                      className="form-control"
                    ></input>
                  </div>

                  <div className="form-group mb-3">
                    <label>
                      Select Country<span className="validation">*</span>
                    </label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>India</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-5 ms-auto">
              <div className="addtobagright">
                <div className="addtobaghead">
                  <h4>order summary</h4>
                </div>

                <div className="addtobabody">
                  <ul className="ordersummarylist">
                    <li>
                      <figure>
                        <img src={osproductimg1} />
                      </figure>
                      <figcaption>
                        <h4>Diabetes: Smart Health Package - 3 Months</h4>
                        <span className="price-text">₹ 12,999</span>
                        <a className="Deleteicon">
                          <img src={deleteicon}></img>
                        </a>
                      </figcaption>
                    </li>

                    <li>
                      <figure>
                        <img src={osproductimg2} />
                      </figure>
                      <figcaption>
                        <h4>Diabetes: Smart Health Package - 3 Months</h4>
                        <span className="price-text">₹ 12,999</span>
                        <a className="Deleteicon">
                          <img src={deleteicon}></img>
                        </a>
                      </figcaption>
                    </li>
                  </ul>

                  <div className="discoutBox mb-4">
                    <input
                      className="form-control"
                      placeholder="Add discount code"
                    ></input>
                    <img className="tagicon" src={discoutimg}></img>
                    <button className="applybtn">Apply</button>
                  </div>

                  <ul className="Pricebrnkdownlist">
                    <li>
                      <span>Subtotal:</span>
                      <b>₹ 14,798</b>
                    </li>
                    <li>
                      <span>Discount:</span>
                      <b className="red-text pe-4">-₹ 0</b>
                    </li>
                    <li>
                      <span>Total:</span>
                      <b>₹ 11,839</b>
                    </li>
                  </ul>

                  <div className="btnbox mt-4 text-center">
                   
                    <a className="btn btn-primary max-width hvr-shutter-out-horizontal">proceed to pay</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
