export function getAppointmentsForDay(state, day) {
  const appointments = [];

  for (let i = 0; i < state.days.length; i++) {
    if (state.days[i].name === day) {
      appointments.push(...state.days[i].appointments);
    }
  }
  const appointmentsForDay = appointments.map(x => state.appointments[x]);
  
  return (
    appointmentsForDay
  )
};

export function getInterview(state, interview) {
  console.log("state:", state);
  console.log("interview:", interview);
  
  const interviewObject = (interview) ? {} : null;
  
  if (interview) {
    interviewObject.interviewer = state.interviewers[interview.interviewer]
    interviewObject.student = interview.student;
  } 
  console.log(interviewObject);

  return interviewObject;
}