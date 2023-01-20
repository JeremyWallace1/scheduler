import { useState } from "react";

// sets the states for the mode (EMPTY, SAVING, DELETING, SHOW, etc.)
// also stores a history state so we can return to a previous state if Cancel is clicked (deleting) or Close is clicked (error)
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode, replace = false) {
    setMode(newMode);

    if (replace) {
      setHistory((prev) => [...prev.slice(0, -1), newMode]);
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
  };

  // returns to the previous state
  const back = function () {
    if (history.length > 1) {
      setHistory((prev) => [...prev.slice(0, -1)]);
      setMode(history[history.length - 2]);
    } else {
      setMode(initial);
    }
  };

  return { mode, history, transition, back };
};