import React, { useState } from "react";
import CalorieCalculatorBanner from "../../../../../../public/assets/img/CalorieCalculatorBanner.png";
import Form from "react-bootstrap/Form";
import Diet1 from "../../../../../../public/assets/img/Diet1.png";

function CaloriesCalculatore() {
  const [age, setAge] = useState();
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState();
  const [heightUnit, setHeightUnit] = useState("cm");
  const [weight, setWeight] = useState();
  const [weightUnit, setWeightUnit] = useState("kg");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [goal, setGoal] = useState("maintain");
  const [calories, setCalories] = useState(null);
  const [error, setError] = useState("");

  const convertToMetric = () => {
    let heightCm = height;
    if (heightUnit === "inch") heightCm = height * 2.54;
    else if (heightUnit === "ft") heightCm = height * 30.48;

    let weightKg = weight;
    if (weightUnit === "lbs") weightKg = weight * 0.453592;

    return { heightCm, weightKg };
  };

  const calculateCalories = () => {
    // Basic validation
    if (!age || !height || !weight) {
      setError("Please fill all the required fields.");
      setCalories(null); // Optional: clear previous result
      return;
    }

    setError(""); // Clear previous error

    const { heightCm, weightKg } = convertToMetric();

    let bmr;
    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }

    const activityMap = {
      sedentary: 1.2,
      moderate: 1.375,
      active: 1.55,
      "very active": 1.725,
      "extremely active": 1.9,
    };
    const tdee = bmr * activityMap[activityLevel];

    let dailyCalories;
    switch (goal) {
      case "lose":
        dailyCalories = tdee - 500;
        break;
      case "gain":
        dailyCalories = tdee + 500;
        break;
      default:
        dailyCalories = tdee;
    }
    setCalories(Math.round(dailyCalories));
  };

  return (
    <>
      <section className="innerbanner">
        <figure>
          <img src={CalorieCalculatorBanner} />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>calorie Calculator</h2>
            <p>Every Calorie Counts—Make Yours Matter.</p>
          </div>
        </div>
      </section>
      <section className="InnnerPage bmiCalculator InnerSpace">
        <div className="container">
          <div className="InnerPageTitle">
            <h4>what is calorie calculator ? </h4>
            <p>
              A calorie calculator is a tool that helps you estimate how many
              calories your body needs each day based on following factors.
            </p>
          </div>
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="bmiCalculatorBg">
                <div className="calculateHead">
                  <h4>Calculate Your Calories By Putting Values Below </h4>
                </div>
                <div className="calculatebody">
                  <div className="calculaField mb-3">
                    <label>Age:</label>
                    <div className="calculainSelect">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Enter your age"
                        value={age}
                        min="0"
                        max="999"
                        onChange={(e) => {
                          const val = e.target.value;
                          if (/^\d{0,3}$/.test(val)) {
                            setAge(Number(val));
                          }
                        }}
                      />
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
                    <label>Height:</label>
                    <div className="calculainSelect">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Enter height"
                        inputMode="decimal"
                        value={height}
                        onChange={(e) => {
                          const val = e.target.value;
                          // Regex: up to 5 digits total, optional 1 dot, max 2 digits after decimal
                          if (/^\d{0,5}(\.\d{0,2})?$/.test(val)) {
                            const [intPart, decPart] = val.split(".");
                            const totalDigits =
                              (intPart || "").length + (decPart || "").length;
                            if (totalDigits <= 5) {
                              setHeight(val);
                            }
                          }
                        }}
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

                  <div className="calculaField mb-3">
                    <label>Weight:</label>
                    <div className="calculainSelect">
                      <input
                        className="form-control"
                        type="number"
                        inputMode="decimal"
                        placeholder="Enter weight"
                        value={weight}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (/^\d{0,5}(\.\d{0,2})?$/.test(val)) {
                            const [intPart, decPart] = val.split(".");
                            const totalDigits =
                              (intPart || "").length + (decPart || "").length;
                            if (totalDigits <= 5) {
                              setWeight(val);
                            }
                          }
                        }}
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

                  <div className="calculaField mb-3">
                    <label>Activity Level:</label>
                    <Form.Select
                      value={activityLevel}
                      onChange={(e) => setActivityLevel(e.target.value)}
                    >
                      <option value="sedentary">Sedentary</option>
                      <option value="moderate">Moderate</option>
                      <option value="active">Active</option>
                      <option value="very active">Very Active</option>
                      <option value="extremely active">Extremely Active</option>
                    </Form.Select>
                  </div>

                  <div className="calculaField mb-3">
                    <label>Goal:</label>
                    <Form.Select
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                    >
                      <option value="maintain">Maintain Weight</option>
                      <option value="lose">Lose Weight</option>
                      <option value="gain">Gain Weight</option>
                    </Form.Select>
                  </div>
                </div>
                <div className="calculateButton text-center mt-3">
                  {error && <p style={{ color: "orange" }}>{error}</p>}

                  <button
                    className="btn btn-primary sm-btn hvr-shutter-out-horizontal"
                    onClick={calculateCalories}
                  >
                    Calculate Your Calories
                  </button>
                </div>
              </div>
            </div>

            {calories && (
              <div className="col-md-6 ps-4">
                <div className="calulaterResult calulaterDiet">
                  <h4>Result</h4>
                  <div className="ResultBox">
                    <div className="ResultBox-left">
                      <p>
                        Based on your details and chosen goal, you should
                        consume around
                      </p>
                      <span className="day-text">
                        {calories ? (
                          `${calories.toLocaleString("en-IN")} `
                        ) : (
                          <div className="dash-class">--</div>
                        )}
                        <sub>Calories/day</sub>
                      </span>
                    </div>
                    <div className="ResultBox-right">
                      <figure>
                        <img src={Diet1} />
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default CaloriesCalculatore;
