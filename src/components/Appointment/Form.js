import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import classNames from "classnames";

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const [error, setError] = useState("");

  function reset() {
    setInterviewer(null);
    setStudent("");
  };

  function cancel () {
    props.onCancel();
    reset();
  };

  // function confirm() {
  //   if (interviewer && student) props.onSave(student, interviewer);
  // }

  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    } 
    if (interviewer === null) {
      setError("Interviewer must be selected");
      return;
    }
    setError("");
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          value={interviewer}
          interviewers={props.interviewers}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>
  );
}