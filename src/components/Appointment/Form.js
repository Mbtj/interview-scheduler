import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import classNames from "classnames";

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  function reset() {
    setInterviewer(null);
    setStudent("");
  };

  function cancel () {
    props.onCancel();
    reset();
  };

  function confirm() {
    if (interviewer && student) props.onSave(student, interviewer);
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
          />
        </form>
        <InterviewerList
          value={interviewer}
          interviewers={props.interviewers}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button confirm onClick={() => confirm()}>Save</Button>
        </section>
      </section>
    </main>
  );
}