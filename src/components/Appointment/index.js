import useVisualMode from "hooks/useVisualMode";

import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

import "./styles.scss";

const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview);
    transition(SHOW);
  };

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && 
        <Empty 
          onAdd={() => transition(CREATE, true)} 
        />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interviewer.name}
        />
      )}
      {mode === CREATE && 
        <Form 
          interviewers={props.interviewers} 
          onCancel={() => back()} 
          onSave={save} 
        />}
    </article>
  )
};

export default Appointment;