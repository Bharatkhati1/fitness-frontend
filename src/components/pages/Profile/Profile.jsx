import React, { useEffect, useRef, useState } from "react";
import profileuserimg from "../../../../public/assets/img/profileuserimg.png";
import pencilicons from "../../../../public/assets/img/pencilicon.png";
import logouticon from "../../../../public/assets/img/logouticon.png";
import { toast } from "react-toastify";
import userAxios from "../../../utils/Api/userAxios";
import userApiRoutes from "../../../utils/Api/Routes/userApiRoutes";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../store/auth/AuthExtraReducers";
import ProfileInfo from "./ProfileInfo";
import ProfileMyPakages from "./ProfileMyPakages";
import MyConsultation from "./MyConsultation";
import MyTestimonails from "./MyTestimonails";

function Profile() {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [profileDetails, setProfileDetails] = useState({});
  const [selectedTab, setSelectedTab] = useState(0);
  const [userPackages, setUserPackages] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    pincode: "",
    weight: "",
    height: "",
    chest: "",
    waistCirumference: "",
    neckCirumference: "",
    dietPreference: "",
    workoutPreference: "",
    medicalCanditions: [],
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
        weight: data.UserDetail.weight || "",
        height: data.UserDetail.height || "",
        chest: data.UserDetail.chest || "",
        waistCirumference: data.UserDetail.waistCirumference || "",
        neckCirumference: data.UserDetail.neckCirumference || "",
        dietPreference: data.UserDetail.dietPreference || "",
        workoutPreference: data.UserDetail.workoutPreference || "",
        medicalCanditions: data.UserDetail.medicalCanditions || [],
        medicalConditionDescription:
          data.UserDetail.medicalConditionDescription || "",
        sportInjury: data.UserDetail.sportInjury || "",
      });
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  const validateForm = () => {
    if (!formData.age) return toast.error("Age is required");
    if (!formData.gender) return toast.error("Gender is required");
    if (formData.pincode && isNaN(formData.pincode))
      return toast.error("Pincode must be numeric");
    if (formData.weight && isNaN(formData.weight))
      return toast.error("Weight must be numeric");
    if (formData.height && isNaN(formData.height))
      return toast.error("Height must be numeric");
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    try {
      await userAxios.put(userApiRoutes.update_profile, formData);
      toast.success("Profile updated successfully");
      fetchProfileDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser(true));
  };

  const fetchPackages = async () => {
    try {
      const res = await userAxios.get(userApiRoutes.get_packages_user);
      const data = res.data.data;
      setUserPackages(data);
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  const fetchConsultantions = async () => {
    try {
      const res = await userAxios.get(userApiRoutes.user_consultation);
      const data = res.data.data;
      setConsultations(data);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to fetch profile");
    }
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const updatedFormData = new FormData();
    updatedFormData.append("user_image", file);
  
    // Append other form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => updatedFormData.append(`${key}[]`, v));
      } else {
        updatedFormData.append(key, value);
      }
    });
  
    try {
      await userAxios.put(userApiRoutes.update_profile, updatedFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      toast.success("Profile image updated successfully");
      fetchProfileDetails(); // Refresh profile
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update profile image"
      );
    }
  };
  
  

  useEffect(() => {
    fetchProfileDetails();
    fetchPackages();
    fetchConsultantions();
  }, []);

  return (
    <div className="container spacetop">
      <div className="Carduserinfo pt-4 mb-4">
        <div className="row">
          <div className="col-auto">
            <div className="cardprofile">
              <figure>
                <img
                  crossOrigin="anonymous"
                  src={profileDetails?.profilePictureUrl || profileuserimg}
                  alt="profile"
                  onError={(e) => {
                    e.target.src = profileuserimg;
                  }}
                />
              </figure>

              <button className="editprofile" onClick={handleIconClick}>
                <img src={pencilicons} alt="edit" />
              </button>

              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="col">
            <div className="cardcontent">
              <h3>Hello {profileDetails?.firstName || "User"}!</h3>
              <p>Your profile and progress — all in one place.</p>
              <div className="tabscardbox d-flex justify-content-between align-items-center mt-3">
                <ul className="tabslist">
                  <li
                    className={selectedTab == 0 && `active`}
                    onClick={() => setSelectedTab(0)}
                  >
                    <a>Personal Information</a>
                  </li>
                  <li
                    className={selectedTab == 1 && `active`}
                    onClick={() => setSelectedTab(1)}
                  >
                    <a>My Packages</a>
                  </li>
                  <li
                    className={selectedTab == 2 && `active`}
                    onClick={() => setSelectedTab(2)}
                  >
                    <a>My Consultations</a>
                  </li>
                  <li
                    className={selectedTab == 3 && `active`}
                    onClick={() => setSelectedTab(3)}
                  >
                    <a>My Testimonials</a>
                  </li>
                </ul>
                <a className="logoutbtn" onClick={handleLogout}>
                  <img src={logouticon} alt="logout" /> Log Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedTab == 0 && (
        <ProfileInfo
          profileDetails={profileDetails}
          formData={formData}
          setFormData={setFormData}
          handleSave={handleSave}
        />
      )}
      {selectedTab == 1 && <ProfileMyPakages userPackages={userPackages} />}
      {selectedTab == 2 && <MyConsultation consultations={consultations} />}
      {selectedTab == 3 && <MyTestimonails />}
    </div>
  );
}

export default Profile;
