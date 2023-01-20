import React from "react";

// if there is no appointment we see the Empty component which is passed the onAdd function as a prop from Appointment/index.js
const Empty = (props) => {
  return (
    <main className="appointment__add">
      <img 
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
};

export default Empty;