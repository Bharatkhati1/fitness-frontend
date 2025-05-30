import React, { useEffect, useState } from "react";
import FatBannerBg from "../../../../../../public/assets/img/FatBannerBg.png";
import Form from "react-bootstrap/Form";
import Diet3 from "../../../../../../public/assets/img/Diet3.png";

const FatLoass = () => {
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");

  const [waist, setWaist] = useState("");
  const [waistUnit, setWaistUnit] = useState("cm");

  const [neck, setNeck] = useState("");
  const [neckUnit, setNeckUnit] = useState("cm");

  const [hip, setHip] = useState("");
  const [hipUnit, setHipUnit] = useState("cm");
  const [isInvalid, setIsInvalid] = useState(null);
  const [result, setResult] = useState(null);

  const convertToCm = (value, unit) => {
    switch (unit) {
      case "inch":
        return value * 2.54;
      case "ft":
        return value * 30.48;
      default:
        return value;
    }
  };

  const calculateFatPercentage = () => {
    setIsInvalid(null);
    const h = convertToCm(parseFloat(height), heightUnit);
    const w = convertToCm(parseFloat(waist), waistUnit);
    const n = convertToCm(parseFloat(neck), neckUnit);
    const hp = convertToCm(parseFloat(hip), hipUnit);

    if (!h || !w || !n || (gender === "female" && !hp)) {
      setIsInvalid("Please fill in all required fields with valid numbers.");
      return;
    }

    // Check for invalid conditions
    if (
      isNaN(h) ||
      isNaN(w) ||
      isNaN(n) ||
      (gender === "female" && isNaN(hp)) ||
      h <= 0 ||
      w <= 0 ||
      n <= 0 ||
      (gender === "female" && hp <= 0)
    ) {
      setIsInvalid("Please enter valid, positive numbers only.");
      return;
    }

    let fatPercentage = 0;

    try {
      if (gender === "male") {
        const log1 = Math.log10(w - n);
        const log2 = Math.log10(h);
        if (isNaN(log1) || isNaN(log2)) throw new Error("Invalid math input.");
        fatPercentage = 495 / (1.0324 - 0.19077 * log1 + 0.15456 * log2) - 450;
      } else {
        const log1 = Math.log10(w + hp - n);
        const log2 = Math.log10(h);
        if (isNaN(log1) || isNaN(log2)) throw new Error("Invalid math input.");
        fatPercentage = 495 / (1.29579 - 0.35004 * log1 + 0.221 * log2) - 450;
      }

      if (isNaN(fatPercentage) || fatPercentage < 0 || fatPercentage > 100) {
        throw new Error("Result out of range.");
      }

      setResult(fatPercentage.toFixed(1));
    } catch (error) {
      console.log(error)
      setIsInvalid("Invalid input. Please check your values.");
      setResult("--");
    }
  };

  useEffect(() => {
    setIsInvalid(null);
  }, [waist, waistUnit, neck, neckUnit, hip, hipUnit, height, heightUnit]);

  return (
    <>
      <section className="innerbanner">
        <figure>
          <img src={FatBannerBg} alt="Fat Banner" />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>Fat Percentage Calculator</h2>
            <p>Understand Your Body Beyond the Scale</p>
          </div>
        </div>
      </section>
      <section className="InnnerPage bmiCalculator InnerSpace">
        <div className="container">
          <div className="InnerPageTitle">
            <h4>What is fat percentage?</h4>
            <p>
              Body fat percentage is the proportion of a person's body weight
              that is made up of fat tissue...
            </p>
          </div>
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="bmiCalculatorBg">
                <div className="calculateHead">
                  <h4>Calculate your fat loss by putting values below</h4>
                </div>
                <div className="calculatebody">
                  <div className="calculaField mb-3">
                    <label>Gender:</label>
                    <div className="radioListBox">
                      <ul className="radioList d-flex">
                        <li>
                          <input
                            type="radio"
                            id="gender-male"
                            name="gender"
                            value="male"
                            checked={gender === "male"}
                            onChange={() => setGender("male")}
                          />
                          <label htmlFor="gender-male">Male</label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            id="gender-female"
                            name="gender"
                            value="female"
                            checked={gender === "female"}
                            onChange={() => setGender("female")}
                          />
                          <label htmlFor="gender-female">Female</label>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Height */}
                  <div className="calculaField mb-3">
                    <label>Height:</label>
                    <div className="calculainSelect d-flex">
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
                        <option value="ft">ft</option>
                      </Form.Select>
                    </div>
                  </div>

                  {/* Waist */}
                  <div className="calculaField mb-3">
                    <label>Waist:</label>
                    <div className="calculainSelect d-flex">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Enter value"
                        value={waist}
                        onChange={(e) => setWaist(e.target.value)}
                      />
                      <Form.Select
                        value={waistUnit}
                        onChange={(e) => setWaistUnit(e.target.value)}
                      >
                        <option value="cm">cm</option>
                        <option value="inch">inch</option>
                        <option value="ft">ft</option>
                      </Form.Select>
                    </div>
                  </div>

                  {/* Neck */}
                  <div className="calculaField mb-3">
                    <label>Neck:</label>
                    <div className="calculainSelect d-flex">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Enter value"
                        value={neck}
                        onChange={(e) => setNeck(e.target.value)}
                      />
                      <Form.Select
                        value={neckUnit}
                        onChange={(e) => setNeckUnit(e.target.value)}
                      >
                        <option value="cm">cm</option>
                        <option value="inch">inch</option>
                        <option value="ft">ft</option>
                      </Form.Select>
                    </div>
                  </div>

                  {/* Hip */}
                  <div className="calculaField mb-3">
                    <label>Hip:</label>
                    <div className="calculainSelect d-flex">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Enter value"
                        value={hip}
                        onChange={(e) => setHip(e.target.value)}
                        disabled={gender === "male"}
                      />
                      <Form.Select
                        value={hipUnit}
                        onChange={(e) => setHipUnit(e.target.value)}
                        disabled={gender === "male"}
                      >
                        <option value="cm">cm</option>
                        <option value="inch">inch</option>
                        <option value="ft">ft</option>
                      </Form.Select>
                      <span className="taginfo">*Only for Women*</span>
                    </div>
                  </div>
                </div>

                <div
                  style={{ color: "orange" }}
                  className="calculateButton text-center mt-3"
                >
                  {isInvalid && <p>{isInvalid}</p>}
                  <button
                    className="btn btn-primary sm-btn hvr-shutter-out-horizontal"
                    onClick={calculateFatPercentage}
                  >
                    Calculate your fat percentage
                  </button>
                </div>
              </div>
            </div>

           {result&&<div className="col-md-6 ps-4">
              <div className="calulaterResult calulaterDiet">
                <h4 className="mb-3">Result</h4>
                <div className="ResultBox">
                  <div className="ResultBoxinner-left">
                    {result ? (
                      <>
                        <p>
                          Based on the information provided, your estimated body
                          fat percentage using the U.S. Navy Body Fat Formula
                          is:
                        </p>
                        <span className="day-text">{result} %</span>
                      </>
                    ) : (
                      <p className="dash-class">--</p>
                    )}
                    <ul className="optinallyList">
                      <li>Optionally, compare to standard ranges:</li>
                      <li>◦ Men: 10–20% (average)</li>
                      <li>◦ Women: 18–28% (average)</li>
                    </ul>
                    <p className="smallNote">
                      Disclaimer: This is an estimate. For precise results,
                      consult a professional.
                    </p>
                    <figure className="Diet3">
                      <img src={Diet3} alt="Diet visual" />
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
};

export default FatLoass;
