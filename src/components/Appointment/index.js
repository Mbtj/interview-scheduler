import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const DELETE = "DELETE";
const EDIT = "EDIT"
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // console.log('INTERVIEW--->', interview)

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };


    transition(SAVING, true);
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
    // setTimeout (() => {
    //   transition(SHOW);
    // }, 2000);
  }


  function deleteInterview() {
    // console.log('DELETING', id)

    transition(DELETING, true);
    cancelInterview(id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
  }

  // function for 'x' button on error
  function doubleBack() {
    back();
    back();
  }
  // console.log(mode);
  return (
    <article className="appointment">
      <Header time={time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
          onDelete={() => transition(DELETE)}
          onEdit={() => transition(EDIT)}
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
        <Status message="Saving" />
      }
      {mode === DELETING &&
        <Status message="Deleting" />
      }
      {mode === DELETE &&
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={back}
          onConfirm={deleteInterview}
        />
      }
      {mode === EDIT &&
        <Form
          student={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
        />
      }
      {mode === ERROR_SAVE &&
        <Error
        message="Could not save appointment"
        onClose={doubleBack}
        />
      }

      {mode === ERROR_DELETE &&
        <Error
        message="Could not cancel appointment"
        onClose={doubleBack}
        />
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