import { useEffect, useRef, useState } from "react";
import { Time } from "../../types/stopWatchTypes/stopWatch.types"; // Ensure the path is correct

function Stopwatch() {
  const [time, setTime] = useState<Time>({
    hour: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null); // Use `number` for browser environment

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTime((prevTime: Time) => {
          const { hour, minutes, seconds } = prevTime;

          const newSecond = (seconds + 1) % 60;
          const newMinutes = (minutes + Math.floor((seconds + 1) / 60)) % 60;
          const newHour =
            hour + Math.floor((minutes + Math.floor((seconds + 1) / 60)) / 60);
          return { hour: newHour, minutes: newMinutes, seconds: newSecond };
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning]);

  const start = () => {
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false); // Stop the timer but do not reset time
    // Time will stay as is when the stop button is pressed
  };

  const reset = () => {
    setIsRunning(false); // Stop the timer first
    setTime({ hour: 0, minutes: 0, seconds: 0 }); // Reset time
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const { hour, minutes, seconds } = time;
  const formattedHour = hour.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return (
    <>
      <div>Stopwatch</div>
      <h1>
        {formattedHour}:{formattedMinutes}:{formattedSeconds}
      </h1>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </>
  );
}

export default Stopwatch;
