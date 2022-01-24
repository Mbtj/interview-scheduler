import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}

  });

  const setDay = day => setState({ ...state, day });


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
        setState({
          ...state,
          appointments
        });
      });
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