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
    const appointments = filteredDay[0].appointments;
    const interviews = Object.entries(state.appointments)
      .map((a) => a[1].interview)
      .filter(interview => interview !== null);

    const interviewerIDs = [...new Set(interviews.map(i => i.interviewer))];
    const interviewers = interviewerIDs.map(i => state.interviewers[i]);
    return interviewers;
  }
  return [];
}

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay }