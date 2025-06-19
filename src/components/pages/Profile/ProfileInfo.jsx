import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const ProfileInfo = ({ handleSave, formData, setFormData, profileDetails }) => {
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

  const measurementFields = [
    "height",
    "chest",
    "waistCirumference",
    "neckCirumference",
  ];

  const labels =
    profileDetails.physicalMeasurement?.map((item) =>
      moment(item.createdAt).format("DD MMM YYYY")
    ) || [];

  const chartData = {
    labels,
    datasets: measurementFields.map((field, i) => ({
      label: formatLabel(field),
      data:
        profileDetails.physicalMeasurement?.map(
          (item) => Number(item[field]) || 0
        ) || [],
      borderColor: `hsl(${(i + 1) * 60}, 70%, 50%)`,
      backgroundColor: `hsla(${(i + 1) * 60}, 70%, 50%, 0.3)`,
      fill: true,
      tension: 0.4,
    })),
  };

  const chartDataWeight = {
    labels,
    datasets: ["weight"].map((field, i) => ({
      label: formatLabel(field),
      data:
        profileDetails.physicalMeasurement?.map(
          (item) => Number(item[field]) || 0
        ) || [],
      borderColor: `hsl(${(i + 1) * 60}, 70%, 50%)`,
      backgroundColor: `hsla(${(i + 1) * 60}, 70%, 50%, 0.3)`,
      fill: true,
      tension: 0.4,
    })),
  };

  const chartOptionsWeight = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Weight Trends (kg)",
      },
    },
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Body Measurments Trends(cm)",
      },
    },
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
        <div className="cardhead d-flex justify-content-between">
          <h3>Current Physical Measurements</h3>
          <button onClick={() => handleSave()} className="update-meas-btn">Update Measurments</button>
        </div>
        <div className="Cardbody row">
          <div className="Cardbody row">
            {[
              { name: "weight", label: "Weight (kg)" },
              { name: "height", label: "Height (cm)" },
              { name: "chest", label: "Chest (cm)" },
              { name: "waistCirumference", label: "Waist Circumference (cm)" },
              { name: "neckCirumference", label: "Neck Circumference (cm)" },
            ].map(({ name, label }) => (
              <div className="col-md-6 mb-3" key={name}>
                <label>{label}</label>
                <input
                  type="number"
                  className="form-control"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          <div className="measurment-history">
            <h3>Measurment History</h3>
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table align-middle mb-0 table-hover table-centered">
                        <thead className="bg-light-subtle">
                          <tr>
                            <th>Date</th>
                            <th>Weight (kg)</th>
                            <th>Height (cm)</th>
                            <th>Chest (cm)</th>
                            <th>Waist (cm)</th>
                            <th>Neck (cm)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {profileDetails?.physicalMeasurement?.length > 0 ? (
                            profileDetails.physicalMeasurement?.map(
                              (item, index) => (
                                <tr key={item.id}>
                                  <td>
                                    {moment(item?.createdAt).format("DD-MM-YY")}
                                  </td>
                                  <td>{item?.weight}</td>
                                  <td>{item.height || "-"}</td>
                                  <td>{item?.chest}</td>
                                  <td>{item?.waistCirumference || "-"}</td>
                                  <td>{item?.neckCirumference || "-"}</td>
                                </tr>
                              )
                            )
                          ) : (
                            <tr>
                              <td colSpan="9" className="text-center">
                                No data found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="chart-section mt-4">
            <h3>Measurement Trends</h3>
            <div style={{ width: "100%", maxWidth: "100%" }}>
              <Line
                data={chartDataWeight}
                options={{
                  ...chartOptionsWeight,
                  responsive: true,
                  maintainAspectRatio: false,
                }}
                height={350}
              />
            </div>
            <div style={{ width: "100%", maxWidth: "100%", marginTop: "60px" }}>
              <Line
                data={chartData}
                options={{
                  ...chartOptions,
                  responsive: true,
                  maintainAspectRatio: false,
                }}
                height={350}
              />
            </div>
          </div>
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
