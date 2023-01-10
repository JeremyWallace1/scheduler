import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

// takes in three attributes (name, spots, selected) and one action (setDay)
export default function DayListItem(props) {
  const dayClass = classNames('day-list__item', { "day-list__item--selected": props.selected, "day-list__item--full": props.spots === 0 });

  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass} selected={props.selected}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.formatSpots()}</h3>
    </li>
  );
}