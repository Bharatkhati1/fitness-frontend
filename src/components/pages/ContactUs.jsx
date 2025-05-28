import React from "react";
import Header from "../../components/authorized/UserUI/Header/Header.jsx";
import Footer from "../../components/authorized/UserUI/Footer/Footer.jsx";
import gIcon1 from "../../../public/assets/img/gIcon1.svg";
import gIcon2 from "../../../public/assets/img/gIcon2.svg";
import gIcon3 from "../../../public/assets/img/gIcon3.svg";
import Ginstaicon from "../../../public/assets/img/Ginstaicon.png";
import Gtweeter from "../../../public/assets/img/Gtweeter.png";
import cyoutubeIcon from "../../../public/assets/img/cyoutubeIcon.png";
import gettouch from "../../../public/assets/img/gettouch.png";
function ContactUs() {
return (
<>
<Header />
<section className="InnerpageSpace bgpettern">
   <div className="container">
      <div class="InnerPageTitle ">
         <h4>contact us</h4>
         <p>
            Reach out to us via email, phone, or social media for any
            inquiries or support you may need.
         </p>
      </div>
      <div className="contactinfo">
         <div className="row">
            <div className="col-md-4">
               <div className="contactinfobox">
                  <figure>
                     <img src={gIcon1} />
                  </figure>
                  <figcaption>
                     <h5>PHONE</h5>
                     <div className="textlink d-flex justify-content-center">
                        <a href="tel:918839036035">(+91) 8839036035</a> &nbsp; .
                        <a href="tel:919891775250">(+91) 9891775250</a>
                     </div>
                  </figcaption>
               </div>
            </div>
            <div className="col-md-4">
               <div className="contactinfobox">
                  <figure>
                     <img src={gIcon2} />
                  </figure>
                  <figcaption>
                     <h5>EMAIL ADDRESS</h5>
                     <div className="textlink d-flex justify-content-center">
                        <a href="mailto:info@dailyfitness.ai">
                        info@dailyfitness.ai
                        </a>
                     </div>
                  </figcaption>
               </div>
            </div>
            <div className="col-md-4">
               <div className="contactinfobox">
                  <figure>
                     <img src={gIcon3} />
                  </figure>
                  <figcaption>
                     <h5>SOCIAL MEDIA</h5>
                     <ul className="userslink d-flex justify-content-center">
                        <li>
                           <a>
                           <img src={Ginstaicon} />
                           </a>
                        </li>
                        <li>
                           <a>
                           <img src={Gtweeter} />
                           </a>
                        </li>
                        <li>
                           <a>
                           <img src={cyoutubeIcon} />
                           </a>
                        </li>
                     </ul>
                  </figcaption>
               </div>
            </div>
         </div>
      </div>
      <div className="getintouchinner">
         <div className="row align-items-center">
            <div className="col-md-6 getintouchinnerleft">
               <h4>Get in Touch with Us</h4>
               <p>We'd love to hear from you! Contact us anytime.</p>
               <figure>
                  <img src={gettouch}></img>
               </figure>
            </div>
            <div className="col-md-6">
               <div className="row GetIntouchinnerright">
                  <div className="col-md-6 mb-3">
                     <label>First Name*</label>
                     <input
                        placeholder="Enter your first name "
                        className="form-control greyin"
                        type="text"
                        />
                  </div>
                  <div className="col-md-6 mb-3"></div>
                  <div className="col-md-6 mb-3">
                     <label>Email ID*</label>
                     <input
                        placeholder="Enter your email id"
                        className="form-control greyin"
                        type="text"
                        />
                  </div>
                  <div className="col-md-6 mb-3"></div>
                  <div className="col-md-6 mb-3">
                     <label>Contact Number*</label>
                     <div class="contactInput">
                        <span className="greyin">+91</span>
                        <input
                           placeholder="Enter your contact number"
                           className="form-control greyin"
                           type="text"
                           />
                     </div>
                  </div>
                  <div className="col-md-6 mb-3"></div>
                  <div className="col-md-12 checklistBox mb-2">
                     <label class="mb-3">You want to consult for :</label>
                     <ul class="form-checkList d-flex">
                        <li>
                           <div className="form-check">
                              <input
                                 className="form-check-input "
                                 type="checkbox"
                                 value=""
                                 id="checkChecked"
                                 />
                              <label
                                 className="form-check-label"
                                 for="checkChecked"
                                 >
                              FITNESS
                              </label>
                           </div>
                        </li>
                        <li>
                           <div className="form-check">
                              <input
                                 className="form-check-input"
                                 type="checkbox"
                                 value=""
                                 id="checkChecked"
                                 />
                              <label
                                 className="form-check-label"
                                 for="checkChecked"
                                 >
                              DISEASE MANAGEMENT
                              </label>
                           </div>
                        </li>
                        <li>
                           <div className="form-check">
                              <input
                                 className="form-check-input"
                                 type="checkbox"
                                 value=""
                                 id="checkChecked"
                                 />
                              <label class="form-check-label" for="checkChecked">
                              DOCTOR
                              </label>
                           </div>
                        </li>
                        <li>
                           <div className="form-check">
                              <input
                                 className="form-check-input"
                                 type="checkbox"
                                 value=""
                                 id="checkChecked"
                                 />
                              <label
                                 className="form-check-label"
                                 for="checkChecked"
                                 >
                              SEXUAL HEALTH
                              </label>
                           </div>
                        </li>
                        <li>
                           <div className="form-check">
                              <input
                                 className="form-check-input"
                                 type="checkbox"
                                 value=""
                                 id="checkChecked"
                                 />
                              <label
                                 className="form-check-label"
                                 for="checkChecked"
                                 >
                              MENTAL HEALTH
                              </label>
                           </div>
                        </li>
                        <li>
                           <div className="form-check">
                              <input
                                 className="form-check-input"
                                 type="checkbox"
                                 value=""
                                 id="checkChecked"
                                 />
                              <label
                                 className="form-check-label"
                                 for="checkChecked"
                                 >
                              INJURY/PAIN
                              </label>
                           </div>
                        </li>
                        <li>
                           <div className="form-check">
                              <input
                                 className="form-check-input"
                                 type="checkbox"
                                 value=""
                                 id="checkChecked"
                                 />
                              <label
                                 className="form-check-label"
                                 for="checkChecked"
                                 >
                              ALTERNATIVE MEDICINE
                              </label>
                           </div>
                        </li>
                        <li>
                           <div className="form-check">
                              <input
                                 className="form-check-input"
                                 type="checkbox"
                                 value=""
                                 id="checkChecked"
                                 />
                              <label class="form-check-label" for="checkChecked">
                              OTHERS
                              </label>
                           </div>
                        </li>
                     </ul>
                  </div>
                  <div className="col-md-12">
                     <label>Message</label>
                     <textarea
                        className="form-control greyin"
                        placeholder="Type your message here"
                        ></textarea>
                  </div>
                  <div className="col-md-12 text-center">
                     <button class="btn btn-primary mt-3 max-btn hvr-shutter-out-horizontal">
                     submit your inquiry
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</section>
<section className="JoinourhealthMain mb-4">
   <div className="container">
      <div className="Joinourhealth">
         <div className="JoinourhealthContent">
            <h3>join our health community</h3>
            <p>
               Join our WhatsApp health community today! Connect with
               like-minded individuals and get valuable health insights and
               support, free of cost.
            </p>
            <a className="btn btn-primary hvr-shutter-out-horizontal">
            join our free community
            </a>
         </div>
      </div>
   </div>
</section>
<Footer />
</>
);
}
export default ContactUs;