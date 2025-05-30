import React from "react";
import servicebanner from "../../../public/assets/img/servicebanner.png";
import Header from "../../components/authorized/UserUI/Header/Header.jsx";
import Footer from "../../components/authorized/UserUI/Footer/Footer.jsx";
import smIMG1 from "../../../public/assets/img/smIMG1.png";
import smIMG2 from "../../../public/assets/img/smIMG2.png";
import smIMG3 from "../../../public/assets/img/smIMG3.png";
import smIMG4 from "../../../public/assets/img/smIMG4.png";
import smIMG5 from "../../../public/assets/img/smIMG5.png";
import smIMG6 from "../../../public/assets/img/smIMG6.png";

function ServiceDetails() {
  return (
    <>
      <section className="innerbanner">
        <figure>
          <img src={servicebanner} />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>disease management</h2>
            <p>
              Innovative and sustainable approach towards solution of metabolic
              diseases
            </p>
          </div>
        </div>
      </section>

      <div className="sectionSpace servicedetail">
        <div className="container">
          <p className="text-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled.Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard
            dummy text ever since the 1500s, when an unknown printer took a
            galley of type and scrambled.Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled.Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled.
          </p>

          <div className="row servicedetaillisting">
            <div className="col-md-6">
              <figure>
                <img src={smIMG1} />
              </figure>

              <figcaption>
                <h3>Diabetes</h3>
                <p>
                  Type 2 diabetes is a condition that happens because of a
                  problem in the way the body regulates and uses sugar as a
                  fuel.This long-term condition results in too much sugar
                  circulating in the blood. Eventually, high blood sugar levels
                  can lead to disorders of the circulatory, nervous and immune
                  systems.
                </p>

                <div className="btn-group-box">
                  <a className="btn btn-primary hvr-shutter-out-horizontal">
                    smart health package
                  </a>
                  <a className="btn btn-primary hvr-shutter-out-horizontal">
                    book a consultation
                  </a>
                  <a className="btn btn-primary hvr-shutter-out-horizontal">
                    talk to a fitness expert
                  </a>
                </div>
              </figcaption>
            </div>

            <div className="col-md-6">
              <figure>
                <img src={smIMG2} />
              </figure>

              <figcaption>
                <h3>THYROIDISM</h3>
                <p>
                  Hypothyroidism is when your thyroid gland doesn’t make and
                  release enough hormone into your bloodstream.Hyperthyroidism,
                  also called overactive thyroid, happens when your thyroid
                  makes and releases high levels of thyroid hormone, causing
                  symptoms like rapid heart rate, weight loss, increased
                  appetite and anxiety.
                </p>

                <div className="btn-group-box">
                  <a className="btn btn-primary hvr-shutter-out-horizontal">
                    smart health package
                  </a>
                  <a className="btn btn-primary hvr-shutter-out-horizontal">
                    book a consultation
                  </a>
                  <a className="btn btn-primary hvr-shutter-out-horizontal">
                    talk to a fitness expert
                  </a>
                </div>
              </figcaption>
            </div>
            <div className="col-md-6">
              <figure>
                <img src={smIMG3} />
              </figure>

              <figcaption>
                <h3>HYPERTENSION</h3>
                <p>
                  High blood pressure is a common condition that affects the
                  body's arteries. It's also called hypertension. If you have
                  high blood pressure, the force of the blood pushing against
                  the artery walls is consistently too high. The heart has to
                  work harder to pump blood.
                </p>

                <div className="btn-group-box">
                  <a className="btn btn-primary hvr-shutter-out-horizontal">
                    smart health package
                  </a>
                  <a className="btn btn-primary hvr-shutter-out-horizontal">
                    book a consultation
                  </a>
                  <a className="btn btn-primary hvr-shutter-out-horizontal">
                    talk to a fitness expert
                  </a>
                </div>
              </figcaption>
            </div>
            <div className="col-md-6">
              <figure>
                <img src={smIMG4} />
              </figure>

              <figcaption>
                <h3>PCOD</h3>
                <p>
                  PCOD (Polycystic Ovarian Disease) is a medical condition in
                  women, where the ovaries produce multiple immature eggs which,
                  over time, become cysts on the ovaries.
                </p>

                <div className="btn-group-box">
                  <a className="btn btn-primary hvr-shutter-out-horizontal">
                    smart health package
                  </a>
                  <a className="btn btn-primary hvr-shutter-out-horizontal">
                    book a consultation
                  </a>
                  <a className="btn btn-primary hvr-shutter-out-horizontal">
                    talk to a fitness expert
                  </a>
                </div>
              </figcaption>
            </div>
            <div className="col-md-6">
              <figure>
                <img src={smIMG5} />
              </figure>

              <figcaption>
                <h3>FATTY LIVER DISEASE</h3>
                <p>
                  Fatty liver disease is a condition in which fat builds up in
                  your liver.While a small amount of fat in the liver is normal,
                  when fat makes up more than 5% to 10% of the liver's weight,
                  it is classified as fatty liver.
                </p>

                <div className="btn-group-box">
                  <a className="btn btn-primary hvr-shutter-out-horizontal">
                    smart health package
                  </a>
                  <a className="btn btn-primary hvr-shutter-out-horizontal">
                    book a consultation
                  </a>
                  <a className="btn btn-primary hvr-shutter-out-horizontal">
                    talk to a fitness expert
                  </a>
                </div>
              </figcaption>
            </div>
            <div className="col-md-6">
              <figure>
                <img src={smIMG6} />
              </figure>

              <figcaption>
                <h3>Metabolic Disorder</h3>
                <p>
                  Sleep apnea is a potentially serious sleep disorder in which
                  breathing repeatedly stops and starts. If you snore loudly and
                  feel tired even after a full night's sleep, you might have
                  sleep apnea.
                </p>

                <div className="btn-group-box">
                  <a className="btn btn-primary hvr-shutter-out-horizontal">
                    smart health package
                  </a>
                  <a className="btn btn-primary hvr-shutter-out-horizontal">
                    book a consultation
                  </a>
                  <a className="btn btn-primary hvr-shutter-out-horizontal  ">
                    talk to a fitness expert
                  </a>
                </div>
              </figcaption>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceDetails;
