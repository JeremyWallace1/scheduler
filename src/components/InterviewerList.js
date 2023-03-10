import React from "react";
import PropTypes from 'prop-types';

import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss";


// holds a list of interviewers (holds all the InterviewerListItem components together)
/* Props received are:
  * Interviewers
  * value
  * onChange function
*/
const InterviewerList = (props) => {
  const mapInterviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem 
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">
        Interviewer
      </h4>
      <ul className="interviewers__list">
        {mapInterviewers}
      </ul>
    </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;