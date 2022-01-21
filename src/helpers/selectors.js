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

function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewerID = interview.interviewer;
  const interviewer = state.interviewers[interviewerID];

  return { student: interview.student, interviewer};

}

module.exports = { getAppointmentsForDay, getInterview }