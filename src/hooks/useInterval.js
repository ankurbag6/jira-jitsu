import { useEffect, useRef } from 'react';

export function useInterval(callback, ms) {
  const savedCallback = useRef(callback);

  // always remember the newest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // start/stop the timer only when ms changes
  useEffect(() => {
    if (ms === null) return; // paused
    const id = setInterval(() => savedCallback.current(), ms);
    return () => clearInterval(id);
  }, [ms]);
}