import React, { useEffect, useRef, useState } from "react";
import pencilicons from "../../../../public/assets/img/pencilicon.png";
import logouticon from "../../../../public/assets/img/logouticon.png";
import { toast } from "react-toastify";
import userAxios from "../../../utils/Api/userAxios";
import userApiRoutes from "../../../utils/Api/Routes/userApiRoutes";
import { useDispatch } from "react-redux";
import Avtar from "../images/Avtar.png";
import { logoutUser } from "../../../store/auth/AuthExtraReducers";
import ProfileInfo from "./ProfileInfo";
import ProfileMyPakages from "./ProfileMyPakages";
import MyConsultation from "./MyConsultation";
import MyTestimonails from "./MyTestimonails";
import { useNavigate } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [profileDetails, setProfileDetails] = useState({});
  const [selectedTab, setSelectedTab] = useState(0);
  const [userPackages, setUserPackages] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
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
      setFirstName(data.firstName);
      setFormData((prev) => ({ ...prev, ...data, ...data?.UserDetail }));
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  const handleSave = async (type) => {
    try {
      await userAxios.put(userApiRoutes.update_profile(type), {
        ...formData,
        firstName: profileDetails.firstName,
        email: profileDetails.email,
      });
      toast.success("Profile updated successfully");
      fetchProfileDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser(true, navigate));
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
      const data = res.data.data.reverse();
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

    try {
      await userAxios.put(userApiRoutes.update_profile_image, updatedFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Profile image updated successfully");
      fetchProfileDetails();
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
                  src={profileDetails?.profilePictureUrl || Avtar}
                  alt="profile"
                  onError={(e) => {
                    e.target.src = Avtar;
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
              <h3>Hello {firstName || "User"}!</h3>
              <p>
                Everything about you, your journey, and your progress — all in
                one calm, curated space.
              </p>
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
          setProfileDetails={setProfileDetails}
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
