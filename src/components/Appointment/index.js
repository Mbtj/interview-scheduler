import React, { Fragment } from "react";
import "components/Appointment/styles.scss";

export default function Appointment(props) {

  return (
    <article className="appointment">
      {
        props.time &&
        <Fragment>
          Appointment at {props.time}
        </Fragment>
      }
      {
        !props.time &&
        <Fragment>
          No Appointments
        </Fragment>
      }
    </article>
  );
}