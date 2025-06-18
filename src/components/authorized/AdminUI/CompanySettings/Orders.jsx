import React, { useEffect, useState } from "react";
import adminAxios from "../../../../utils/Api/adminAxios";
import adminApiRoutes from "../../../../utils/Api/Routes/adminApiRoutes";
import { toast } from "react-toastify";

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const res = await adminAxios.get(adminApiRoutes.get_all_orders);
      setAllOrders(res.data.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  
  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h4 className="card-title">All Orders</h4>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="bg-light-subtle">
                  <tr>
                    <th>Order Id</th>
                    <th>Buyer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {allOrders.length ? (
                    allOrders.map((item, index) => (
                      <tr key={item.orderId}>
                        <td>{item.orderId}</td>
                        <td>{item.User.name}</td>
                        <td>₹{item.totalAmount}</td>
                        <td>{item?.status}</td>
                        <td>
                          {new Date(item?.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No data found.
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

export default AllOrders;
