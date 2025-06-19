import React from "react";

import watchicon from "../../../../public/assets/img/watchicon.png";
import calendericon from "../../../../public/assets/img/calendericon.png";
import durationicon from "../../../../public/assets/img/durationicon.png";

function MyConsultation({ consultations }) {
  console.log(consultations);
  return (
    <>
      <div className="CardBody">
        {consultations?.map((consul) => {
          const bookingStart = new Date(consul.bookingStart);
          const now = new Date();
          const isCompleted = bookingStart < now;

          const formattedDate = bookingStart.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });

          const formattedTime = bookingStart.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });

          return (
            <div className="pakagesbox myconsultation mb-4" key={consul.id}>
              <div className="pakagehead">
                <div className="row">
                  <div className="col">
                    <div className="pakageheadtitle">
                      <h4>{consul?.Consultant?.name}</h4>
                      <span>{consul?.Consultant?.expertise}</span>
                      <p className="mb-0 mt-1">{consul.Package.Service.name}</p>
                    </div>
                  </div>

                  <div className="col-auto">
                    <div className="pakageheadbtn">
                      {isCompleted ? (
                        <span className="xs-btn sx-btn-info">Completed</span>
                      ) : (
                        <span className="xs-btn sx-btn-warning">Upcoming</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pakagebody">
                <div className="row">
                  <div className="col d-flex align-items-center">
                    <figure className="me-1">
                      <img src={calendericon} alt="calendar" />
                    </figure>
                    <span>{formattedDate}</span>
                  </div>
                  <div className="col d-flex align-items-center">
                    <figure className="me-1">
                      <img src={watchicon} alt="clock" />
                    </figure>
                    <span>{formattedTime}</span>
                  </div>
                  <div className="col d-flex align-items-center">
                    <figure className="me-1">
                      <img src={durationicon} alt="duration" />
                    </figure>
                    <span>Duration: 15 min</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default MyConsultation;
