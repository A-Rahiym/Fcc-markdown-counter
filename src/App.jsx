
import './App.css'
import React, { useState , useEffect} from 'react'
// import Button from './components/Button/Button'
import beepSound from '../src/assets/beep-125033.mp3'

const App = () => {
  
  const [breakDuration, setBreakDuration] = useState(5)
  const [sessionDuration, setSessionDuration] = useState(25)
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true)
  
  const increaseSessionDuration = () => {
     if(!isRunning) setSessionDuration((prev) => Math.min(prev + 1, 60));  
  }
  const decreaseSessionDuration = () => {
    if(!isRunning)  setSessionDuration((prev) =>Math.max(prev - 1, 1));
  }


  const increaseBreakDuration = () => {
  setBreakDuration((prev) => Math.min(prev + 1, 60));  
 }

 const decreaseBreakDuration = () => {
  setBreakDuration((prev) => Math.max(prev - 1 , 1)); 
 }

const toggleStartStop = () => {
  setIsRunning((prev) => !prev);
}

 const resetTimer = () => {
  setBreakDuration(5)
  setSessionDuration(25)
  setTimeLeft(25 * 60)
  setIsSession(true);
  setIsRunning(false)
  const beep = document.getElementById("beep");
  beep.pause();
  beep.currentTime = 0;

 }

 useEffect(() => {
  if (isRunning) {
    // Timer is running, no need to update timeLeft here
    return;
  }

  // If timer is paused, don't reset timeLeft unless it's the start of a session or break
  if (!isRunning && timeLeft === 0) {
    setTimeLeft(isSession ? sessionDuration * 60 : breakDuration * 60);
  }

  // If the timer is started or reset, initialize timeLeft
  if (!isRunning && timeLeft === null) {
    setTimeLeft(isSession ? sessionDuration * 60 : breakDuration * 60);
  }
}, [isRunning, sessionDuration, breakDuration, isSession, timeLeft]);





   // **Timer Logic**
   useEffect(() => {
    let timer = null;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 0) {
            const audio = document.getElementById("beep");
            audio.play();
  
            if (isSession) {
              setIsSession(false);
              return breakDuration * 60; // Switch to break
            } else {
              setIsSession(true);
              return sessionDuration * 60; // Switch to session
            }
          }
          return prev - 1;
        });
      }, 1000);
  
      return () => clearInterval(timer);
    }
  }, [isRunning, isSession, breakDuration, sessionDuration]);
 


  return (
    <>
      <div className='container'>
        <div className='break'>
          <h3 id='break-label'>Break </h3>
          <h4>break length</h4>
          <span id='break-length'>{breakDuration}</span>

          <button id='break-decrement' onClick={decreaseBreakDuration}>-</button>
          <button id='break-increment' onClick={increaseBreakDuration}>+</button>
          {/* <Button Id={'break-decrement'} Key={"-"}  onClick={decreaseBreakDuration}/>
          <Button Id={'break-increment'} Key={"+"} onClick={increaseBreakDuration}/> */}
        </div>

        <div className='Session'>
          <h3 id='session-label'>Session </h3>
          <h4>Session length</h4>
          <span id="session-length">{sessionDuration}</span>
          <button id='session-decrement' onClick={decreaseSessionDuration}>-</button>
          <button id='session-increment' onClick={increaseSessionDuration}>+</button>

          {/* <Button Id={'session-increment'} Key={"+"}  onClick={increaseSessionDuration} /> */}
          {/* <Button Id={'session-decrement'} Key={"-"} onClick={decreaseSessionDuration}/> */}
        </div>
      </div>

      <div className='control'>
        <button id='reset' onClick={resetTimer}>reset</button>
        <button id='start_stop' onClick={toggleStartStop}>
        {isRunning ? "Pause" : "Start"}
        </button>


        {/* <Button Id={'start_stop'} Key={"start"} /> */}
        {/* <Button Id={'reset'} Key={'stop'} onClick={resetTimer}/> */}
      </div>

      <div className='count-down'>
        <span id='timer-label'>{isSession ? "Session" : "Break"}</span>
        <span id='time-left'>{Math.floor(timeLeft/60).toString().padStart(2,"0")}:{(timeLeft%60).toString().padStart(2,'0')}</span>
      </div>
      <audio id='beep'  src={beepSound} preload='auto'/>
    </>
  )
}

export default App
