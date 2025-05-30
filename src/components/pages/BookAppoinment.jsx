import React from "react";
import Header from "../../components/authorized/UserUI/Header/Header.jsx";
import Footer from "../../components/authorized/UserUI/Footer/Footer.jsx";

import docterImg1 from "../../../public/assets/img/docterImg1.png";
import docterImg2 from "../../../public/assets/img/docterImg2.png";
import docterImg3 from "../../../public/assets/img/docterImg3.png";

function BookAppoinment() {
  return (
    <>
      <Header />

      <section className="fixspace bookappoinment">
        <div class="OurTEAMhead text-center">
          <span>health consultation</span>
          <h2>meet our diabetes health experts</h2>
          <p>
            Your trusted guide in managing and understanding diabetes. With
            expert knowledge in nutrition, lifestyle planning, and blood sugar
            management, <br></br>they’re here to help you take control of your
            health—one step at a time.
          </p>
        </div>
      </section>

      <section className="bookappoinmentdcoter">
        <div className="container">
          <div className="bookappoinmentinner">
            <div className="row">
              <div className="col-md-5 ">
                <div className="bookappoinmentl">
                  <figure>
                    <img src={docterImg1} />
                  </figure>
                </div>
              </div>

              <div className="col-md-7 ">
                <div className="bookappoinmentr">
                  <div className="bookappoinmenthead d-flex justify-content-between align-items-end">
                    <div className="bpheadleft">
                      <h4>Dr. rakhi gupta</h4>
                      <p>diabetes specialist</p>
                      <p>13 years of experience</p>
                    </div>

                    <div className="pricetime">₹ 549.00 | 15 min</div>
                  </div>

                  <hr></hr>

                  <div className="bookappoinmentbody">
                    <h5>Overview:</h5>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled
                    </p>

                    <a className="btn btn-primary max-width mt-2 hvr-shutter-out-horizontal">
                      make an appointment
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bookappoinmentinner">
            <div className="row">
              <div className="col-md-5 ">
                <div className="bookappoinmentl">
                  <figure>
                    <img src={docterImg2} />
                  </figure>
                </div>
              </div>

              <div className="col-md-7 ">
                <div className="bookappoinmentr">
                  <div className="bookappoinmenthead d-flex justify-content-between align-items-end">
                    <div className="bpheadleft">
                      <h4>Dr. rajesh joshi</h4>
                      <p>diabetes specialist</p>
                      <p>23 years of experience</p>
                    </div>

                    <div className="pricetime">₹ 549.00 | 15 min</div>
                  </div>

                  <hr></hr>

                  <div className="bookappoinmentbody">
                    <h5>Overview:</h5>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled
                    </p>

                    <a className="btn btn-primary max-width mt-2 hvr-shutter-out-horizontal">
                      make an appointment
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bookappoinmentinner">
            <div className="row">
              <div className="col-md-5 ">
                <div className="bookappoinmentl">
                  <figure>
                    <img src={docterImg3} />
                  </figure>
                </div>
              </div>

              <div className="col-md-7 ">
                <div className="bookappoinmentr">
                  <div className="bookappoinmenthead d-flex justify-content-between align-items-end">
                    <div className="bpheadleft">
                      <h4>Dr. mithilesh gaur</h4>
                      <p>diabetes specialist</p>
                      <p>20 years of experience</p>
                    </div>

                    <div className="pricetime">₹ 549.00 | 15 min</div>
                  </div>

                  <hr></hr>

                  <div className="bookappoinmentbody">
                    <h5>Overview:</h5>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled
                    </p>

                    <a className="btn btn-primary max-width mt-2 hvr-shutter-out-horizontal">
                      make an appointment
                    </a>
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

export default BookAppoinment;
