import React from "react";
import iconImg1 from "../../../public/assets/img/iconimg1.png";
import iconImg2 from "../../../public/assets/img/iconimg2.png";
import iconImg3 from "../../../public/assets/img/iconimg3.png";

import upcomigeventsbg from "../../../public/assets/img/upcomigeventsbg.png";
import { useParams } from "react-router-dom";

function UpcomigDetails() {
  const { slug } = useParams();
  console.log(slug)
  return (
    <>
      <section className="BlogDeatils">
        <figure>
          <img src={upcomigeventsbg} />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>Nutrition Masterclass with Dr. Anjali</h2>
          </div>
        </div>
      </section>

      <div className="topcontentbox text-center">
        <div className="container">
          <h4>Fuel Your Body Right - Eat Smart, Live Strong</h4>
          <ul className="topcontentboxlist">
            <li>
              <img src={iconImg1}></img>
              <span>Saturday, 21st June 2025</span>
            </li>
            <li>
              <img src={iconImg2}></img>
              <span>11:00 AM – 1:00 PM IST</span>
            </li>
            <li>
              <img src={iconImg3}></img>
              <span>Online (Live on Zoom)</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="">
        <div className="container">
        ..</div></div>
    </>
  );
}

export default UpcomigDetails;
