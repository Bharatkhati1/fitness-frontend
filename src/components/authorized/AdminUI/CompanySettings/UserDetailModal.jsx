import React from "react";
import { Modal, Descriptions, Avatar, Tag, Divider } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined, HomeOutlined } from "@ant-design/icons";

const UserDetailModal = ({ visible, onCancel, userData }) => {
  // Extract user details from the nested structure
  const userDetails = userData?.UserDetail || {};
  const basicInfo = {
    firstName: userData?.firstName,
    email: userData?.email,
    phone: userData?.phone,
    address: userData?.address,
    city: userData?.city,
    age: userData?.age,
    gender: userData?.gender,
    pincode: userData?.pincode,
    profilePictureUrl: userData?.profilePictureUrl,
  };

  const formatMedicalConditions = (conditions) => {
    if (!conditions || conditions.length === 0) return "None";
    return conditions.map((condition, index) => (
      <Tag key={index} color="blue" style={{ marginBottom: 4 }}>
        {condition}
      </Tag>
    ));
  };

  const formatGender = (gender) => {
    if (!gender) return "Not specified";
    return gender.charAt(0).toUpperCase() + gender.slice(1);
  };

  const formatDietPreference = (preference) => {
    if (!preference) return "Not specified";
    return preference.charAt(0).toUpperCase() + preference.slice(1);
  };

  const formatWorkoutPreference = (preference) => {
    if (!preference) return "Not specified";
    return preference.charAt(0).toUpperCase() + preference.slice(1);
  };

  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <UserOutlined style={{ fontSize: 20, color: "#5d7186" }} />
          <span style={{ color: "#5d7186" }}>User Details</span>
        </div>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
      centered
    >
      <div style={{ padding: "16px 0" }}>
        {/* Profile Image and Basic Info */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
          <Avatar
            size={80}
            crossOrigin="anonymous"
            src={basicInfo.profilePictureUrl}
            icon={<UserOutlined />}
            style={{ marginRight: 16 }}
          />
          <div>
            <h3 style={{ margin: 0, color: "#5d7186" }}>
              {basicInfo.firstName || "N/A"}
            </h3>
            <p style={{ margin: "4px 0", color: "#5d7186" }}>
              <MailOutlined style={{ marginRight: 8 }} />
              {basicInfo.email || "N/A"}
            </p>
            <p style={{ margin: "4px 0", color: "#5d7186" }}>
              <PhoneOutlined style={{ marginRight: 8 }} />
              {basicInfo.phone || "N/A"}
            </p>
          </div>
        </div>

        <Divider />

        {/* Personal Information */}
        <Descriptions
          title={
            <span style={{ fontSize: 16, fontWeight: 600, color: "#5d7186" }}>
              Personal Information
            </span>
          }
          column={2}
          bordered
          size="small"
          style={{ marginBottom: 24 }}
        >
          <Descriptions.Item label="First Name" span={1}>
            {basicInfo.firstName || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Age" span={1}>
            {basicInfo.age ? `${basicInfo.age} years` : "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Gender" span={1}>
            {formatGender(basicInfo.gender)}
          </Descriptions.Item>
          <Descriptions.Item label="Email" span={1}>
            {basicInfo.email || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Phone" span={1}>
            {basicInfo.phone || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Pincode" span={1}>
            {basicInfo.pincode || "N/A"}
          </Descriptions.Item>
        </Descriptions>

        {/* Address Information */}
        <Descriptions
          title={
            <span style={{ fontSize: 16, fontWeight: 600, color: "#5d7186" }}>
              <HomeOutlined style={{ marginRight: 8 }} />
              Address Information
            </span>
          }
          column={1}
          bordered
          size="small"
          style={{ marginBottom: 24 }}
        >
          <Descriptions.Item label="Address" span={1}>
            {basicInfo.address || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="City" span={1}>
            {basicInfo.city || "N/A"}
          </Descriptions.Item>
        </Descriptions>

        {/* Physical Measurements */}
        <Descriptions
          title={
            <span style={{ fontSize: 16, fontWeight: 600, color: "#5d7186" }}>
              Physical Measurements
            </span>
          }
          column={2}
          bordered
          size="small"
          style={{ marginBottom: 24 }}
        >
          <Descriptions.Item label="Weight" span={1}>
            {userDetails?.weight ? `${userDetails.weight} kg` : "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Height" span={1}>
            {userDetails?.height ? `${userDetails.height} cm` : "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Chest" span={1}>
            {userDetails?.chest ? `${userDetails.chest} cm` : "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Waist Circumference" span={1}>
            {userDetails?.waistCirumference ? `${userDetails.waistCirumference} cm` : "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Neck Circumference" span={1}>
            {userDetails?.neckCirumference ? `${userDetails.neckCirumference} cm` : "N/A"}
          </Descriptions.Item>
        </Descriptions>

        {/* Preferences */}
        <Descriptions
          title={
            <span style={{ fontSize: 16, fontWeight: 600, color: "#5d7186" }}>
              Preferences
            </span>
          }
          column={2}
          bordered
          size="small"
          style={{ marginBottom: 24 }}
        >
          <Descriptions.Item label="Diet Preference" span={1}>
            {formatDietPreference(userDetails?.dietPreference)}
          </Descriptions.Item>
          <Descriptions.Item label="Workout Preference" span={1}>
            {formatWorkoutPreference(userDetails?.workoutPreference)}
          </Descriptions.Item>
        </Descriptions>

        {/* Medical Information */}
        <Descriptions
          title={
            <span style={{ fontSize: 16, fontWeight: 600, color: "#5d7186" }}>
              Medical Information
            </span>
          }
          column={1}
          bordered
          size="small"
          style={{ marginBottom: 24 }}
        >
          <Descriptions.Item label="Medical Conditions" span={1}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {formatMedicalConditions(userDetails?.medicalCanditions)}
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="Medical Condition Description" span={1}>
            {userDetails?.medicalConditionDescription || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Sport Injury" span={1}>
            {userDetails?.sportInjury || "N/A"}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </Modal>
  );
};

export default UserDetailModal;
