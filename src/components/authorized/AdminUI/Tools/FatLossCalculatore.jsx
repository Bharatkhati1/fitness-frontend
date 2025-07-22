import React, { useState } from 'react';

const FatLossCalculatore = () => {
  const [currentWeight, setCurrentWeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [timeframe, setTimeframe] = useState('8');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [result, setResult] = useState(null);
  const [warning, setWarning] = useState('');

  const calculateFatLoss = () => {
    // Reset warnings
    setWarning('');

    // Convert inputs to numbers
    const current = parseFloat(currentWeight);
    const goal = parseFloat(goalWeight);
    const weeks = parseFloat(timeframe);

    // Validate inputs
    if (goal >= current) {
      setWarning('Goal weight must be less than current weight');
      return;
    }

    // Calculate weight to lose (in kg)
    const weightToLose = current - goal;

    // Calculate total calories to lose (1kg fat = 7700 calories)
    const totalCalories = weightToLose * 7700;

    // Calculate required daily deficit
    const dailyDeficit = totalCalories / (weeks * 7);

    // Calculate BMR (Basal Metabolic Rate)
    const bmr = gender === 'male' ? 24 * current : 22 * current;

    // Calculate TDEE (Total Daily Energy Expenditure) based on activity level
    let activityMultiplier;
    switch (activityLevel) {
      case 'sedentary':
        activityMultiplier = 1.2;
        break;
      case 'light':
        activityMultiplier = 1.375;
        break;
      case 'moderate':
        activityMultiplier = 1.55;
        break;
      case 'active':
        activityMultiplier = 1.725;
        break;
      case 'very active':
        activityMultiplier = 1.9;
        break;
      default:
        activityMultiplier = 1.2;
    }

    const tdee = bmr * activityMultiplier;

    // Calculate target calories
    let targetCalories = tdee - dailyDeficit;

    // Check for safe minimums
    const minCalories = gender === 'male' ? 1500 : 1200;
    let isSafe = true;
    
    if (targetCalories < minCalories) {
      isSafe = false;
      setWarning(`Warning: Calculated calories (${Math.round(targetCalories)}) are below the recommended minimum of ${minCalories}. Consider a longer timeframe.`);
      targetCalories = minCalories;
    }

    // Calculate estimated weekly weight loss
    const weeklyLossKg = (dailyDeficit * 7) / 7700;

    setResult({
      targetCalories: Math.round(targetCalories),
      weeklyLoss: weeklyLossKg.toFixed(1),
      isSafe,
      tdee: Math.round(tdee),
      dailyDeficit: Math.round(dailyDeficit)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentWeight && goalWeight && timeframe) {
      calculateFatLoss();
    }
  };

  const resetForm = () => {
    setCurrentWeight('');
    setGoalWeight('');
    setTimeframe('8');
    setResult(null);
    setWarning('');
  };

  return (
    <div className="fat-loss-calculator">
      <h2 className="calculator-title">Fat Loss Calculator</h2>
      
      <form onSubmit={handleSubmit} className="calculator-form">
        <div className="form-group">
          <label className="form-label">Current Weight (kg):</label>
          <input
            type="number"
            value={currentWeight}
            onChange={(e) => setCurrentWeight(e.target.value.replace(/[^0-9]/g, ""))}
            className="form-input"
            min="30"
            max="300"
            step="0.1"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Goal Weight (kg):</label>
          <input
            type="number"
            value={goalWeight}
            onChange={(e) => setGoalWeight(e.target.value.replace(/[^0-9]/g, ""))}
            className="form-input"
            min="30"
            max="300"
            step="0.1"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Timeframe (weeks):</label>
          <input
            type="number"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value.replace(/[^0-9]/g, "") )}
            className="form-input"
            min="1"
            max="52"
            step="1"
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
          <label className="form-label">Activity Level:</label>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            className="form-select"
          >
            <option value="sedentary">Sedentary (little or no exercise)</option>
            <option value="light">Lightly active (light exercise 1-3 days/week)</option>
            <option value="moderate">Moderately active (moderate exercise 3-5 days/week)</option>
            <option value="active">Active (hard exercise 6-7 days/week)</option>
            <option value="very active">Very active (very hard exercise & physical job)</option>
          </select>
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary">Calculate</button>
          <button type="button" onClick={resetForm} className="btn btn-secondary">Reset</button>
        </div>
      </form>

      {warning && (
        <div className="warning-message">
          <p>{warning}</p>
        </div>
      )}

      {result && (
        <div className={`result-container ${!result.isSafe ? 'unsafe' : ''}`}>
          <h3 className="result-title">Your Fat Loss Plan</h3>
          
          <div className="result-grid">
            <div className="result-item">
              <span className="result-label">Daily Calorie Target:</span>
              <span className="result-value">{result.targetCalories} kcal</span>
            </div>
            
            <div className="result-item">
              <span className="result-label">Estimated Weekly Loss:</span>
              <span className="result-value">{result.weeklyLoss} kg</span>
            </div>
            
            <div className="result-item">
              <span className="result-label">Your Maintenance Calories:</span>
              <span className="result-value">{result.tdee} kcal</span>
            </div>
            
            <div className="result-item">
              <span className="result-label">Required Daily Deficit:</span>
              <span className="result-value">{result.dailyDeficit} kcal</span>
            </div>
          </div>

          {!result.isSafe && (
            <div className="safety-warning">
              <p>⚠️ This plan requires extreme calorie restriction. For sustainable fat loss, consider a longer timeframe.</p>
            </div>
          )}

          <div className="healthy-tip">
            <p>For healthy weight loss, aim for 0.5-1 kg per week.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FatLossCalculatore;
