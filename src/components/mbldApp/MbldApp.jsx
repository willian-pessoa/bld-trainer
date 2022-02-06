import React from "react";
import TopBar from "../home/TopBar";
import "./mbldApp.scss";

// components
import CardsMBLD from "./CardsMBLD";
import MemoCheckMBLD from "./MemoCheckMBLD";
import ResultMBLD from "./ResultMBLD";

// hooks
import { useState } from "react";
import { useRound } from "../../hooks/useRound";
import { useTimer } from "../../hooks/useTimer";

export default function MbldApp() {
  const [round, updateRound] = useRound();
  const [cubes, setCubes] = useState(2);
  const [time, startTimer, stopTimer, resetTimer] = useTimer();

  // change fases
  const handleFase = () => {
    if (round.practice) {
      updateRound("memo");
      startTimer();
    } else if (round.memo) {
      updateRound("check");
    } else if (round.check) {
      updateRound("result");
      stopTimer();
    } else if (round.result) {
      updateRound("practice");
      resetTimer();
    }
  };

  // handle functions
  const handleCubes = (cubes) => {
    cubes < 0 ? setCubes(2) : cubes > 100 ? setCubes(100) : setCubes(cubes);
  };

  return (
    <div
      className="mbldApp"
      style={
        round.practice ? { height: "calc(100vh - 15px)" } :
        cubes >= 7 ? { height: "auto" } : { height: "calc(100vh - 15px)" }
      }
    >
      {round.practice ? <TopBar title={"MBLD"} /> : ""}
      {round.practice ? (
        <>
          <h1>Number of Cubes:</h1>
          <input
            autoFocus
            value={cubes}
            onChange={(e) => handleCubes(e.target.value)}
            className="level"
            min={2}
            max={100}
            type="number"
          />
        </>
      ) : round.memo ? (
        <CardsMBLD cubes={cubes} />
      ) : round.check ? (
        <MemoCheckMBLD cubes={cubes} />
      ) : (
        <ResultMBLD />
      )}
      <button onClick={() => handleFase()}>
        <h1>{round.practice ? "Start Practice" : "Continue"} </h1>
      </button>
      {round.result ? <h3>Tempo: {time} Seconds</h3> : "" }
    </div>
  );
}
