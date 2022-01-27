import { useState } from "react";

export default function useVisualMode(initial) {
  // initialize states
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // change mode while updating history
  const transition = (mode, replace = false) => {
     if (!replace) history.push(mode);
    setHistory(history);
    setMode(mode);
  }

  // backtrack mode via history
  const back = () => {
    history.pop();
    if (history.length >= 1) {
      setMode(history[history.length-1]);
    }
    setHistory(history);

  }
  return { mode, transition, back };
}