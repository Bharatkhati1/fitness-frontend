import React, { useState } from "react";
import IdealBanner from "../../../../../../public/assets/img/IdealBanner.png";
import Form from "react-bootstrap/Form";
import Diet2 from "../../../../../../public/assets/img/Diet2.png";

function Idealweight() {
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [gender, setGender] = useState("");
  const [bodyFrame, setBodyFrame] = useState("");
  const [result, setResult] = useState(null);

  const calculateIdealWeight = () => {
    if (!height || !gender || !bodyFrame) {
      setResult({ error: "Please provide all required inputs." });
      return;
    }

    let heightInches = parseFloat(height);
    if (isNaN(heightInches) || heightInches <= 0) {
      setResult({ error: "Please enter a valid height." });
      return;
    }

    // Convert height to inches if in cm
    if (heightUnit === "cm") {
      heightInches = heightInches / 2.54;
    }

    // Use minimum height of 60 inches for formula base
    const baseHeight = Math.max(60, heightInches);

    let idealWeight;
    if (gender === "male") {
      idealWeight = 48 + (baseHeight - 60) * 2.7;
    } else {
      idealWeight = 45.5 + (baseHeight - 60) * 2.2;
    }

    // Adjust for body frame
    if (bodyFrame === "small") {
      idealWeight *= 0.9;
    } else if (bodyFrame === "large") {
      idealWeight *= 1.1;
    }

    const lowerRange = idealWeight * 0.95;
    const upperRange = idealWeight * 1.05;

    setResult({
      idealWeight: idealWeight.toFixed(1),
      range: `${lowerRange.toFixed(1)} - ${upperRange.toFixed(1)} kg`,
    });
  };

  return (
    <>
      <section className="innerbanner">
        <figure>
          <img src={IdealBanner} alt="Ideal Banner" />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>ideal weight Calculator</h2>
            <p>Discover the Weight That’s Right for You.</p>
          </div>
        </div>
      </section>

      <section className="InnnerPage bmiCalculator InnerSpace">
        <div className="container">
          <div className="InnerPageTitle">
            <h4>what is ideal weight ? </h4>
            <p>
              Ideal weight is the estimated body weight range that is considered healthiest for an individual based on factors like height, age, gender, and body composition.
            </p>
          </div>

          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="bmiCalculatorBg">
                <div className="calculateHead">
                  <h4>Calculate your Ideal Weight by putting values below</h4>
                </div>

                <div className="calculatebody">
                  <div className="calculaField mb-3">
                    <label>Height:</label>
                    <div className="calculainSelect">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Enter value"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
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
                    <label>Gender:</label>
                    <div className="radioListBox">
                      <ul className="radioList d-flex">
                        <li>
                          <input
                            type="radio"
                            id="male"
                            name="gender"
                            checked={gender === "male"}
                            onChange={() => setGender("male")}
                          />
                          <label htmlFor="male">Male</label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            id="female"
                            name="gender"
                            checked={gender === "female"}
                            onChange={() => setGender("female")}
                          />
                          <label htmlFor="female">Female</label>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="calculaField mb-3">
                    <label>Body Frame:</label>
                    <div className="FieldIn">
                      <Form.Select
                        value={bodyFrame}
                        onChange={(e) => setBodyFrame(e.target.value)}
                      >
                        <option value="">Please select one</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </Form.Select>
                    </div>
                  </div>

                </div>
                
                  <div className="calculateButton text-center mt-3">
                    <button
                      className="btn btn-primary sm-btn hvr-shutter-out-horizontal"
                      onClick={calculateIdealWeight}
                    >
                      Calculate your ideal weight
                    </button>
                  </div>
              </div>
            </div>

           { result &&  <div className="col-md-6 ps-4">
              <div className="calulaterResult calulaterDiet">
                <h4>Result</h4>
                <div className="ResultBox">
                  <div className="ResultBox-left">
                    {result?.error ? (
                      <p className="text-danger">{result.error}</p>
                    ) : result ? (
                      <>
                        <p>
                          According to Hamwi’s Formula, <span className="text-primary">your Ideal Weight is:</span>
                        </p>
                        <span className="day-text">{result.idealWeight} kg</span>
                        <p className="mt-2">Healthy Range: {result.range}</p>
                      </>
                    ) : (
                      <p className="dash-class">--</p>
                    )}
                  </div>

                  <div className="ResultBox-right">
                    <figure>
                      <img src={Diet2} alt="Diet" />
                    </figure>
                  </div>
                </div>
              </div>
            </div>}
          </div>
        </div>
      </section>
    </>
  );
}

export default Idealweight;