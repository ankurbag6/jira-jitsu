import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

export default function Tutorial2() {
  const [text, setText] = useState("");
  const debounced = useDebounce(text, 500);
  console.log("debounced:", debounced);

  return (
    <label>
      Search <input value={text} onChange={(e) => setText(e.target.value)} />
    </label>
  );
}
