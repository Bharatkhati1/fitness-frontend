import React from "react";

const Dashboard = () => {
  const Cards = [
    {
      name: "Current Balance",
      value: 283267,
    },
    {
      name: "Total Earnings",
      value: 54638374,
    },
    {
      name: "Upcoming Appointments",
      value: 12,
    },
    {
      name: "Total Appointments",
      value: 242,
    },
  ];
  return (
    <div class="row">
      <div class="col-xxl-5">
        <div class="row">
          {Cards.map((card) => (
            <div class="col-md-6">
              <div class="card overflow-hidden">
                <div class="card-body">
                  <div class="row">
                    <div class="col-6">
                      <div class="avatar-md bg-soft-primary rounded">
                        <iconify-icon
                          icon="solar:cart-5-bold-duotone"
                          class="avatar-title fs-32 text-primary"
                        ></iconify-icon>
                      </div>
                    </div>
                    <div class="col-6 text-end">
                      <p class="text-muted mb-0 text-truncate">{card.name}</p>
                      <h3 class="text-dark mt-1 mb-0">{card.value}</h3>
                    </div>
                  </div>
                </div>
                {/* <div class="card-footer py-2 bg-light bg-opacity-50">
                  <div class="d-flex align-items-center justify-content-between">
                    <div>
                      <span class="text-success">
                        {" "}
                        <i class="bx bxs-up-arrow fs-12"></i> 2.3%
                      </span>
                      <span class="text-muted ms-1 fs-12">Last Week</span>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div class="col-xxl-7">
        <div class="card">
          <div class="card-body">
            <div dir="ltr">
              <div className="row">
                <div className="col-xl-12">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h4 className="card-title">All Appointments</h4>
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
    </div>
  );
};

export default Dashboard;
