import React, { Fragment } from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

// const interviewer = {
//   id: 1,
//   name: "Sylvia Palmer",
//   avatar: "https://i.imgur.com/LpaY82x.png"
// };

export default function InterviewerListItem(props) {
  const className = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });



  return (

    <li className={className} onClick={() => props.setInterviewer('id')}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />

      {props.selected &&
        <Fragment>
          {props.name}
        </Fragment>
      }
      {!props.selected && <></>}

    </li>
  );
};