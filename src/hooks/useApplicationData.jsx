import { useState, useEffect } from "react";

import axios from "axios";

// the useApplicationData hook sets the states of the day, days, interviewers and appointments.
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    interviewers: {},
    appointments: {}
  });

  // sets the currently selected day
  const setDay = day => setState({ ...state, day });

  // updates the number of spots remaining on each day
  const updateSpots = (state, appointments) => {
    const dayObj = state.days.find(d => d.name === state.day);

    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    const day = {...dayObj, spots};
    return state.days.map(d => d.name === state.day ? day: d);
  };

  // stores the interview in the database (using axios.put)
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      const days = updateSpots(state, appointments)
      setState({...state, appointments, days});
    })
  };

  // deletes the interview in the database (using axios.delete)
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
    .then((response) => {
      const days = updateSpots(state, appointments)
      setState({...state, appointments, days});
    })
  };

  // gets all the days, appointments and interviewers for the app and sets their states
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, [setState]);


  return { state, setDay, bookInterview, cancelInterview };
};