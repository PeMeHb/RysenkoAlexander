import React from 'react';
import './greeting.scss'

export const Greeting = (props) => {
    const time = new Date().getHours();
    let timeText = "",
        propName = "";

    if (props.name) {
        propName = props.name;
    }

    if (time >= 22 || time < 3) {
        timeText = "Good night!";
    } else if (time >= 3 && time < 12) {
        timeText = "Good morning!";
    } else if (time >= 12 && time < 18) {
        timeText = "Good afternoon!";
    } else if (time >= 18 && time < 22) {
        timeText = "Good evening!";
    }
    return (
    <div className="greeting">
        <span className="greeting__text">{timeText + propName}</span>
    </div>
    )
};
