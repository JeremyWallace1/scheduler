export function getAppointmentsForDay(state, day) {
  const appointments = [];

  for (let i = 0; i < state.days.length; i++) {
    if (state.days[i].name === day) {
      appointments.push(...state.days[i].appointments);
      console.log("appointments:", appointments);
    }
  }
  const appointmentsForDay = appointments.map(x => state.appointments[x]);
  
  return (
    appointmentsForDay
  )
};