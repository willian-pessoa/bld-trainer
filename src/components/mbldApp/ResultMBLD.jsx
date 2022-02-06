import React from "react";
import "./resultMBLD.scss";

import { useState, useEffect } from "react";

import { strToArr, checkAnswer } from "../../helpers.js";
import { useMemo } from "react";

export default function ResultMBLD({time}) {
  const [arrOfCubes] = useState(JSON.parse(localStorage.getItem("arrOfCubes")));
  const [arrOfAnswers] = useState(
    JSON.parse(localStorage.getItem("arrAnswer"))
  );
  const arrOfCheck = useMemo(() => {
    let tempArrCheck = [];
    for (let i in arrOfCubes) {
      let arrChecked = checkAnswer(arrOfCubes[i], strToArr(arrOfAnswers[i]));
      tempArrCheck.push(arrChecked);
    }
    console.log("Passou no useMemo")
    console.log(arrOfAnswers);
    return tempArrCheck;
  });

  let counter = -1;

  const redStyle = {
    borderColor: "red",
    color: "red",
    boxShadow: "0 0 0.4em red",
  };
  const greenStyle = {
    borderColor: "green",
    color: "#32CD32",
    boxShadow: "0 0 0.4em green",
  };

  return (
    <div className="resultMBLD">
      {arrOfCubes.map((cube, index) => {
        return (
          <div key={index} className="container">
            <div key={index} className="cardsMBLD_check">
              {index + 1}
              {cube.map((item, index2) => {
                return (
                  <div key={index2} className="letter-pair">
                    {item}
                  </div>
                );
              })}
            </div>
            <div key={cube[0]} className="answerCards">
              {index + 1}
              {
              strToArr(arrOfAnswers[index]) === null ? "" :
              strToArr(arrOfAnswers[index]).map((item, index3) => {
                counter++;
                return (
                  <div style={arrOfCheck[index][1][counter] ? greenStyle : redStyle} key={index3} className="letter-pair">
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
