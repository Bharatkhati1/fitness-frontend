import React, { useState } from 'react';

const BmiCalculatore = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [weightUnit, setWeightUnit] = useState('kg');
    const [heightUnit, setHeightUnit] = useState('m');
    const [bmi, setBmi] = useState(null);
    const [category, setCategory] = useState('');
  
    const calculateBMI = () => {
      // Convert weight to kg if in lbs
      let weightKg = parseFloat(weight);
      if (weightUnit === 'lbs') {
        weightKg = weightKg / 2.20462;
      }
  
      // Convert height to meters if in cm
      let heightM = parseFloat(height);
      if (heightUnit === 'cm') {
        heightM = heightM / 100;
      }
  
      // Calculate BMI
      const bmiValue = weightKg / (heightM * heightM);
      setBmi(bmiValue.toFixed(1));
  
      // Determine category
      if (bmiValue < 18.5) {
        setCategory('Underweight');
      } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        setCategory('Normal');
      } else if (bmiValue >= 25 && bmiValue <= 29.9) {
        setCategory('Overweight');
      } else {
        setCategory('Obese');
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (weight && height) {
        calculateBMI();
      }
    };
  
    const resetForm = () => {
      setWeight('');
      setHeight('');
      setBmi(null);
      setCategory('');
    };
  
    return (
      <div className='bmiCalculator'>
        <h2>BMI Calculator</h2>
        <form onSubmit={handleSubmit}>
          <div className='inputGroup'>
            <label>
              Weight:
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                min="0"
                step="0.1"
                required
              />
            </label>
            <select
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value)}
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </div>
  
          <div className='inputGroup'>
            <label>
              Height:
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                min="0"
                step="0.1"
                required
              />
            </label>
            <select
              value={heightUnit}
              onChange={(e) => setHeightUnit(e.target.value)}
            >
              <option value="m">meters</option>
              <option value="cm">cm</option>
            </select>
          </div>
  
          <div className='buttonGroup'>
            <button type="submit">Calculate BMI</button>
            <button type="button" onClick={resetForm}>
              Reset
            </button>
          </div>
        </form>
  
        {bmi && (
          <div className='result'>
            <h3>Your Results</h3>
            <p>
              <strong>BMI:</strong> {bmi}
            </p>
            <p>
              <strong>Category:</strong> {category}
            </p>
          </div>
        )}
      </div>
    );
  };

export default BmiCalculatore
