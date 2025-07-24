import React from "react";
import { Modal } from "antd";
const ShowFullDescriptionModal = ({ open, onCancel, description }) => {
  return (
    <Modal open={open} onCancel={onCancel} footer={null}>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Full Description</h5>
        </div>
        <div className="modal-body">
          <p>{description}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ShowFullDescriptionModal;
