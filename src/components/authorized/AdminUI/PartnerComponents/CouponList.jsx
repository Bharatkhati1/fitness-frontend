import React from "react";

const CouponList = () => {
  return (
    <div class="col-xxl-7">
      <div class="card">
        <div class="card-body">
          <div dir="ltr">
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h4 className="card-title">All Coupons</h4>
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
                        <tbody>
                          <tr>
                            <td>{1}</td>
                            <td>ds</td>
                            <td>ssss</td>
                            <td>qww</td>
                            <td>q</td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponList;
