import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {

const { id, time, interview } = props

return (
    <article className="appointment">
      <Header time={time} />
      
      {interview
      ? <Show
        student={interview.student}
        interviewer={interview.interviewer.name}
        onEdit={() =>console.log("edit")}
        onDelete={() => console.log("delete")}
        />
      : <Empty onAdd={() => console.log("add")}/>
      }
    </article>
  );

  
  // return (
  //   <article className="appointment">
  //     {
  //       props.time &&
  //       <Fragment>
  //         Appointment at {props.time}
  //       </Fragment>
  //     }
  //     {
  //       !props.time &&
  //       <Fragment>
  //         No Appointments
  //       </Fragment>
  //     }
  //   </article>
  // );
}