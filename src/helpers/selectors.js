// gets appointment data for specified day
function getAppointmentsForDay(state, day) {
  // find data for specified day
  const filteredDay = state.days.filter(date => date.name === day);
  if (filteredDay.length > 0) {
    const appoinmentIDs = filteredDay[0].appointments; 
    return appoinmentIDs.map(id => state.appointments[id]);
  } else {
    return [];
  }
}

// Gets complete interview data
function getInterview(state, interview) {
  // Case: interview does not exist
  if (!interview) {
    return null;
  }

  const interviewerID = interview.interviewer;
  const interviewer = state.interviewers[interviewerID];

  return { student: interview.student, interviewer };

}

// gets interviewers data for specified day
function getInterviewersForDay(state, day) {
  // find data for specified day
  const filteredDay = state.days.filter(date => date.name === day);

  if (filteredDay.length > 0) {
    const interviewerIDs = filteredDay[0].interviewers;
    const interviewers = interviewerIDs.map(id => state.interviewers[id]);
    return interviewers
  }
  return [];
}

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay }