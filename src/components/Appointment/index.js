import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {

  const { id, time, interview, interviewers, bookInterview } = props;
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

    console.log('INTERVIEW--->', interview)
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };


    transition(SAVING);
    bookInterview(id, interview)
    .then(() => transition(SHOW));
    // setTimeout (() => {
    //   transition(SHOW);
    // }, 2000);
  }

  console.log(mode);
  return (
    <article className="appointment">
      <Header time={time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
        />
      )}
      {mode === CREATE &&
        <Form
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
        />
      }
      {mode === SAVING &&
        <Status message="Saving"/>
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