import React from "react";
import BmiCalculatore from "./BmiCalculatore";
import CaloriesCalculator from "./CaloriesCalculator";
import IdealWightCalculatore from "./IdealWightCalculatore";
import FatLossCalculatore from "./FatLossCalculatore";
import "./Tools.scss"
const index = () => {
  return (
    <>
      <ul class="nav nav-pills nav-justified p-1">
      <li class="nav-item">
          <a
            href="#FatLossCalc"
            data-bs-toggle="tab"
            aria-expanded="false"
            class="nav-link active"
          >
            <span class="d-block d-sm-none">
              <i class="bx bx-envelope"></i>
            </span>
            <span class="d-none d-sm-block">Fat Loss Calculator</span>
          </a>
        </li>
        <li class="nav-item">
          <a
            href="#BMIcalculatore"
            data-bs-toggle="tab"
            aria-expanded="false"
            class="nav-link"
          >
            <span class="d-block d-sm-none">
              <i class="bx bx-home"></i>
            </span>
            <span class="d-none d-sm-block">BMI Calculator</span>
          </a>
        </li>
        <li class="nav-item">
          <a
            href="#CaloriesCalculatore"
            data-bs-toggle="tab"
            aria-expanded="true"
            class="nav-link"
          >
            <span class="d-block d-sm-none">
              <i class="bx bx-user"></i>
            </span>
            <span class="d-none d-sm-block"> Calorie Calculator</span>
          </a>
        </li>
        <li class="nav-item">
          <a
            href="#IdealWeightCal"
            data-bs-toggle="tab"
            aria-expanded="false"
            class="nav-link"
          >
            <span class="d-block d-sm-none">
              <i class="bx bx-envelope"></i>
            </span>
            <span class="d-none d-sm-block"> Ideal Weight Calculator</span>
          </a>
        </li>
    
      </ul>
      <div class="tab-content pt-2 text-muted">
        <div class="tab-pane" id="BMIcalculatore">
          <BmiCalculatore/>
        </div>
        <div class="tab-pane" id="CaloriesCalculatore">
          <CaloriesCalculator/>
        </div>
        <div class="tab-pane" id="IdealWeightCal">
          <IdealWightCalculatore/>
        </div>
        <div class="tab-pane show active" id="FatLossCalc">
          <FatLossCalculatore/>
        </div>
      </div>
    </>
  );
};

export default index;
