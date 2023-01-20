import React from "react";

// the Header is on every Appointment block and shows the time (from props passed by Appointment/index.js)
const Header = (props) => {
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
    </header>
  );
};

export default Header;