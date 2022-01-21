function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(date => date.name === day);
  return filteredDay.appointments;
}

module.exports = { getAppointmentsForDay }