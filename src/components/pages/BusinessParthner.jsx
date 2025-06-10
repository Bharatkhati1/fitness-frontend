import React from "react";
import Businesspartnersbg from "../../../public/assets/img/Businesspartnersbg.png";
import Header from "../../components/authorized/UserUI/Header/Header.jsx";
import Footer from "../../components/authorized/UserUI/Footer/Footer.jsx";

import centeruserimg from "../../../public/assets/img/centeruserimg.png";

import whyparthnericon1 from "../../../public/assets/img/whyparthnericon1.png";
import whyparthnericon2 from "../../../public/assets/img/whyparthnericon2.png";
import whyparthnericon3 from "../../../public/assets/img/whyparthnericon3.png";
import whyparthnericon4 from "../../../public/assets/img/whyparthnericon4.png";
import whyparthnericon5 from "../../../public/assets/img/whyparthnericon5.png";
import whyparthnericon6 from "../../../public/assets/img/whyparthnericon6.png";

function BusinessParthner() {
  return (
    <>
      <Header />
      <section className="innerbanner">
        <figure>
          <img src={Businesspartnersbg} />
        </figure>

        <div className="zigzagtextcontent">
          <div className="zigzagtext text-start">
            <h3>joining hands</h3>
          </div>

          <div className="zigzagtext text-center">
            <h3>expanding wings</h3>
          </div>

          <div className="zigzagtext text-end">
            <h3>serving mankind</h3>
          </div>
        </div>
      </section>

      <div className="whypartner">
        <div className="container">
          <div class="PageTitle text-center">
            <h2>why partner with us ?</h2>
            <p>Collaborating for better tomorrow</p>
          </div>

          <div className="row align-items-center">
            <div className="col">
              <ul className="whyparthnerlist">
                <li>
                  <figcaption>
                    <h4>Integrated Wellness Collaboration</h4>
                    <p>
                      Partner to offer preventive health programs, fitness
                      assessments, and early diagnosis solutions through a
                      connected digital health ecosystem.
                    </p>
                  </figcaption>

                  <figure>
                    <img src={whyparthnericon1}></img>
                  </figure>
                </li>

                <li>
                  <figcaption>
                    <h4>Employee Fitness & Lifestyle Programs</h4>
                    <p>
                      Deliver measurable workplace wellness through fitness
                      challenges, health screenings, and nutrition
                      counseling—boosting productivity and reducing absenteeism.
                    </p>
                  </figcaption>

                  <figure>
                    <img src={whyparthnericon2}></img>
                  </figure>
                </li>

                <li>
                  <figcaption>
                    <h4>Youth Health Empowerment Initiatives</h4>
                    <p>
                      Collaborate on building active, aware communities by
                      promoting fitness education, personalized fitness plans,
                      and health camps in academic institutions.
                    </p>
                  </figcaption>

                  <figure>
                    <img src={whyparthnericon3}></img>
                  </figure>
                </li>
              </ul>
            </div>

            <div className="col-md-4 text-center">
              <figure>
                <img src={centeruserimg}></img>
              </figure>
            </div>

            <div className="col">
              <ul className="whyparthnerlist whyp-odd">
                <li>
                  <figcaption>
                    <h4>Healthy Eating Integration</h4>
                    <p>
                      Showcase wholesome and calorie-conscious meals through our
                      platform as part of curated fitness-based diet plans and
                      lifestyle goals.
                    </p>
                  </figcaption>

                  <figure>
                    <img src={whyparthnericon4}></img>
                  </figure>
                </li>

                <li>
                  <figcaption>
                    <h4>Holistic Health Engagement</h4>
                    <p>
                      Deliver mental and physical wellness through yoga
                      sessions, mindfulness programs, and lifestyle coaching for
                      our fitness-first community.
                    </p>
                  </figcaption>

                  <figure>
                    <img src={whyparthnericon5}></img>
                  </figure>
                </li>

                <li>
                  <figcaption>
                    <h4>Active Lifestyle Merchandise</h4>
                    <p>
                      Promote fitness gear, activewear, and accessories to
                      health-conscious users, integrating your brand into daily
                      workouts and events.
                    </p>
                  </figcaption>

                  <figure>
                    <img src={whyparthnericon6}></img>
                  </figure>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="partnerssec">

        <div className="container">

            <div className="medicalpartners">


                   <div class="PageTitle text-center"><h2>medical partners</h2></div>
                


            </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default BusinessParthner;
