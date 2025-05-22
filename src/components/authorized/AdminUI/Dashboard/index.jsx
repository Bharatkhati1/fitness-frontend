import React from "react";

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xxl-5">
          <div className="row">
            <div className="col-12">
              <div className="alert alert-primary text-truncate mb-3" role="alert">
                We regret to inform you that our server is currently
                experiencing technical difficulties.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
