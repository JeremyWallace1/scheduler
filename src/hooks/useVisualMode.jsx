import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
 
  const transition = (newMode, replace = false) => {
    if (!replace) {
        setHistory([...history, mode])
    }
    setMode(newMode);
  };

  const back = () => {
    const newHistory = history;
    if (history.length >= 1) {
      const newMode = newHistory[newHistory.length - 1];
      setMode(newMode);
    } 
    newHistory.pop();
    setHistory([...newHistory])
  }

  return {
    mode, transition, back
  };
};


export default useVisualMode;