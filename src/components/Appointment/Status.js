import React from "react";

// the status is showwn when saving or deleting and is passed one prop, the message from Appointment/index.js
const Status = (props) => {
  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{props.message}</h1>
    </main>
  );
};

export default Status;