import React, { useState } from "react";

const IdealWightCalculatore = () => {
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [gender, setGender] = useState("male");
  const [bodyFrame, setBodyFrame] = useState("medium");
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (height) {
      calculateIdealWeight();
    }
  };

  const resetForm = () => {
    setHeight("");
    setResult(null);
  };

  return (
    <div className="ideal-weight-calculator">
      <h2 className="calculator-title">Ideal Weight Calculator</h2>

      <form onSubmit={handleSubmit} className="calculator-form">
        <div className="form-group">
          <label className="form-label">Height:</label>
          <div className="input-with-unit">
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value.replace(/[^0-9]/g, ""))}
              className="form-input"
              min="100"
              max="300"
              step="0.1"
              required
            />
            <select
              value={heightUnit}
              onChange={(e) => setHeightUnit(e.target.value)}
              className="unit-select"
            >
              <option value="cm">cm</option>
              <option value="inches">inches</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="form-select"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Body Frame:</label>
          <select
            value={bodyFrame}
            onChange={(e) => setBodyFrame(e.target.value)}
            className="form-select"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary">
            Calculate
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="btn btn-secondary"
          >
            Reset
          </button>
        </div>
      </form>

      {result && (
        <div className="result-container">
          <h3 className="result-title">Your Ideal Weight</h3>
          <p className="result-value">{result.idealWeight} kg</p>
          <p className="result-range">Healthy range: {result.range}</p>
        </div>
      )}
    </div>
  );
};

export default IdealWightCalculatore;
