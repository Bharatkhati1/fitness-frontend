import React from "react";

import watchicon from "../../../../public/assets/img/watchicon.png";
import calendericon from "../../../../public/assets/img/calendericon.png";
import moment from "moment";

function ProfileMyPakages({ userPackages }) {
  return (
    <>
      <div className="CardBody">
        {userPackages.map((pkg) => (
          <div className="pakagesbox mb-4">
            <div className="pakagehead">
              <div className="row">
                <div className="col">
                  <div className="pakageheadtitle">
                    <h4>{pkg?.serviceName}</h4>
                    <span>{pkg?.planName}</span>
                  </div>
                </div>

                <div className="col-auto">
                  <div className="pakageheadbtn">
                    <a className={`xs-btn ${pkg.isExpired && `sx-btn-info`}`}>
                      {pkg.isExpired ? "Completed" : "Active"}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pakagebody">
              <div className="row">
                <div className="col d-flex align-items-center">
                  <figure className="me-1">
                    <img src={watchicon} />
                  </figure>
                  <span>Duration: {pkg?.duration} Months</span>
                </div>
                <div className="col d-flex align-items-center">
                  <figure className="me-1">
                    <img src={calendericon} />
                  </figure>
                  <span>
                    Start: {moment(pkg.startDate).format("DD MMM YYYY")}
                  </span>
                </div>
                {pkg.endDate && (
                  <div className="col d-flex align-items-center">
                    <figure className="me-1">
                      <img src={calendericon} />
                    </figure>
                    <span>
                      End: {moment(pkg.endDate).format("DD MMM YYYY")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {userPackages.length == 0 && (
          <div className="col-12 text-center py-5">
            <h5 className="mb-5 mt-4">No data found.</h5>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileMyPakages;
