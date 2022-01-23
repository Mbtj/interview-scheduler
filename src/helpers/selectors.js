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

  return { student: interview.student, interviewer };

}

function getInterviewersForDay(state, day) {
  // const filteredDay = state.days.filter(date => date.name === day);
  // if (filteredDay.length > 0) {
  //   const appoinmentIDs = filteredDay[0].appointments;
  //   const appointments = appoinmentIDs.map(id => state.appointments[id]);

  // } else {
  //   return [];
  // }
  const appointments = getAppointmentsForDay(state, day);

  // Map appointments only for existing interviews
  const interviewers = (
    appointments
      .filter((appointment) => appointment.interview !== null)
      .map((appointment) => getInterview(state, appointment.interview).interviewer)
  );
  
  // return array of unique interviewers
  return [...new Set(interviewers)];
}

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay }