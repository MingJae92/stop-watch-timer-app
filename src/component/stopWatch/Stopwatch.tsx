import { useEffect, useRef, useState } from "react";

function Stopwatch() {
  const [time, setTime] = useState({
    hour: 0,
    minutes: 0,
    seconds: 0,
  });
const [running, setRunning] = useState(false)
const [laps, setLaps] = useState()
const timerRef = useRef(null)

useEffect(()=>{

},[])
  

  return <div>Stopwatch</div>;
}

export default Stopwatch;
