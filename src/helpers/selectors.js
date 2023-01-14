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

export function getInterview(state, interview) {
  const interviewObject = (interview) ? {} : null;
  
  if (interview) {
    interviewObject.interviewer = state.interviewers[interview.interviewer]
    interviewObject.student = interview.student;
  } 

  return interviewObject;
}