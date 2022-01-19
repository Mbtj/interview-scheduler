import React from "react";

export default function DayList(props){

  const DayListItems = props.days.map(date => {
    <DayListItem 
        key={props.days[date].id}
        name={props.days[date].name} 
        spots={props.days[date].spots} 
        selected={props.days[date].name === props.day}
        setDay={props.setDay}  
      />
  });

  return(
    <ul>
      {DayListItems}
    </ul>
  );
}