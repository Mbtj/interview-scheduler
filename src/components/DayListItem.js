import React from "react";

export default function DayListItem(props) {
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
    <li onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}