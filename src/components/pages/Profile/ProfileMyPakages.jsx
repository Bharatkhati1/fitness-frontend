import React from "react";

import watchicon from "../../../../public/assets/img/watchicon.png";
import calendericon from "../../../../public/assets/img/calendericon.png";

function ProfileMyPakages({userPackages}) {
  console.log(userPackages)
  return (
    <>
      <div className="CardBody">
        <div className="pakagesbox mb-4">
          <div className="pakagehead">
            <div className="row">
              <div className="col">
                <div className="pakageheadtitle">
                  <h4>hypertension: Smart HEalth Package - 3 months</h4>
                  <span>disease management</span>
                </div>
              </div>

              <div className="col-auto">
                <div className="pakageheadbtn">
                  <a className="xs-btn">Active</a>
                </div>
              </div>
            </div>
          </div>

          <div className="pakagebody">
            <div className="row ">
              <div className="col d-flex align-items-center">
                <figure className="me-1">
                  <img src={watchicon} />
                </figure>
                <span>Duration: 6 Months</span>
              </div>
              <div className="col d-flex align-items-center">
                <figure className="me-1">
                  <img src={calendericon} />
                </figure>
                <span>Start: 20 June 2025</span>
              </div>
              <div className="col d-flex align-items-center">
                <figure className="me-1">
                  <img src={calendericon} />
                </figure>
                <span>End: 20 December 2025</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pakagesbox mb-4">
          <div className="pakagehead">
            <div className="row">
              <div className="col">
                <div className="pakageheadtitle">
                  <h4>hypertension: Smart HEalth Package - 3 months</h4>
                  <span>disease management</span>
                </div>
              </div>

              <div className="col-auto">
                <div className="pakageheadbtn">
                  <a className="xs-btn">Active</a>
                </div>
              </div>
            </div>
          </div>

          <div className="pakagebody">
            <div className="row ">
              <div className="col d-flex align-items-center">
                <figure className="me-1">
                  <img src={watchicon} />
                </figure>
                <span>Duration: 6 Months</span>
              </div>
              <div className="col d-flex align-items-center">
                <figure className="me-1">
                  <img src={calendericon} />
                </figure>
                <span>Start: 20 June 2025</span>
              </div>
              <div className="col d-flex align-items-center">
                <figure className="me-1">
                  <img src={calendericon} />
                </figure>
                <span>End: 20 December 2025</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pakagesbox mb-4">
          <div className="pakagehead">
            <div className="row">
              <div className="col">
                <div className="pakageheadtitle">
                  <h4>hypertension: Smart HEalth Package - 3 months</h4>
                  <span>disease management</span>
                </div>
              </div>

              <div className="col-auto">
                <div className="pakageheadbtn">
                  <a className="xs-btn">Active</a>
                </div>
              </div>
            </div>
          </div>

          <div className="pakagebody">
            <div className="row ">
              <div className="col d-flex align-items-center">
                <figure className="me-1">
                  <img src={watchicon} />
                </figure>
                <span>Duration: 6 Months</span>
              </div>
              <div className="col d-flex align-items-center">
                <figure className="me-1">
                  <img src={calendericon} />
                </figure>
                <span>Start: 20 June 2025</span>
              </div>
              <div className="col d-flex align-items-center">
                <figure className="me-1">
                  <img src={calendericon} />
                </figure>
                <span>End: 20 December 2025</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pakagesbox mb-4">
          <div className="pakagehead">
            <div className="row">
              <div className="col">
                <div className="pakageheadtitle">
                  <h4>hypertension: Smart HEalth Package - 3 months</h4>
                  <span>disease management</span>
                </div>
              </div>

              <div className="col-auto">
                <div className="pakageheadbtn">
                  <a className="xs-btn sx-btn-info">Completed</a>
                </div>
              </div>
            </div>
          </div>

          <div className="pakagebody">
            <div className="row ">
              <div className="col d-flex align-items-center">
                <figure className="me-1">
                  <img src={watchicon} />
                </figure>
                <span>Duration: 6 Months</span>
              </div>
              <div className="col d-flex align-items-center">
                <figure className="me-1">
                  <img src={calendericon} />
                </figure>
                <span>Start: 20 June 2025</span>
              </div>
              <div className="col d-flex align-items-center">
                <figure className="me-1">
                  <img src={calendericon} />
                </figure>
                <span>End: 20 December 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileMyPakages;
