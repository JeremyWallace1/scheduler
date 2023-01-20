// the getAppointmentsForDay function uses the days state object and pushes them into a new appointments array, then maps through that array to get the appontments for each individual day.
export function getAppointmentsForDay(state, day) {
  const appointments = [];

  for (let i in state.days) {
    if (state.days[i].name === day) {
      appointments.push(...state.days[i].appointments);
    }
  }
  const appointmentsForDay = appointments.map(x => state.appointments[x]);
  
  return (
    appointmentsForDay
  )
};

// the getInterviewersForDay function maps through the days state to produce the interviewers available for each day.
export function getInterviewersForDay(state, day) {
  const interviewers = [];

  for (let i in state.days) {
    if (state.days[i].name === day) {
      interviewers.push(...state.days[i].interviewers);
    }
  }
  const interviewersForDay = interviewers.map(x => state.interviewers[x]);
  
  return (
    interviewersForDay
  )
};

// the getInterview function is passed an interview object. if there is an interview it returns the interviewer and student
export function getInterview(state, interview) {
  const interviewObject = (interview) ? {} : null;
  
  if (interview) {
    interviewObject.interviewer = state.interviewers[interview.interviewer]
    interviewObject.student = interview.student;
  } 

  return interviewObject;
};