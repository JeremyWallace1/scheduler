import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

// each individual Interviewer in the InterviewerList
const InterviewerListItem = (props) => {
  const itemClass = classNames('interviewers__item', { "interviewers__item--selected": props.selected});

  return (
    <li 
      onClick={props.setInterviewer} 
      className={itemClass}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected ? <span>{props.name}</span> : ""}
    </li>
  )
};

export default InterviewerListItem;