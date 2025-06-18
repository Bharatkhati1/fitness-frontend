import React, { useEffect, useState } from "react";
import profileuserimg from "../../../public/assets/img/profileuserimg.png";
import pencilicons from "../../../public/assets/img/pencilicon.png";
import logouticon from "../../../public/assets/img/logouticon.png";
import { toast } from "react-toastify";
import userAxios from "../../utils/Api/userAxios";
import userApiRoutes from "../../utils/Api/Routes/userApiRoutes";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/auth/AuthExtraReducers";

function Profile() {
  const dispatch = useDispatch();
  const [profileDetails, setProfileDetails] = useState({});
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    pincode: "",
    weight: "",
    height: "",
    chest: "",
    waistCircumference: "",
    neckCircumference: "",
    dietPreference: "",
    workoutPreference: "",
    medicalConditions: [],
    medicalConditionDescription: "",
    sportInjury: "",
  });

  const fetchProfileDetails = async () => {
    try {
      const res = await userAxios.get(userApiRoutes.get_profile_details);
      const data = res.data.data;
      setProfileDetails(data);
      setFormData({
        age: data.age || "",
        gender: data.gender || "",
        pincode: data.pincode || "",
        weight: data.weight || "",
        height: data.height || "",
        chest: data.chest || "",
        waistCircumference: data.waistCirumference || "",
        neckCircumference: data.neckCirumference || "",
        dietPreference: data.dietPreference || "",
        workoutPreference: data.workoutPreference || "",
        medicalConditions: data.medicalCanditions || [],
        medicalConditionDescription: data.medicalConditionDescription || "",
        sportInjury: data.sportInjury || "",
      });
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to fetch profile");
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Prevent non-numeric input for specific fields
    const numericFields = ['age', 'pincode', 'weight', 'height'];
    if (numericFields.includes(name) && /[^0-9]/.test(value)) return;

    if (type === 'checkbox') {
      setFormData((prev) => {
        const updatedConditions = checked
          ? [...prev.medicalConditions, value]
          : prev.medicalConditions.filter((v) => v !== value);
        return { ...prev, medicalConditions: updatedConditions };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const validateForm = () => {
    if (!formData.age || isNaN(formData.age)) return toast.error("Age must be a number");
    if (!formData.pincode || isNaN(formData.pincode)) return toast.error("Pincode must be numeric");
    if (!formData.weight || isNaN(formData.weight)) return toast.error("Weight must be numeric");
    if (!formData.height || isNaN(formData.height)) return toast.error("Height must be numeric");
    return true;
  }

  const handleSave = async () => {
    if (!validateForm()) return;
    try {
      await userAxios.post(userApiRoutes.save_profile_details, formData);
      toast.success("Profile updated successfully");
      fetchProfileDetails();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update profile");
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser(true));
  };

  useEffect(() => {
    fetchProfileDetails();
  }, []);

  return (
    <div className="container spacetop">
      <div className="Carduserinfo pt-4 mb-4">
        <div className="row">
          <div className="col-auto">
            <div className="cardprofile">
              <figure>
                <img crossOrigin="anonymous" src={profileDetails?.profilePictureUrl || profileuserimg} alt="profile" />
              </figure>
              <a className="editprofile">
                <img src={pencilicons} alt="edit" />
              </a>
            </div>
          </div>
          <div className="col">
            <div className="cardcontent">
              <h3>Hello {profileDetails?.firstName}!</h3>
              <p>Your profile and progress — all in one place.</p>
              <div className="tabscardbox d-flex justify-content-between align-items-center mt-3">
                <ul className="tabslist">
                  <li className="active"><a>Personal Information</a></li>
                  <li><a>My Packages</a></li>
                  <li><a>My Consultations</a></li>
                  <li><a>My Testimonials</a></li>
                </ul>
                <a className="logoutbtn" onClick={handleLogout}>
                  <img src={logouticon} alt="logout" /> Log Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="CardBbox mb-4">
        <div className="cardhead"><h3>Basic Details</h3></div>
        <div className="Cardbody row">
          <div className="col-md-6 mb-3">
            <label>Age*</label>
            <input type="text" className="form-control" value={formData.age} onChange={(e) => handleChange("age", e.target.value)} />
          </div>
          <div className="col-md-6 mb-3">
            <label>Gender*</label>
            <select className="form-select" value={formData.gender} onChange={(e) => handleChange("gender", e.target.value)}>
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label>Pincode</label>
            <input type="text" className="form-control" value={formData.pincode} onChange={(e) => handleChange("pincode", e.target.value)} />
          </div>
        </div>
      </div>

      <div className="CardBbox mb-4">
        <div className="cardhead"><h3>Current Physical Measurements</h3></div>
        <div className="Cardbody row">
          {["weight", "height", "chest", "waistCircumference", "neckCircumference"].map((field, idx) => (
            <div className="col-md-6 mb-3" key={idx}>
              <label>{field.replace(/([A-Z])/g, " $1").toUpperCase()}</label>
              <input type="text" className="form-control" value={formData[field]} onChange={(e) => handleChange(field, e.target.value)} />
            </div>
          ))}
        </div>
      </div>

      <div className="CardBbox mb-4">
        <div className="cardhead"><h3>Fitness & Health Overview</h3></div>
        <div className="Cardbody row">
          <div className="col-md-6 mb-3">
            <label>Diet Preference</label>
            <input type="number" className="form-control" value={formData.dietPreference} onChange={(e) => handleChange("dietPreference", e.target.value)} />
          </div>
          <div className="col-md-6 mb-3">
            <label>Workout Preference</label>
            <input type="number" className="form-control" value={formData.workoutPreference} onChange={(e) => handleChange("workoutPreference", e.target.value)} />
          </div>
          <div className="col-md-12 mb-3">
            <label>Medical Conditions</label>
            {["Diabetes", "Hypertension", "Thyroid", "PCOS/PCOD", "Others"].map((condition, i) => (
              <div className="form-check form-check-inline" key={i}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={formData.medicalConditions.includes(condition.toLowerCase())}
                  onChange={() => handleCheckboxChange(condition.toLowerCase())}
                />
                <label className="form-check-label">{condition}</label>
              </div>
            ))}
            <input type="text" className="form-control mt-2" placeholder="Specify medical condition" value={formData.medicalConditionDescription} onChange={(e) => handleChange("medicalConditionDescription", e.target.value)} />
          </div>
          <div className="col-md-12">
            <label>Sports Injury</label>
            <input type="text" className="form-control" placeholder="Describe here" value={formData.sportInjury} onChange={(e) => handleChange("sportInjury", e.target.value)} />
          </div>
        </div>
      </div>

      <div className="formbtn text-center mt-4 mb-4">
        <button className="btn btn-primary sm-btn hvr-shutter-out-horizontal" onClick={handleSave}>Save Profile</button>
      </div>
    </div>
  );
}

export default Profile;
