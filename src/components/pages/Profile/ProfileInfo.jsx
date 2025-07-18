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
const ProfileInfo = ({
  handleSave,
  formData,
  setProfileDetails,
  setFormData,
  profileDetails,
}) => {
  
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
      setProfileDetails((prev) => ({ ...prev, [name]: value }));
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

  const sortedMeasurements = [
    ...(profileDetails.physicalMeasurement || []),
  ].sort(
    (a, b) => new Date(a.createdAt || a.date) - new Date(b.createdAt || b.date)
  );

  const labels = sortedMeasurements.map((item) =>
    moment(item.createdAt || item.date).isValid()
      ? moment(item.createdAt || item.date).format("DD MMM YYYY")
      : "Invalid Date"
  );

  const chartData = {
    labels,
    datasets: measurementFields.map((field, i) => ({
      label: formatLabel(field),
      data: sortedMeasurements.map((item) => Number(item[field]) || 0),
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
      data: sortedMeasurements.map((item) => Number(item[field]) || 0),
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
            <label>Name*</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your full name"
              name="firstName"
              value={profileDetails.firstName}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[A-Za-z\s]*$/.test(value)) {
                  handleChange(e);
                }
              }}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Email*</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={profileDetails.email}
              // onChange={handleChange}
              disabled={true}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Age*</label>
            <input
              type="number"
              className="form-control"
              name="age"
              placeholder="Enter your age"
              value={profileDetails.age}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d{0,3}$/.test(val)) {
                  handleChange({ target: { name: "age", value: val } });
                }
              }}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Gender*</label>
            <select
              className="form-select"
              name="gender"
              placeholder="Select your gender"
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
            <label>Contact Number*</label>
            <input
              type="number"
              className="form-control"
              name="phone"
              placeholder="Enter 10-digit number"
              value={profileDetails.phone}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d{0,10}$/.test(val)) {
                  handleChange(e);
                }
              }}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Address </label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={formData.city}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[A-Za-z\s]*$/.test(value)) {
                  handleChange(e);
                }
              }}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Pin Code / Zip Code*</label>
            <input
              type="number"
              className="form-control"
              name="pincode"
              value={formData.pincode}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d{0,6}$/.test(val)) {
                  handleChange(e);
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="CardBbox mb-4">
        <div className="cardhead d-flex justify-content-between">
          <h3>Current Physical Measurements</h3>
          <button onClick={() => handleSave()} className="update-meas-btn">
            Update Measurments
          </button>
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
          {profileDetails?.physicalMeasurement?.length > 0 && (
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
              <div
                style={{ width: "100%", maxWidth: "100%", marginTop: "60px" }}
              >
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
          )}
        </div>
      </div>

      <div className="CardBbox mb-4">
        <div className="cardhead">
          <h3>Fitness & Health Overview</h3>
        </div>
        <div className="Cardbody row">
          <div className="col-md-6 mb-3">
            <label>Diet Preference</label>
            <select
              className="form-control"
              name="dietPreference"
              value={formData.dietPreference}
              onChange={handleChange}
            >
              <option value="">Select Diet Preference</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
              <option value="Eggetarian">Eggetarian</option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label>Workout Preference</label>
            <select
              className="form-control"
              name="workoutPreference"
              value={formData.workoutPreference}
              onChange={handleChange}
            >
              <option value="">Select Workout Preference</option>
              <option value="Gym">Gym</option>
              <option value="Home">Home</option>
              <option value="Outdoor">Outdoor</option>
            </select>
          </div>

          <div className="col-md-12 mb-3">
            <label>Pre-existing Medical Conditions (if any)</label>
            <div className="d-flex flex-wrap gap-3">
              {[
                "Diabetes",
                "Hypertension (High BP)",
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
            <label>Pre-existing Sports Injury (If Yes, please describe)</label>
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
