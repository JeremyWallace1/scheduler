import { useState, useEffect } from "react";

import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });

  const spotsRemaining = (day, add=true) => {
    const newDays = [];
    for (let i of state.days) {
      if (i.name === day) {
        if (add) {
          i.spots += 1;
        } else {
          i.spots -= 1;
        }
      }
      newDays.push(i);
    }
    setState(prev => ({...prev, newDays }));
  }

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
    .then((response) => {
      setState({...state, appointments});
    })
    .then((response) => spotsRemaining(state.day, false))
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.delete(`/api/appointments/${id}`)
    .then((response) => {
      setState({...state, appointments});
    })
    .then((response) => spotsRemaining(state.day, true))
  };

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