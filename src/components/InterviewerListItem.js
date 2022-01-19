import React from "react";

// const interviewer = {
//   id: 1,
//   name: "Sylvia Palmer",
//   avatar: "https://i.imgur.com/LpaY82x.png"
// };

export default function InterviewrListItem(props) {

  return (
  <li className="interviewers__item">
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {props.name}
  </li>);
};