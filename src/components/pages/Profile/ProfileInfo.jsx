import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import userAxios from "../../../utils/Api/userAxios";
import userApiRoutes from "../../../utils/Api/Routes/userApiRoutes";
import { useDispatch } from "react-redux";

const ProfileInfo = ({ handleSave, formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const numericFields = [
      "age",
      "pincode",
      "weight",
      "height",
      "chest",
      "waistCirumference",
      "neckCirumference",
    ];

    if (numericFields.includes(name) && isNaN(value)) return;

    if (type === "checkbox") {
      setFormData((prev) => {
        const updatedConditions = checked
          ? [...prev.medicalCanditions, value]
          : prev.medicalCanditions.filter((v) => v !== value);
        return { ...prev, medicalCanditions: updatedConditions };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (value) => {
    setFormData((prev) => {
      const updatedConditions = prev.medicalCanditions.includes(value)
        ? prev.medicalCanditions.filter((v) => v !== value)
        : [...prev.medicalCanditions, value];
      return { ...prev, medicalCanditions: updatedConditions };
    });
  };
  // Helper function to format labels
  const formatLabel = (str) => {
    return str
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (match) => match.toUpperCase())
      .replace("Cirumference", "Circumference");
  };

  return (
    <>
      <div className="CardBbox mb-4">
        <div className="cardhead">
          <h3>Basic Details</h3>
        </div>
        <div className="Cardbody row">
          <div className="col-md-6 mb-3">
            <label>Age*</label>
            <input
              type="number"
              className="form-control"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Gender*</label>
            <select
              className="form-select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label>Pincode</label>
            <input
              type="number"
              className="form-control"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="CardBbox mb-4">
        <div className="cardhead">
          <h3>Current Physical Measurements</h3>
        </div>
        <div className="Cardbody row">
          {[
            "weight",
            "height",
            "chest",
            "waistCirumference",
            "neckCirumference",
          ].map((field) => (
            <div className="col-md-6 mb-3" key={field}>
              <label>{formatLabel(field)}</label>
              <input
                type="number"
                className="form-control"
                name={field}
                value={formData[field]}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="CardBbox mb-4">
        <div className="cardhead">
          <h3>Fitness & Health Overview</h3>
        </div>
        <div className="Cardbody row">
          <div className="col-md-6 mb-3">
            <label>Diet Preference</label>
            <input
              type="text"
              className="form-control"
              name="dietPreference"
              value={formData.dietPreference}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Workout Preference</label>
            <input
              type="text"
              className="form-control"
              name="workoutPreference"
              value={formData.workoutPreference}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12 mb-3">
            <label>Medical Conditions</label>
            <div className="d-flex flex-wrap gap-3">
              {[
                "Diabetes",
                "Hypertension",
                "Thyroid",
                "PCOS/PCOD",
                "Others",
              ].map((condition) => (
                <div className="form-check" key={condition}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`condition-${condition}`}
                    checked={formData.medicalCanditions.includes(
                      condition.toLowerCase()
                    )}
                    onChange={() =>
                      handleCheckboxChange(condition.toLowerCase())
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`condition-${condition}`}
                  >
                    {condition}
                  </label>
                </div>
              ))}
            </div>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Specify medical condition"
              name="medicalConditionDescription"
              value={formData.medicalConditionDescription}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12">
            <label>Sports Injury</label>
            <input
              type="text"
              className="form-control"
              placeholder="Describe here"
              name="sportInjury"
              value={formData.sportInjury}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="formbtn text-center mt-4 mb-4">
        <button
          className="btn btn-primary sm-btn hvr-shutter-out-horizontal"
          onClick={handleSave}
        >
          Save Profile
        </button>
      </div>
    </>
  );
};

export default ProfileInfo;
