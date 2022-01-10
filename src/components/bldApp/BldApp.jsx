import React from "react";
import { accurateTimer } from "./helpers.js";
import { useState, useEffect } from "react";
import "./bldApp.scss";
import TopBar from "../home/TopBar.jsx";
import Statistics from "./Statistics.jsx";
import CardsBLD from "./CardsBLD.jsx";
import MemoCheckBLD from "./MemoCheckBLD.jsx";
import ResultBLD from "./ResultBLD";

export default function BldApp({ LETTERS }) {
  // timer state
  const [time, setTime] = useState(0); // time in thMileseconds, convet to seconds div to 10
  const [timeOn, setTimeOn] = useState(false); // true if timer it's working
  const [stop, setStop] = useState(() => {}); // hold the function to stop the timer

  // Bld App states
  const [homeOn, setHomeOn] = useState(false); //true if in home bld
  const [memoOn, setMemoOn] = useState(false); //true if cards show up
  const [checkMemoOn, setCheckMemoOn] = useState(true); // true if input show up to type cards 
  const [resultOn, setResultOn] = useState(false); // true if resullt show up

  // HANDLE EVENTS SPACEBAR and ENTER
  // state to track if space it's helded
  const [spaceDown, setSpaceDown] = useState(false);
  const handleDown = (event) => {
    // if space is pressed, then app map spacebar like helded, see handle up function
    // the space press is just handled when in the home bld page or the result page
    if (event.key === " " && !spaceDown && homeOn || resultOn) {
      setSpaceDown(true);
      console.log("D"+spaceDown)
    }
  };

  const handleUp = (event) => {
    // when spacebar it's up after pressed, the if statement trigger the startTimer
    if (event.key === " " && homeOn || resultOn) {
      startTimer();
      console.log(spaceDown)
      setSpaceDown(false);
    }
  };

  // event listeners to keys pressed
  useEffect(() => {
    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);
    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp)
    }
  }, [handleUp, handleDown])

  // TIMER FUNCTIONS
  const startTimer = () => {
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
  };

  const pauseTimer = () => {
    if (timeOn) {
      stop.cancel();
    }
  };

  return (
    <div className="bldApp">
      <TopBar title={`Current Level: `} />
      <div className="displayApp">
        {
          // look to the state of app to show the correct stage 
          memoOn ? <CardsBLD /> : // Show cards to Memo
          checkMemoOn ? <MemoCheckBLD /> : // show input to type memo
          resultOn ? <ResultBLD /> : <Statistics/> // show result or go to start stage
        }
      </div>
      {
        homeOn &&
        <button>
        <h1>Press SPACE to Start</h1>
        </button> 
      }
      <h1>{time / 10}</h1>
    </div>
  );
}
