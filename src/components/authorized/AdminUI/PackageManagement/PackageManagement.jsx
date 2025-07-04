import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationPopup from "../Popups/ConfirmationPopup.jsx";
import { toast } from "react-toastify";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes.jsx";
import adminAxios from "../../../../utils/Api/adminAxios.jsx";
import { useSelector } from "react-redux";

const PackageManagement = () => {
  const navigate = useNavigate();
  const { type = "admin" } = useSelector((state) => state.auth);
  const [packages, setPackage] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [filterPackages, setFilterPackages] = useState([]);

  const fetchAllPackage = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_package);
      const filter = res.data.data.filter((res) => res.id != 1);
      setPackage(filter);
      setFilterPackages(filter);
    } catch (error) {
      console.error("Failed to fetch packages:", error);
      toast.error(error.response.data.message);
    }
  };

  const deletePackage = async (id) => {
    try {
      let Id = selectedPackageId || id;
      await adminAxios.delete(adminApiRoutes.delete_package(Id));
      toast.success("Deleted Successfully");
      fetchAllPackage();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleSearch = (search) => {
    if (search.length > 0) {
      const filterValue = packages.filter((val) =>
        val.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilterPackages(filterValue);
    } else {
      setFilterPackages(packages);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const reordered = Array.from(packages);
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);
    setPackage(reordered);
    const reordeObj = reordered.map((order, index) => ({
      id: order.id,
      order: index + 1,
    }));
    try {
      // Send the new order to the backend
      await adminAxios.put(adminApiRoutes.update_packages_sequence, {
        sequences: reordeObj,
      });
      fetchAllPackage();
      toast.success("Package order updated successfully");
    } catch (error) {
      console.error("Failed to update order:", error);
      toast.error("Failed to update package order");
      // Revert to the original order if the API call fails
      fetchAllPackage();
    }
  };

  useEffect(() => {
    fetchAllPackage();
  }, []);
  return (
    <>
      <div className="add-package-btn">
        <Link to={`/${type}/service-management/create-update-package`}>
          + Add Package
        </Link>
      </div>
      <div className="d-flex justify-content-end mb-3">
        <input
          className="w-50"
          placeholder="Search here"
          onChange={(e) => handleSearch(e.target.value)}
          style={{ marginLeft: "20px" }}
        />
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">All Packages</h4>{" "}
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Short Description</th>
                      <th>Service Name</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <DragDropContext onDragEnd={handleDragEnd}>
                    {filterPackages.length > 0 && (
                      <Droppable droppableId={"droppable"} direction="vertical">
                        {(provided) => (
                          <tbody
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            {filterPackages.map((item, index) => (
                              <Draggable
                                key={item.id.toString()}
                                draggableId={item.id.toString()}
                                index={index}
                              >
                                {(provided) => (
                                  <tr
                                    key={index}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      ...provided.draggableProps.style,
                                      display: "table-row",
                                    }}
                                  >
                                    <td>{index + 1}</td>
                                    <td>
                                      <Link target="_blank" to={item.image_url}>
                                        {" "}
                                        <img
                                          crossorigin="anonymous"
                                          src={item.image_url}
                                          alt="Package"
                                          style={{
                                            width: "50px",
                                            height: "50px",
                                            objectFit: "contain",
                                            border: "1px solid #eee",
                                          }}
                                          onError={(e) => {
                                            console.error(
                                              "Image failed to load:",
                                              item.image_url
                                            );
                                          }}
                                        />
                                      </Link>
                                    </td>
                                    <td>{item?.name}</td>
                                    <td
                                      dangerouslySetInnerHTML={{
                                        __html: item?.shortDescription,
                                      }}
                                    ></td>
                                    <td>{item?.Service?.name}</td>
                                    <td>
                                      <span
                                        className={`badge ${
                                          item.isActive
                                            ? "bg-success"
                                            : "bg-danger"
                                        }`}
                                      >
                                        {item.isActive ? "Active" : "Inactive"}
                                      </span>
                                    </td>
                                    <td>
                                      <div class="d-flex gap-2">
                                        <button
                                          class="btn btn-soft-primary btn-sm"
                                          onClick={() =>
                                            navigate(
                                              `/${type}/service-management/create-update-package?id=${item.id}&isEdit=true`
                                            )
                                          }
                                        >
                                          <iconify-icon
                                            icon="solar:pen-2-broken"
                                            class="align-middle fs-18"
                                          ></iconify-icon>
                                        </button>

                                        <ConfirmationPopup
                                          bodyText="Are you sure you want to delete this Package ?"
                                          title="Delete Package"
                                          onOk={() => deletePackage(item.id)}
                                          buttonText={
                                            <iconify-icon
                                              icon="solar:trash-bin-minimalistic-2-broken"
                                              class="align-middle fs-18"
                                              onClick={() =>
                                                setSelectedPackageId(item.id)
                                              }
                                            ></iconify-icon>
                                          }
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </tbody>
                        )}
                      </Droppable>
                    )}
                  </DragDropContext>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PackageManagement;
