import React, { useState, useEffect, useRef } from "react";
import ConfirmationPopup from "../Popups/ConfirmationPopup.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Ckeditor from "../CkEditor/Ckeditor.jsx";
import DOMPurify from "dompurify";
import adminAxios from "../../../../utils/Api/adminAxios.jsx";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes.jsx";

const TeamManagement = () => {
  const [memberName, setMemberName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true);
  const [memberDesignation, setMemberDesignation] = useState("");
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [memberImage, setMemberImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [allMembers, setAllMembers] = useState([]);
  const fileInputRef = useRef(null);
  const selectedMemberIdRef = useRef(null);

  const fetchAllMembers = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_team_members);
      setAllMembers(res.data.data);
    } catch (error) {
      console.error("Failed to fetch teams:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleSubmit = async () => {
    if (!memberImage && !isEdit) {
      toast.warning("Please fill all required select an image.");
      return;
    }
    const formData = new FormData();
    formData.append("name", memberName);
    formData.append("position", memberDesignation);
    formData.append("description", description);
    formData.append("isActive", status);
    memberImage && formData.append("team_image", memberImage);

    try {
      let url = isEdit
        ? adminApiRoutes.update_team_member(selectedMemberId)
        : adminApiRoutes.create_team_member;
      let response;
      if (isEdit) {
        response = await adminAxios.put(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        response = await adminAxios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      toast.success(response.data.message);
      fetchAllMembers();
      onCancelEdit();
    } catch (error) {
      console.error("Something went wrong:", error);
      toast.error(`Failed to create team.${error.response.data.message}`);
    }
  };

  const deleteTeamMember = async () => {
    try {
      const idToDelete = selectedMemberIdRef.current ||selectedMemberId;
      if (idToDelete) {
        await adminAxios.delete(adminApiRoutes.delete_team_member(idToDelete));
        toast.success("Deleted Successfully");
        fetchAllMembers();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchAllMembers();
  }, []);

  const onCancelEdit = () => {
    setIsEdit(false);
    setSelectedMemberId(null);
    setMemberName("");
    setDescription("");
    setMemberDesignation("");
    setStatus(true);
    setMemberImage(null);
    setSelectedFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className={`card ${isEdit && `editing`}`}>
            <div className="card-header">
              <h4 className="card-title">
                {isEdit ? `Edit Selected Member` : `Add Member`}
              </h4>
              {isEdit && (
                <button onClick={() => onCancelEdit()}>Cancel Edit</button>
              )}
            </div>
            <div className="card-body">
              <div className="row">
                {/* Name */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="team-name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      id="team-name"
                      className="form-control"
                      placeholder="Enter name"
                      value={memberName}
                      onChange={(e) => setMemberName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Image */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="team-image" className="form-label">
                      Image {isEdit && !memberImage && ` : ${selectedFileName}`}
                    </label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/avif"
                      id="team-image"
                      ref={fileInputRef}
                      className="form-control"
                      onChange={(e) => setMemberImage(e.target.files[0])}
                    />
                  </div>
                </div>

                {/* Designation */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="team-heading" className="form-label">
                      Designation
                    </label>
                    <input
                      type="text"
                      id="team-heading"
                      className="form-control"
                      placeholder="Enter designation"
                      value={memberDesignation}
                      onChange={(e) => setMemberDesignation(e.target.value)}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="team-heading" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      id="team-heading"
                      className="form-control"
                      placeholder="Enter description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="col-lg-6">
                  <p>Status</p>
                  <div className="d-flex gap-2 align-items-center">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="team-status"
                        value={true}
                        checked={status}
                        onChange={() => setStatus(true)}
                        id="status-active"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="status-active"
                      >
                        Active
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="team-status"
                        value={false}
                        checked={!status}
                        onChange={() => setStatus(false)}
                        id="status-inactive"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="status-inactive"
                      >
                        Inactive
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="card-footer border-top">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                {isEdit ? `Update Changes` : `Save Change`}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">All Members</h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Designation</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allMembers.length > 0 ? (
                      allMembers.map((team, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <Link target="_blank" to={team.image_url}>
                              {" "}
                              <img
                                crossorigin="anonymous"
                                src={team.image_url}
                                alt="team"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "contain",
                                  border: "1px solid #eee",
                                }}
                                onError={(e) => {
                                  console.error(
                                    "Image failed to load:",
                                    team.image_url
                                  );
                                }}
                              />
                            </Link>
                          </td>
                          <td>{team.name}</td>
                          <td>{team.position}</td>
                          <td>{team.description}</td>
                          <td>
                            <span
                              className={`badge ${
                                team.isActive ? "bg-success" : "bg-danger"
                              }`}
                            >
                              {team.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-soft-primary btn-sm"
                                onClick={() => {
                                  window.scrollTo(0, 0);
                                  setIsEdit(true);
                                  setSelectedMemberId(team.id);
                                  setMemberName(team.name);
                                  setDescription(team.description);
                                  setMemberDesignation(team.position);
                                  setSelectedFileName(team.image);
                                  setStatus(team.isActive);
                                }}
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  class="align-middle fs-18"
                                ></iconify-icon>
                              </button>

                              <ConfirmationPopup
                                bodyText="Are you sure you want to delete this team ?"
                                title="Delete team "
                                onOk={() => deleteTeamMember()}
                                buttonText={
                                  <iconify-icon
                                    icon="solar:trash-bin-minimalistic-2-broken"
                                    class="align-middle fs-18"
                                    onClick={() => {
                                      selectedMemberIdRef.current = team.id;
                                      setSelectedMemberId(team.id);
                                    }}
                                  ></iconify-icon>
                                }
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No member found.
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
    </>
  );
};

export default TeamManagement;
