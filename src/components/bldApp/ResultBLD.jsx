import React from "react";
import "./resultBLD.scss";
import { useState,useMemo } from "react";

import { strToArr, checkAnswer } from "./helpers";

export default function ResultBLD({time, nivel}) {
  const [arrPairs, setArrPairs] = useState(strToArr(localStorage.getItem("listLetterPairs")));
  const [arrToCheck, setArrToCheck] = useState(strToArr(localStorage.getItem("textAnswer")));
  const tupleAnswer = useMemo(()=>checkAnswer(arrPairs, arrToCheck),[arrPairs,arrToCheck]);

  let counter = -1;

  if (tupleAnswer[0]){
    let newLevel = nivel + 1;
    localStorage.setItem("level", newLevel);
  } else {
    let newLevel = nivel - 1;
    if (newLevel < 1){
      localStorage.setItem("level", 1);
    } else {
    localStorage.setItem("level", newLevel);
    }
  }

  console.log(arrPairs);
  console.log(arrToCheck);
  console.log(counter);
  console.log(tupleAnswer);

  const redStyle = {borderColor: "red", color: "red", boxShadow: "0 0 0.4em red"};
  const greenStyle = {borderColor: "green", color: "#32CD32", boxShadow: "0 0 0.4em green"};

  return (
    <div className="resultBLD">
      <div className="cardsBLD_check">
      {arrPairs.map(item => {
        return <div key={item} className="letter-pair">{item}</div>;
      })}
      </div>
      <div className="answerCards">
      { arrToCheck === null ? "" :
      arrToCheck.map((item, index) => {
        counter++;
        return <div key={item+index} style={tupleAnswer[1][counter] ? greenStyle : redStyle} className="letter-pair">{item}</div>;
      })}
      </div>
      <h3>Time: {time}</h3>
    </div>
  );
}
