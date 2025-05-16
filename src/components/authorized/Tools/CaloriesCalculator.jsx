import React, { useState } from 'react';

const CaloriesCalculator = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [goal, setGoal] = useState('maintain');
  const [calories, setCalories] = useState(null);

  const calculateCalories = () => {
    // Calculate BMR (Mifflin-St Jeor formula)
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Calculate TDEE based on activity level
    let tdee;
    switch (activityLevel) {
      case 'sedentary':
        tdee = bmr * 1.2;
        break;
      case 'moderate':
        tdee = bmr * 1.375;
        break;
      case 'active':
        tdee = bmr * 1.55;
        break;
      case 'very active':
        tdee = bmr * 1.725;
        break;
      case 'extremely active':
        tdee = bmr * 1.9;
        break;
      default:
        tdee = bmr * 1.2;
    }

    // Adjust calories based on goal
    let dailyCalories;
    switch (goal) {
      case 'lose':
        dailyCalories = tdee - 500;
        break;
      case 'gain':
        dailyCalories = tdee + 500;
        break;
      default:
        dailyCalories = tdee;
    }

    setCalories(Math.round(dailyCalories));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (age && weight && height) {
      calculateCalories();
    }
  };

  const resetForm = () => {
    setAge('');
    setWeight('');
    setHeight('');
    setCalories(null);
  };

  return (
    <div className="calorie-calculator">
      <h2 className="calculator-title">Calorie Calculator</h2>
      
      <form onSubmit={handleSubmit} className="calculator-form">
        <div className="form-group">
          <label className="form-label">Age (years):</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="form-input"
            min="1"
            max="120"
            required
          />
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
          <label className="form-label">Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="form-input"
            min="1"
            step="0.1"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Height (cm):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="form-input"
            min="50"
            max="300"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Activity Level:</label>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            className="form-select"
          >
            <option value="sedentary">Sedentary (little or no exercise)</option>
            <option value="moderate">Lightly active (light exercise 1-3 days/week)</option>
            <option value="active">Moderately active (moderate exercise 3-5 days/week)</option>
            <option value="very active">Very active (hard exercise 6-7 days/week)</option>
            <option value="extremely active">Extremely active (very hard exercise & physical job)</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Goal:</label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="form-select"
          >
            <option value="maintain">Maintain weight</option>
            <option value="lose">Lose weight</option>
            <option value="gain">Gain weight</option>
          </select>
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary">Calculate</button>
          <button type="button" onClick={resetForm} className="btn btn-secondary">Reset</button>
        </div>
      </form>

      {calories && (
        <div className="result-container">
          <h3 className="result-title">Your Daily Calorie Needs</h3>
          <p className="result-value">{calories} calories per day</p>
        </div>
      )}
    </div>
  );
};
export default CaloriesCalculator
