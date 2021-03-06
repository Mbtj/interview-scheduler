import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  // initialize state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });


  const setDay = day => setState({ ...state, day });

  // Updates spots 
  function updateSpots(state, appointments, id) {
   // return an updated days array 
  let days = [...state.days];

  for (let day of days) {
    // Only change spots for specific day
    if (day.appointments.includes(id)) {
      let spotCount = 0; // initialize spot count

      // count appointments with no interview
      for (const id of day.appointments){
        const appointment = appointments[id];
        if (!appointment.interview) {
          spotCount++;
        }
      }
      day.spots = spotCount;
    }
  }
  return days;
  }

  useEffect(() => {
    Promise.all([
      axios.get("api/days"), // GET_DAYS
      axios.get("api/appointments"), // GET_APPOINTMENTS
      axios.get("api/interviewers") // GET_INTERVIEWERS
    ]).then((all) => {
      const [days, appointments, interviewers] = all.map(x => x.data);
      setState(prev =>
      ({
        ...prev,
        days,
        appointments,
        interviewers
      }));
    });
  }, []);

  // Creates new interview and updates our state
  function bookInterview(id, interview) {

    // set up appointment data
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // return promise 
    return axios.put(`api/appointments/${id}`, { interview })
      .then(() => {
        updateSpots(state, appointments, id);
        setState({
          ...state,
          appointments
        });
      });
  }

  // Deletes interview and updates our state
  function cancelInterview(id) {
    // set up appointment data
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // Return promise
    return axios.delete(`api/appointments/${id}`)
      .then(() => {
        updateSpots(state, appointments, id);
        setState({
          ...state,
          appointments
        });

      });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}