import React from "react";
import { Modal } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ConsultnatSelectedModal = ({ show, handleClose, consultants = [] }) => {
  const handleDragEnd = (result) => {
    console.log(result);
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>Consultants Selected</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {consultants.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="bg-light-subtle">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                </tr>
              </thead>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided) => (
                    <tbody ref={provided.innerRef} {...provided.droppableProps}>
                      {consultants.map((consultant, index) => (
                        <Draggable
                          key={consultant.id || index}
                          draggableId={consultant.id || index}
                          index={index}
                        >
                          {(provided) => (
                            <tr
                              key={consultant.id || index}
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
                                <div className="d-flex align-items-center">
                                  <img
                                    src={
                                      consultant.profileImage ||
                                      "/src/components/authorized/UserUI/Header/Profile_icon.png"
                                    }
                                    alt={consultant.name}
                                    className="rounded-circle me-2"
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      objectFit: "cover",
                                    }}
                                    onError={(e) => {
                                      e.target.src =
                                        "/src/components/authorized/UserUI/Header/Profile_icon.png";
                                    }}
                                  />
                                  <div>
                                    <h6 className="mb-0">
                                      {consultant.name || "N/A"}
                                    </h6>
                                    {consultant.specialization && (
                                      <small className="text-muted">
                                        {consultant.specialization}
                                      </small>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td>
                                {consultant.email ? (
                                  <a
                                    href={`mailto:${consultant.email}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-decoration-none"
                                  >
                                    {consultant.email}
                                  </a>
                                ) : (
                                  <span className="text-muted">
                                    Not available
                                  </span>
                                )}
                              </td>
                              <td>
                                {consultant.phone ? (
                                  <a
                                    href={`tel:${consultant.phone}`}
                                    className="text-decoration-none"
                                  >
                                    {consultant.phone}
                                  </a>
                                ) : (
                                  <span className="text-muted">
                                    Not available
                                  </span>
                                )}
                              </td>
                              <td>
                                <span
                                  className={`badge ${
                                    consultant.isActive
                                      ? "bg-success"
                                      : consultant.status === "inactive"
                                      ? "bg-danger"
                                      : "bg-warning"
                                  }`}
                                >
                                  {consultant.isActive
                                    ? "Active"
                                    : consultant.status === "inactive"
                                    ? "Inactive"
                                    : consultant.status || "Pending"}
                                </span>
                              </td>
                            </tr>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </tbody>
                  )}
                </Droppable>
              </DragDropContext>
            </table>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="mb-3">
              <i className="fas fa-users fa-3x text-muted"></i>
            </div>
            <h5 className="text-muted">No Consultants Selected</h5>
            <p className="text-muted">
              No consultants have been assigned to this package yet.
            </p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConsultnatSelectedModal;
