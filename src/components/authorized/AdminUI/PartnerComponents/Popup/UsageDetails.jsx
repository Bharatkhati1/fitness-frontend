import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import moment from 'moment';

const UsageDetails = ({ open, setOpen, id }) => {
  const [usageDetails, setUsageDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsageDetails = async () => {
    try {
      setLoading(true);
      // Replace this with actual API call
      // const res = await yourAxios.get(`/api/usage-details/${id}`);
      // setUsageDetails(res.data);

      // Mock data
      const mockData = [
        { username: 'john_doe', usedAt: '2025-06-17T10:30:00Z', discount: 120.5 },
        { username: 'jane_smith', usedAt: '2025-06-15T14:15:00Z', discount: 85.25 },
      ];
      setUsageDetails(mockData);
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Failed to fetch usage details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id && open) {
      fetchUsageDetails();
    }
  }, [id, open]);

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
            {usageDetails.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-3">
                  {loading ? 'Loading...' : 'No usage data available'}
                </td>
              </tr>
            ) : (
              usageDetails.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{moment(item.usedAt).format('DD-MM-YYYY HH:mm')}</td>
                  <td>₹{Number(item.discount).toFixed(2)}</td>
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
