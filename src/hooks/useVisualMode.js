import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    // const oldMode = mode;
    // const newHistory = history;
     if (!replace) history.push(mode);
    setHistory(history);
    setMode(mode);
  }
  const back = () => {
    // const recentMode = history[history.length-1];
    // const newHistory = history;
    history.pop();
    if (history.length >= 1) {
      setMode(history[history.length-1]);
    }
    setHistory(history);

  }
  return { mode, transition, back };
}