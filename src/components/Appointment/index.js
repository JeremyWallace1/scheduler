import useVisualMode from "hooks/useVisualMode";

import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

import "./styles.scss";

const Appointment = (props) => {
  // console.log('props:', props);

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    })
  };

  const cancel = () => {
    transition(DELETING);
    props.cancelInterview(props.id).then(() => {
      transition(EMPTY);
    })
  };

  const confirmCancel = () => {
    transition(CONFIRM)
  };

  const editAppointment = () => {
    transition(EDIT)
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
          onEdit={() => editAppointment()}
          onDelete={() => confirmCancel()}
        />
      )}
      {mode === CREATE && 
        <Form 
          interviewers={props.interviewers} 
          onCancel={() => back()} 
          onSave={save} 
        />}
      {mode === SAVING &&
        <Status message='Saving'/>
      }
      {mode === DELETING &&
        <Status message='Deleting'/>
      }
      {mode === CONFIRM &&
        <Confirm 
          message='Are you sure you would like to delete?'
          onCancel={() => back()}
          onConfirm={cancel}
        />
      }
      {mode === EDIT && 
        <Form 
          student={props.interview.student}
          interviewer={props.interviewer.id}
          interviewers={props.interviewers} 
          onCancel={() => back()} 
          onSave={save} 
        />
      }
    </article>
  )
};

export default Appointment;