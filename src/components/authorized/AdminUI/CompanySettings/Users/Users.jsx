import React, { useEffect, useState } from "react";
import adminAxios from "../../../../../utils/Api/adminAxios";
import adminApiRoutes from "../../../../../utils/Api/Routes/adminApiRoutes";
import { toast } from "react-toastify";

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);

  const fetchAllUser = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_all_users);
      const filteredUsers = res.data.data.filter((user)=> user.Role.id != 1)
      setAllUsers(filteredUsers);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const updateStatusUser = async(id, status)=>{
    try {
      const res = await adminAxios.put(adminApiRoutes.update_status(id),{status})
      fetchAllUser()
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  useEffect(() => {
    fetchAllUser();
  }, []);
  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h4 className="card-title">All Users</h4>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table align-middle mb-0 table-hover table-centered">
                <thead className="bg-light-subtle">
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.length > 0 ? (
                    allUsers.map((user, index) => (
                      <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.firstName || "-"}</td>
                        <td>{user.email}</td>
                        <td>{user.phone || "-"}</td>
                        <td>
                          <span
                            className={`badge ${
                              user.isActive ? "bg-success" : "bg-danger"
                            }`}
                          >
                            {user.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              className="status-user-btn"
                              onClick={() => updateStatusUser(user.id,user.isActive ? false : true )}
                            >
                              {user.isActive? "Deactivate":"Activate"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center">
                        No users found.
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
  );
};

export default Users;
