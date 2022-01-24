import React, { Fragments, useState, useEffect, Fragment } from "react";
import axios from "axios";
import "components/Application.scss";
import "components/DayListItem.scss"
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   }
// ];

export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);

  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {}
  // });


  // const setDay = day => setState({ ...state, day });

  // const setDays = (days) => setState(prev => ({ ...prev, days }));



  // useEffect(() => {

  //   Promise.all([
  //     axios.get("api/days"), // GET_DAYS
  //     axios.get("api/appointments"), // GET_APPOINTMENTS
  //     axios.get("api/interviewers") // GET_INTERVIEWERS
  //   ]).then((all) => {
  //     // console.log(all[0]); // first
  //     // console.log(all[1]); // second
  //     // console.log(all[2]); // third

  //     const [days, appointments, interviewers] = all.map(x => x.data);

  //     // console.log("DAYS",days, "APPOINTMENTS",appointments, "INTERVIEWS",interviewers);
  //     setState(prev =>
  //     ({
  //       ...prev,
  //       days,
  //       appointments,
  //       interviewers
  //     }));
  //   });

  // }, [])

  //console.log(state.days)
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  

  

  const renderedAppointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    console.log('interview from APPLICATION-->', interview)
    const interviewers = getInterviewersForDay(state, state.day);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });



  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {renderedAppointments}
      </section>

    </main>
  );
}
