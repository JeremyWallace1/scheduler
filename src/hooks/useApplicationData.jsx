import { useState, useEffect } from "react";

import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });

  const updateSpots = (state, appointments, id) => {
    const newDays = JSON.parse(JSON.stringify(state.days));
    for (let day in newDays) {
      let count = 0;
      for (let i = 0; i < newDays[day].appointments.length; i++) {
        for (let appointment in appointments) {
          if (newDays[day].appointments[i].toString() === appointment) {
            if (appointments[appointment].interview) {
              count++;
            }
          }
        }
      }
      newDays[day].spots = 5 - count;
    }
    return newDays;
  };

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
      const days = updateSpots(state, appointments, id)
      setState({...state, appointments, days});
    })
  };

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
      const days = updateSpots(state, appointments, id)
      setState({...state, appointments, days});
    })
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