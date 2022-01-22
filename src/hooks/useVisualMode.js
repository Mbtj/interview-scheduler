import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    const oldMode = mode;
    const newHistory = history;
     if (!replace) newHistory.push(oldMode);
    setHistory(newHistory);
    setMode(newMode);
  }
  const back = () => {
    const recentMode = history[history.length-1];
    const newHistory = history;
    newHistory.pop()
    setMode(recentMode);
    setHistory(newHistory);

  }
  return { mode, transition, back };
}