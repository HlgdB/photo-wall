import React, { useState } from "react";
import './index.css';

function getDurationText(my_time: number) {
  const startPoint = 1629907200000;
  my_time = my_time - startPoint;
  let days = my_time / 1000 / 60 / 60 / 24;
  let daysRound = Math.floor(days);
  let hours = my_time / 1000 / 60 / 60 - 24 * daysRound;
  let hoursRound = Math.floor(hours);
  let minutes = my_time / 1000 / 60 - 24 * 60 * daysRound - 60 * hoursRound;
  let minutesRound = Math.floor(minutes);
  let seconds =
    my_time / 1000 -
    24 * 60 * 60 * daysRound -
    60 * 60 * hoursRound -
    60 * minutesRound;
  seconds = Math.floor(seconds);
  const time = daysRound + "days " + hoursRound + "hours " + minutesRound + "mins " + seconds + "s";
  return time;
}

const Index = () => {
  const [duration, setDuration] = useState(new Date().valueOf());

  setInterval(() => {
    setDuration(new Date().valueOf());
  }, 1000);

  return(
    <span className="duration-text">
      {getDurationText(duration)}
    </span>
  )
};

export default Index;
