import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  // write class for daylistitem
  const classes = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": (props.spots === 0) 
  });

  // generate the appropriate text for spopts remaining
  const formatSpots = function() {
    if (props.spots === 0) {
      return `no spots remaining`;
    } if (props.spots === 1) {
      return `1 spot remaining`;
    } else {
      return `${props.spots} spots remaining`;
    }
  };
  return (
    <li className={classes} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}