import React from "react";

import useApplicationData from "hooks/useApplicationData";

import DayList from "components/DayList";
import Appointment from "./Appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

import "components/Application.scss";

// Application takes in our hooks from hooks/useApplicationData.jsx
const Application = () => {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();


  // dailyAppointments shows the appointments for each day, using our helper functions in helpers/selectors.js
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  // schedule maps through our dailyAppointments to get each individual interview and available interviewers for each day which are passed to the Appointment component for rendering to the screen
  const schedule = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);
    return (
      <Appointment 
        key={appointment.id}
        {...appointment}
        {...interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  // The DayList component is rendered to the screen, passed in state values and the setDay function.
  // The Appointment components are rendered from the schedule object (above)
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />      
      </section>
      <section className="schedule">
        <ul>
          {schedule}
          <Appointment 
            key="last" 
            time="5pm" 
          />
        </ul>
      </section>
    </main>
  );
};

export default Application;