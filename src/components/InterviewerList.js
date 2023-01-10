import React, { useState } from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

// holds a list of interviewers (holds all the InterviewerListItem components together)
export default function InterviewerList(props) {
  const mapInterviewers = props.interviewers.map((interviewer) =>
    <InterviewerListItem 
      key={interviewer.id}
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={props.setInterviewer}
    />
  );

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">
        Interviewer
      </h4>
      <ul className="interviewers__list">
        {mapInterviewers}
      </ul>
    </section>
  )
};
