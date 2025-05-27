import React, { useState } from "react";
import BmiBanner from "../../../../../../public/assets/img/BmiCalulatorBanner.png";
import Form from "react-bootstrap/Form";
import wightImg1 from "../../../../../../public/assets/img/weightInfoimg1.png";
import wightImg2 from "../../../../../../public/assets/img/weightInfoimg2.png";
import wightImg3 from "../../../../../../public/assets/img/weightInfoimg3.png";
import wightImg4 from "../../../../../../public/assets/img/weightInfoimg4.png";
function BmiCalculator() {
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);
  const calculateBMI = () => {
    let weightKg = parseFloat(weight);
    if (weightUnit === "lbs") {
      weightKg = weightKg / 2.20462;
    }

    let heightM = parseFloat(height);
    if (heightUnit === "cm") {
      heightM = heightM / 100;
    } else if (heightUnit === "inch") {
      heightM = heightM * 0.0254;
    }

  if (!weightKg || !heightM || heightM <= 0 || weightKg <= 0) {
    setError("Please enter valid height and weight values.");
    return;
  }

    const bmiValue = weightKg / (heightM * heightM);
    setBmi(bmiValue.toFixed(1));

    if (bmiValue < 18.5) {
      setCategory("Underweight");
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      setCategory("Normal");
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      setCategory("Overweight");
    } else {
      setCategory("Obese");
    }
  };

  const getCategoryColorClass = (category) => {
    switch (category) {
      case "Underweight":
        return "bmi-underweight";
      case "Normal":
        return "bmi-normal";
      case "Overweight":
        return "bmi-overweight";
      case "Obese":
        return "bmi-obese";
      default:
        return "";
    }
  };

  return (
    <>
      <section className="innerbanner">
        <figure>
          <img src={BmiBanner} />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>BMI Calculator</h2>
            <p>
              Your Journey to Better Health Begins with One Simple Number – Know
              Your BMI, Know Yourself.
            </p>
          </div>
        </div>
      </section>
      <section className="InnnerPage bmiCalculator InnerSpace">
        <div className="container">
          <div className="InnerPageTitle">
            <h4>What is BMI?</h4>
            <p>
              BMI stands for Body Mass Index — it’s a simple calculation used to
              estimate whether a person has a healthy body weight for their
              height.
            </p>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="bmiCalculatorBg">
                <div className="calculateHead">
                  <h4>Calculate your BMI by putting values below</h4>
                </div>
                <div className="calculatebody">
                  <div className="calculaField mb-3">
                    <label>Height:</label>
                    <div className="calculainSelect">
                      <input
                        className="form-control"
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="Enter value"
                         min="1"
                      />
                      <Form.Select
                        value={heightUnit}
                        onChange={(e) => setHeightUnit(e.target.value)}
                      >
                        <option value="cm">cm</option>
                        <option value="inch">inch</option>
                      </Form.Select>
                    </div>
                  </div>

                  <div className="calculaField mb-3">
                    <label>Weight:</label>
                    <div className="calculainSelect">
                      <input
                        className="form-control"
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="Enter value"
                         min="1"
                      />
                      <Form.Select
                        value={weightUnit}
                        onChange={(e) => setWeightUnit(e.target.value)}
                      >
                        <option value="kg">kg</option>
                        <option value="lbs">lbs</option>
                      </Form.Select>
                    </div>
                  </div>

                </div>
                
                  <div className="calculateButton text-center mt-3">
                   { error&&<p style={{color:"orange"}}>{error}</p>}
                    <button
                      className="btn btn-primary sm-btn hvr-shutter-out-horizontal"
                      type="button"
                      onClick={calculateBMI}
                    >
                      Calculate your BMI
                    </button>
                  </div>
              </div>
            </div>

            <div className="col-md-5 ms-auto">
              <div className="calulaterResult">
                <div className="calulaterResultHead">
                  <h3>Result</h3>
                </div>

                <div className="calulaterResultBody">
                  <ul className="wightList">
                    <li>
                      <figure>
                        <img src={wightImg1} />
                      </figure>
                      <h4>&#60; 18.5</h4>
                    </li>
                    <li>
                      <figure>
                        <img src={wightImg2} />
                      </figure>
                      <h4>18.5 - 24.9</h4>
                    </li>
                    <li>
                      <figure>
                        <img src={wightImg3} />
                      </figure>
                      <h4>25.0 - 29.9</h4>
                    </li>
                    <li>
                      <figure>
                        <img src={wightImg4} />
                      </figure>
                      <h4>&ge; 30.0</h4>
                    </li>
                  </ul>

                  <div className="yourBmi">
                    <span className="d-inline-block">Your BMI:</span>
                    {bmi ? (
                      <span className={getCategoryColorClass(category)}>
                        {bmi} <b>({category})</b>
                      </span>
                    ) : (
                      <span className="dash-class"> -- </span>
                    )}
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

export default BmiCalculator;
