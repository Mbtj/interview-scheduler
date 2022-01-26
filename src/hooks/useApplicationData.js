import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
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
      // console.log(all[0]); // first
      // console.log(all[1]); // second
      // console.log(all[2]); // third

      const [days, appointments, interviewers] = all.map(x => x.data);

      // console.log("DAYS",days, "APPOINTMENTS",appointments, "INTERVIEWS",interviewers);
      setState(prev =>
      ({
        ...prev,
        days,
        appointments,
        interviewers
      }));

    });

  }, []);

  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };



    return axios.put(`api/appointments/${id}`, { interview })
      .then(() => {
        const days = updateSpots(id, true);
        console.log(days);
        setState({
          ...state,
          appointments,
          days
        });
      })
      // .then(() => {
      //   const days = updateSpots(id, true);
      //   console.log(days);
      //   setState({...state, days})
      // });
  }

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`api/appointments/${id}`)
      .then(() => {
        const days = updateSpots(id, false);
        console.log(days);
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