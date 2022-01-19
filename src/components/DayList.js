import React from "react";
import DayListItem from "./DayListItem";
import "components/DayListItem.scss"

export default function DayList(props){

  const DayListItems = props.days.map(date => { 
    return (<DayListItem 
        key={date.id}
        name={date.name} 
        spots={date.spots} 
        selected={date.name === props.day}
        setDay={props.setDay}  
      />);
  });

  return(
    <ul>
      {DayListItems}
    </ul>
  );
}