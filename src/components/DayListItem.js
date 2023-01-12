import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

// takes in three attributes (name, spots, selected) and one action (setDay)
const DayListItem = (props) => {
  const dayClass = classNames('day-list__item', { "day-list__item--selected": props.selected, "day-list__item--full": props.spots === 0 });

  const FormatSpots = (props) => {
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

  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass} selected={props.selected}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light"><FormatSpots /></h3>
    </li>
  );
};

export default DayListItem;