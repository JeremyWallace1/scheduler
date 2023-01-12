import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

// holds a list of interviewers (holds all the InterviewerListItem components together)
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