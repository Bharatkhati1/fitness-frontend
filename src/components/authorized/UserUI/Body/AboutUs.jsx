import React, { useEffect, useState } from "react";
import FitIcon from "../../../../../public/assets/img/FitIcon.png";
import valueIcon from "../../../../../public/assets/img/valueIcon.png";
import shapeabout from "../../../../../public/assets/img/shapeabout.png";
import JoinBg from "../../../../../public/assets/img/JoinBg.png";
import ourVisionIMG from "../../../../../public/assets/img/ourVisionIMG.png";
import OurMissionimg from "../../../../../public/assets/img/OurMissionimg.png";
import vIcon1 from "../../../../../public/assets/img/v-Icon-1.png";
import vIcon2 from "../../../../../public/assets/img/v-Icon-2.png";
import vIcon3 from "../../../../../public/assets/img/v-Icon-3.png";
import vIcon4 from "../../../../../public/assets/img/v-Icon-4.png";
import vIcon5 from "../../../../../public/assets/img/v-Icon-5.png";
import vIcon6 from "../../../../../public/assets/img/v-Icon-6.png";
import MIcon1 from "../../../../../public/assets/img/m-Icon-1.png";
import MIcon2 from "../../../../../public/assets/img/m-Icon-2.png";
import MIcon3 from "../../../../../public/assets/img/m-Icon-3.png";
import MIcon4 from "../../../../../public/assets/img/m-Icon-4.png";
import MeetsTeamsImG1 from "../../../../../public/assets/img/MeetsTeamsImG1.png";
import MeetsTeamsImG2 from "../../../../../public/assets/img/MeetsTeamsImG2.png";
import MeetsTeamsImG3 from "../../../../../public/assets/img/MeetsTeamsImG3.png";
import MeetsTeamsImG4 from "../../../../../public/assets/img/MeetsTeamsImG4.png";
import MeetsTeamsImG5 from "../../../../../public/assets/img/MeetsTeamsImG5.png";
import MeetsTeamsImG6 from "../../../../../public/assets/img/MeetsTeamsImG6.png";
import CofoundersIMG from "../../../../../public/assets/img/CofoundersIMG.png";
import CofoundersIMG2 from "../../../../../public/assets/img/CofoundersIMG2.png";
import trustedImg from "../../../../../public/assets/img/trustedImg.svg";
import { toast } from "react-toastify";
import { webAxios } from "../../../../utils/Api/userAxios";
import userApiRoutes from "../../../../utils/Api/Routes/userApiRoutes";
import { useLocation } from "react-router-dom";
import JoinCommunity from "./Modals/JoinCommunity";
function AboutUs() {
  const location = useLocation();
  const [team, setTeam] = useState([]);
  const [open, setOpen] = useState(false)

  const fetchAllTeam = async () => {
    try {
      const response = await webAxios.get(userApiRoutes.get_teams);
      setTeam(response.data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  useEffect(() => {
    fetchAllTeam();
  }, []);
  return (
    <>
    <JoinCommunity setOpen={setOpen} open={open}/>
      <div className="AboutBanner innerSpace">
        <span className="BannerShape">
          <img src={shapeabout} />
        </span>
        <div className="container">
          <div className="AboutBannerContent">
            <span>about us</span>
            <h3>WHO ARE WE ?</h3>
          </div>

          <ul className="whoareList">
            <li>
              <figure>
                <img src={FitIcon} />
              </figure>
              <figcaption>
                <h3>FITPRENEURS</h3>
                <p>
                  A group of visionary individuals who aim at innovating the
                  approach to human health and fitness. From workouts to
                  nutrition and from mental health to modern and alternative
                  medicines, thedailyfitness.in is your “online health-city”
                </p>
              </figcaption>
            </li>
            <li>
              <figure>
                <img src={valueIcon} />
              </figure>
              <figcaption>
                <h3>CORE VALUES</h3>
                <p>
                  Integrity, Compassion and Scientific temper are the core
                  values that drive the conduct at thedailyfitness.in. Be it our
                  own organisation or the relations with our clients, our values
                  are the very essence of our service.
                </p>
              </figcaption>
            </li>
          </ul>
        </div>
      </div>

      <div className="FitnessJourney">
        <div className="container">
          <div className="FitnessJourneyInner">
            <figure>
              <img src={JoinBg} />
            </figure>

            <figcaption className="FitnessJourneyContent">
              <h4>empower your fitness journey with us</h4>

              <a onClick={()=> setOpen(true)} className="btn btn-primary hvr-shutter-out-horizontal">
                join now
              </a>

              <h5 className="JoinSubTitle">
                power up your today for a better tomorrow
              </h5>

              <a className="link-text">www.dailyfitness.ai</a>
            </figcaption>
          </div>
        </div>
      </div>

      <div className="OurVisionMission mb-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="OurVisionMissionBg">
                <div className="OurVisionMissionTitle">
                  <h3>OUR VISION</h3>
                  <p>
                    Through these pillars, thedailyfitness.in aims to become a
                    trusted resource for effective and sustainable health and
                    fitness solutions
                  </p>
                </div>

                <div className="OurMVBox">
                  <figure>
                    <img src={ourVisionIMG} />
                  </figure>

                  <div className="OurMVBGcontent">Vision</div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <ul className="VisionMissionList">
                <li>
                  <figure>
                    <img src={vIcon1}></img>
                  </figure>
                  <div className="VisionMissioTitle">
                    <b>Empower Individuals:</b> To provide users with the tools
                    and resources needed to take charge of their fitness and
                    health journeys
                  </div>
                </li>

                <li>
                  <figure>
                    <img src={vIcon2}></img>
                  </figure>
                  <div className="VisionMissioTitle">
                    <b>Comprehensive Content: </b>Offer a diverse range of
                    articles, videos, and expert advice on fitness routines,
                    nutrition, and mental wellness.
                  </div>
                </li>
                <li>
                  <figure>
                    <img src={vIcon3}></img>
                  </figure>
                  <div className="VisionMissioTitle">
                    <b>Community Building: </b>Foster an inclusive online
                    community where users can share experiences, support each
                    other, and celebrate achievements.
                  </div>
                </li>

                <li>
                  <figure>
                    <img src={vIcon4}></img>
                  </figure>
                  <div className="VisionMissioTitle">
                    <b>Personalization: </b>Utilize technology to deliver
                    personalized fitness plans and wellness tips tailored to
                    individual users’ goals and preferences
                  </div>
                </li>

                <li>
                  <figure>
                    <img src={vIcon5}></img>
                  </figure>
                  <div className="VisionMissioTitle">
                    <b>Expert Collaboration: </b>Partner with fitness and
                    healthcare professionals to ensure content credibility and
                    provide professional insights.
                  </div>
                </li>

                <li>
                  <figure>
                    <img src={vIcon6}></img>
                  </figure>
                  <div className="VisionMissioTitle">
                    <b>Accessibility: </b>Make fitness and health knowledge
                    available to everyone, regardless of background or fitness
                    level, through an easy-to-navigate platform.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="OurVisionMission OurVisionMissionOdd" >
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="OurVisionMissionBg">
                <div className="OurVisionMissionTitle">
                  <h3>OUR MISSION</h3>
                  <p>
                    Join us as we transform the way you approach fitness and
                    health, making it enjoyable, sustainable, and attainable for
                    all
                  </p>
                </div>

                <div className="OurMVBox">
                  <figure>
                    <img src={OurMissionimg} />
                  </figure>

                  <div className="OurMVBGcontent">Mission</div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <ul className="VisionMissionList">
                <li>
                  <figure>
                    <img src={MIcon1}></img>
                  </figure>
                  <div className="VisionMissioTitle">
                    At thedailyfitness.in, our mission is to empower individuals
                    on their fitness and health journeys by providing
                    accessible, high-quality resources and tools.
                  </div>
                </li>

                <li>
                  <figure>
                    <img src={MIcon2}></img>
                  </figure>
                  <div className="VisionMissioTitle">
                    We strive to create a supportive online community where
                    users can find personalized workout plans, nutritional
                    guidance, and wellness tips tailored to their unique goals.
                  </div>
                </li>
                <li>
                  <figure>
                    <img src={MIcon3}></img>
                  </figure>
                  <div className="VisionMissioTitle">
                    Our commitment to fostering a holistic approach to health
                    prioritizes not just physical fitness but also mental
                    well-being.
                  </div>
                </li>

                <li>
                  <figure>
                    <img src={MIcon4}></img>
                  </figure>
                  <div className="VisionMissioTitle">
                    We believe that everyone deserves the opportunity to lead a
                    healthier life, and through engaging content, expert advice,
                    and interactive features, we aim to inspire, motivate, and
                    educate our users every step of the way.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    <section className="OurTEAM">
        <div className="OurTEAMhead text-center" id="MeetOurFamily">
          <span>our team</span>
          <h2>meet our dedicated team</h2>
          <p>
            We proudly introduce our team members through photos and profiles,
            showcasing their unique skills and contributions to our company’s
            success.
          </p>
        </div>
        <div className="container">
          {team?.map((member) => (
            <div className="row OurTeamsrows">
              <div className="col-md-4 OurTeamsrowsL">
                <figure>
                  <img crossOrigin="anonymous" src={member.image_url} />
                </figure>
              </div>

              <div className="col-md-8 OurTeamsrowsR">
                <h4>{member.name}</h4>
                <span>{member.position}</span>
                <p>{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="MoreProfessional">
        <div className="container">
          <p>
            and 150+ more 
            <span>
              <img src={trustedImg} />
            </span>
            professionals.
          </p>
        </div>
      </section>

      <section className="messageCofounders">
        <div className="container">
          <div className="messageCofoundersTitle">
            <h2>message from co-founders</h2>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="messageCofoundersBg">
                <figure>
                  <img src={CofoundersIMG} />
                </figure>

                <figcaption>
                  <h4>SHIVAM SINGH</h4>
                  <p>
                    Dedication and Honesty towards our client reflects our true
                    culture of excellence
                  </p>
                </figcaption>
              </div>
            </div>
            <div className="col-md-6">
              <div className="messageCofoundersBg">
                <figure>
                  <img src={CofoundersIMG2} />
                </figure>

                <figcaption>
                  <h4>RAHUL ARORA</h4>
                  <p>
                    I love how each member's profile showcases their unique
                    skills and contributions to the company.
                  </p>
                </figcaption>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutUs;
