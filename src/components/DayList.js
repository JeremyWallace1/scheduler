/* Our <DayList> component will take in three props.

- days: Array an array of objects (each object represents a day and includes an id, name, and spots)
- day: String the currently selected day
- setDay: Function sets the currently selected day and accepts the name of the day eg. "Monday", "Tuesday" */

import React from "react";
import DayListItem from "components/DayListItem.js";

export default function DayList(props) {

  const formatSpots = (props) => {
    let spotsRemaining = "";
    switch (props.spots){
      case 0:
        spotsRemaining = "no spots remaining";
        break;
      case 1:
        spotsRemaining = "1 spot remaining";
        break;
      default:
        spotsRemaining = `${props.spots} spots remaining`;
    }
    return spotsRemaining;
  };

  // iterate over the props.days array to get individual DayListItem <li>'s displayed
  const mapDays = props.days.map((day) =>
    <DayListItem 
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.value}
      setDay={props.onChange}
      formatSpots={formatSpots}
    />
  );

  return (
    <ul>
      {mapDays}
    </ul>
  );
};