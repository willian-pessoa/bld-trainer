import React from "react";
import { useState, useEffect, useCallback } from "react";
import "./bldApp.scss";

// functions + hooks
import { useRound } from "../../hooks/useRound.jsx";
import { useTimer } from "../../hooks/useTimer";
import { useSnapshot } from "valtio";

// Components
import TopBar from "../home/TopBar.jsx";
import Statistics from "./Statistics.jsx";
import CardsBLD from "./CardsBLD.jsx";
import MemoCheckBLD from "./MemoCheckBLD.jsx";
import ResultBLD from "./ResultBLD";

export default function BldApp({ LETTERS }) {
  const [nivel, setNivel] = useState(parseInt(localStorage.getItem("level")));
  const [round, updateRound] = useRound();
  const [time, startTimer, stopTimer, resetTimer] = useTimer();

  const startPractice = () => {
    updateRound("memo");
    startTimer();
  };

  const changeFase = (event) => {
    if (event.key === "Enter" && round.practice) {
      startPractice();
    } else if (event.key === "Enter" && round.memo) {
      updateRound("check");
    } else if (event.key === "Enter" && round.check) {
      updateRound("result");
      stopTimer();
    } else if (event.key === "Enter" && round.result) {
      updateRound("memo");
      setNivel(parseInt(localStorage.getItem("level")));
      resetTimer();
      startTimer();
    }
  };

  const resetPractice = () => {
    updateRound("reset");
    setNivel(parseInt(localStorage.getItem("level")));
    resetTimer();
  };

  console.log("RENDERED");

  return (
    <div
      className="bldApp"
      role="button"
      tabIndex="-1"
      onKeyDown={(event) => changeFase(event)}
    >
      {/* Top bar, show up in home and result change if home or result*/}
      <div className={`${(round.memo || round.check) && "hidden"}`}>
        <TopBar
          title={`${
            true ? "Current nivel : " + nivel : "Next nivel : " + nivel
          }`}
        />
      </div>
      {/* Display Part, change dinamic acordding the propely stage */}
      <div className="displayApp">
        {round.memo ? (
          <CardsBLD nivel={nivel} LETTERS={LETTERS} />
        ) : round.check ? (
          <MemoCheckBLD />
        ) : round.result ? (
          <ResultBLD time={time} nivel={nivel} setNivel={setNivel} />
        ) : (
          <Statistics />
        )}
      </div>
      {/* Footer Part, show information to use the app */}
      {round.practice ? (
        <button onClick={() => startPractice()} autoFocus>
          <h1>Start Practice</h1>
        </button>
      ) : round.memo || round.check ? (
        <button onKeyDown={(event) => changeFase(event)} autoFocus>
          <h1>Press Enter to Continue</h1>
        </button>
      ) : round.result ? (
        <div className="resultBtn">
          <button onKeyDown={(event) => changeFase(event)} autoFocus>
            <h1>Press Enter to new Round</h1>
          </button>
          <button onClick={() => resetPractice()}>
            <h1>See Statistics</h1>
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
