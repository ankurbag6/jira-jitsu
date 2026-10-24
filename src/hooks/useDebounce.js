import { useEffect, useState } from 'react';

export function useDebounce(value, ms = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(id); // new keystroke → cancel old timer
  }, [value, ms]);

  return debounced;
}