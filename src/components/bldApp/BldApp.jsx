import React from "react";
import { accurateTimer, formatTime } from "./helpers.js";
import { useState, useEffect, useCallback } from "react";
import "./bldApp.scss";
import TopBar from "../home/TopBar.jsx";
import Statistics from "./Statistics.jsx";
import CardsBLD from "./CardsBLD.jsx";
import MemoCheckBLD from "./MemoCheckBLD.jsx";
import ResultBLD from "./ResultBLD";
import BackspaceIcon from '@mui/icons-material/Backspace';


export default function BldApp({ LETTERS }) {
  // timer state
  const [time, setTime] = useState(0); // time in thMileseconds, convet to seconds div to 10
  const [timeOn, setTimeOn] = useState(false); // true if timer it's working
  const [stop, setStop] = useState(() => {}); // hold the function to stop the timer

  // Bld App states
  const [homeOn, setHomeOn] = useState(true); //true if in home bld
  const [memoOn, setMemoOn] = useState(false); //true if cards show up
  const [checkMemoOn, setCheckMemoOn] = useState(false); // true if input show up to type cards 
  const [resultOn, setResultOn] = useState(false); // true if resullt show up

  // HANDLE EVENTS SPACE BAR, BACKSPACE and ENTER
  // state to track if space it's helded
  const [spaceDown, setSpaceDown] = useState(false);
  const handleDown = useCallback((event) => {
    // TIMER FUNCTIONS
    function pauseTimer() {
      if (timeOn) {
        stop.cancel();
      }
    };
    // SPACE BAR
    // if space is pressed, then app map spacebar like helded, see handle up function
    // the space press is just handled when in the home bld page or the result page
    if (event.key === " " && !spaceDown && ( homeOn || resultOn)) {
      setSpaceDown(true);
    }
    // ENTER
    // if enter press in check stage, 
    // then timer stop and the input it's storaged to make the check
    if (event.key === "Enter" && checkMemoOn){
      setSpaceDown(false);
      setTimeOn(false);
      pauseTimer();
      showResult();
    } else if (event.key === "Enter" && memoOn){
      startCheckMemorization();
    }
    // BACKSPACE
    if (event.key === "Backspace" && resultOn){
      resetBldApp();
    }
  }, [checkMemoOn, homeOn, memoOn, resultOn, spaceDown, stop, timeOn]);

  const handleUp = useCallback((event)=>{
    // TIMER FUNCTIONS
    function startTimer() {
      if (!timeOn) {
        setTimeOn(true);
        let tempo = 0;
        let stopWatch = accurateTimer(() => {
          tempo++;
          setTime(tempo);
        }, 100);
        setStop(stopWatch);
      } else {
        let tempo = time;
        stop.cancel();
        let stopWatch = accurateTimer(() => {
          tempo++;
          setTime(tempo);
        }, 100);
        setStop(stopWatch);
      }
    }
    // SPACE BAR
    // when spacebar it's up after pressed, the if statement trigger the startTimer
    // and start the app, show up the cards to memo
    if (event.key === " " && (homeOn || resultOn) && spaceDown) {
      // states deal
      setSpaceDown(false);
      // functions to trigger
      setTime(0);
      startTimer();
      startMemorization();
    }
  },[homeOn, resultOn, stop, timeOn, time, spaceDown]);

  // event listeners to keys pressed
  useEffect(() => {
    window.addEventListener("keydown",(event) => handleDown(event));
    window.addEventListener("keyup", handleUp);
    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp)
    }
  }, [handleUp, handleDown])

  
  // APP LOGIC
  function startMemorization() {
    setMemoOn(true);
    setHomeOn(false);
  }
  const startCheckMemorization = () => {
    setCheckMemoOn(true);
    setMemoOn(false);
  }
  const showResult = () => {
    setResultOn(true);
    setCheckMemoOn(false);
  }
  const resetBldApp = () => {
    setHomeOn(true);
    setResultOn(false);
    setTimeOn(false);
    setTime(0);
  }


  return (
    <div className={`bldApp ${(spaceDown && (homeOn || resultOn)) && "awaiting"}`}>
      {/* Top bar, show up in home and result change if home or result*/}
      <div className={`${(memoOn || checkMemoOn) && "hidden"}`}>
      <TopBar title={`${homeOn ? "Current Level :" : "Next Level :"}`} />
      </div>

      {/* Display Part, change dinamic acordding the propely stage */}
      <div className="displayApp">
        {
          // look to the state of app to show the correct stage 
          memoOn ? <CardsBLD /> : // Show cards to Memo
          checkMemoOn ? <MemoCheckBLD /> : // show input to type memo
          resultOn ? <ResultBLD /> : <Statistics/> // show result or go to start stage
        }
      </div>

      {/* Footer Part, show information to use the app */}
      {
        homeOn ? <h1>Press <span>SPACE</span> to Start</h1> :
        memoOn || checkMemoOn ? <h1>Press <span>ENTER</span> to Continue</h1> :
        resultOn && 
        <div className="wrapper_info">
          <h1>Press <span>SPACE</span> to Start</h1>
          <h1>Press <span><BackspaceIcon/></span> to Return</h1>
        </div> 
      }
      <h1>{formatTime(time)}</h1>
    </div>
  );
}
