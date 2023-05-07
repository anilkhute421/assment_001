import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [timers, setTimers] = useState([]);
  const [secondsInput, setSecondsInput] = useState("");

  const createTimer = () => {
    const newTimer = {
      createdAt: new Date(),
      remainingSeconds: parseInt(secondsInput),
    };
    setTimers([...timers, newTimer]);
    setSecondsInput("");
  };

  const removeTimer = (index) => {
    const newTimers = [...timers];
    newTimers.splice(index, 1);
    setTimers(newTimers);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          const remainingSeconds = timer.remainingSeconds - 0.01;
          if (remainingSeconds <= 0) {
            clearInterval(timer.intervalId);
            return null;
          }
          return { ...timer, remainingSeconds };
        }).filter((timer) => timer !== null)
      );
    }, 10);

    return () => clearInterval(intervalId);
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    createTimer();
  };

  return (
    <div className="App" style={{display:'flex' , justifyContent:'space-between' , alignItems:'center' , padding:'50px 100px'}}>
      <div className="timers-container">
        <h2>Timers</h2>
        <ul style={{ }}>
          {timers.map((timer, index) => (
            <li key={index} style={{ background:'#D9D9D9' ,marginBottom:'15px'}}>
              <div>Created At: {timer.createdAt.toLocaleString()}</div>
              <div>Remaining Time: {timer.remainingSeconds.toFixed(2)}</div>
              <button onClick={() => removeTimer(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="form-container">
        <h2>New Timer</h2>
        <form onSubmit={handleFormSubmit}>
            <input
            style={{width:'140px' , height:'40px'}}
              type="number"
              value={secondsInput}
              onChange={(event) => setSecondsInput(event.target.value)}
              required
            />
            <div style={{marginTop:'20px'}}>
          <button type="submit" style={{width:'140px' , height:'40px'}}>Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
