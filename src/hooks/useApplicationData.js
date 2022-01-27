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
  function updateSpots(id, addorRemove) {
    // The change made to spots
    const change = addorRemove ? -1 : 1;
    let days = [...state.days];

    for (let day of days) {
      // Only change spots for specific day
      if (day.appointments.includes(id)) {
        day.spots += change;
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
        const days = updateSpots(id, true);
        setState({
          ...state,
          appointments,
          days
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
        const days = updateSpots(id, false);
        setState({
          ...state,
          appointments,
          days
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