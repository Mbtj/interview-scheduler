function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(date => date.name === day);
  if (filteredDay.length > 0) {
    const appoinmentIDs = filteredDay[0].appointments;
    console.log(appoinmentIDs);
    return appoinmentIDs.map(id => state.appointments[id]);
  } else {
    return [];
  }
}

module.exports = { getAppointmentsForDay }