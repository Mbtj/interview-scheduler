
import React, { Fragment } from "react";
import classNames from "classnames";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

// const interviewers = [
//   { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
//   { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
//   { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
//   { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
//   { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
// ];

export default function InterviewerList(props) {
  // const classes = classNames("interviewers");

  // alert(props.interviewers);

  const interviewers = props.interviewers.map((interviewer) => {
  return (
  <InterviewerListItem
    id={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    setInterviewer={props.setInterviewer}
    selected={props.interviewer === interviewer.id}
  />);
  });


  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
};