import useVisualMode from "hooks/useVisualMode";

import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import "./styles.scss";

// The Appointment/index.js renders a different Appointment object depending on the state of the Appointment (EMPTY, SHOW, CREATE, SAVING, etc.)
const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  // if there is an interview, show it, otherwise just an empty style Appointment block (add button) (uses hooks/useVisualMode.jsx to set state)
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  // save function for saving the student name and interviewer (bookInterview passed from Application.js which imports it from hooks/useApplicationData.jsx)
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => {
        console.log('error:', error)
        transition(ERROR_SAVE, true);
      })
  };

  // deletes the currently selected interview (cancelInterview passed from Application.js which imports it from hooks/useApplicationData.jsx)
  const destroy = (event) => {
    transition(DELETING, true);

    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        transition(ERROR_DELETE, true);
      })
  };

  // confirm before deleting appointment
  const confirmDestroy = () => {
    transition(CONFIRM)
  };

  // change to editing mode for an appointment
  const editAppointment = () => {
    transition(EDIT)
  };

  return (
    <article 
      className="appointment"
      data-testid="appointment"
    >
      <Header time={props.time}/>
      {mode === EMPTY && 
        <Empty 
          onAdd={() => transition(CREATE, true)} 
        />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interviewer.name}
          onEdit={editAppointment}
          onDelete={confirmDestroy}
        />
      )}
      {mode === CREATE && 
        <Form 
          interviewers={props.interviewers} 
          onCancel={back} 
          onSave={save} 
        />}
      {mode === SAVING &&
        <Status 
          message='Saving'
        />
      }
      {mode === DELETING &&
        <Status 
          message='Deleting'
        />
      }
      {mode === CONFIRM &&
        <Confirm 
          message='Are you sure you would like to delete?'
          onCancel={back}
          onConfirm={destroy}
        />
      }
      {mode === EDIT && 
        <Form 
          student={props.interview.student}
          interviewer={props.interviewer.id}
          interviewers={props.interviewers} 
          onCancel={back} 
          onSave={save} 
        />
      }
      {mode === ERROR_SAVE &&
        <Error
          message='Error Saving Appointment'
          onClose={back}
        />
      }
      {mode === ERROR_DELETE &&
        <Error
          message='Error Deleting Appointment'
          onClose={back}
        />
      }
    </article>
  );
};

export default Appointment;