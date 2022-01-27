function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(date => date.name === day);
  if (filteredDay.length > 0) {
    const appoinmentIDs = filteredDay[0].appointments;
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

  return { student: interview.student, interviewer };

}

function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(date => date.name === day);

  if (filteredDay.length > 0) {
    const interviewerIDs = filteredDay[0].interviewers;
    const interviewers = interviewerIDs.map(id => state.interviewers[id]);
    return interviewers
  }
  return [];
}

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay }