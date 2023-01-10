/* Our <DayList> component will take in three props.

- days: Array an array of objects (each object represents a day and includes an id, name, and spots)
- day: String the currently selected day
- setDay: Function sets the currently selected day and accepts the name of the day eg. "Monday", "Tuesday" */

import React from "react";
import DayListItem from "components/DayListItem.js";

export default function DayList(props) {
  // iterate over the props.days array to get individual DayListItem <li>'s displayed
  const mapDays = props.days.map((day) =>
    <DayListItem 
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay}
    />
  );

  return (
    <ul>
      {mapDays}
    </ul>
  );
};