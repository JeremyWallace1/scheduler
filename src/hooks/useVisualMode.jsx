import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (!replace) {
      history.push(mode);
    }
    setMode(newMode);
    console.log("line 19: history:", history, "mode:", mode, "replace:", replace);
  };

  const back = () => {
    if (history.length >= 1) {
      setMode(history[history.length - 1]);
      history.pop();
    }
    console.log('line 27: history:', history, 'mode:', mode);
  };

  return {
    mode, transition, back
  };
};

// const useVisualMode = (initial) => {
//   const [mode, setMode] = useState(initial);
//   console.log("initial:", initial, "transition:", transition);
//   setMode(initial);
//   const transition = (value) => {
//     setMode(value);
//   };
//   console.log('mode:', mode);
//   return {
//     mode
//   };
// };

export default useVisualMode;