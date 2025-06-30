import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import moment from 'moment';

const UsageDetails = ({ open, setOpen, selectedCouponUsage=[] }) => {
  return (
    <Modal
      title="Coupon Usage Details"
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width={800}
    >
      <div className="table-responsive">
        <table className="table align-middle mb-0 table-hover table-centered">
          <thead className="bg-light-subtle">
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Used At</th>
              <th>Discount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {(
              selectedCouponUsage.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.User.name}</td>
                  <td>{moment(item.createdAt).format('DD-MM-YYYY HH:mm')}</td>
                  <td>₹{Number(item.couponDiscount).toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default UsageDetails;
