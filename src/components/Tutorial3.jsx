import { useEffect, useState } from "react";
import { useInterval } from "../hooks/useInterval";

export default function Tutorial3() {
  const [count, setCount] = useState(0);
  const [mycount, setmyCount] = useState(0);
  const [running, setRunning] = useState(true);
  const [myrunning, setmyRunning] = useState(true);

  useInterval(() => setCount(count + 1), running ? 1000 : null);
  useEffect(() => {
    if (myrunning) {
      const id = setTimeout(() => {
        setmyCount((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(id);
    }
    
  }, [mycount,myrunning]);

  return (
    <>
      <p>{count}</p>
      <button onClick={() => setRunning((r) => !r)}>
        {running ? "Pause" : "Start"}
      </button>

      <p>MyCount : {mycount}</p>
      <button onClick={() => setmyRunning((r) => !r)}>
        {myrunning ? "Pause" : "Start"}
      </button>
    </>
  );
}
