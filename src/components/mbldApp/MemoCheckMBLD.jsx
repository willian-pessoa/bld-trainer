import React from "react";
import "./memoCheckMBLD.scss";
import { useState, useEffect } from "react";
import { useAnswer } from "../../hooks/useAnswer";

export default function MemoCheckMBLD({ cubes }) {
  const [answer, updateAnswer, startAnwers] = useAnswer(cubes);

  useEffect(() => {
    startAnwers();
  }, []);

  useEffect(() => {
    localStorage.setItem("arrAnswer", JSON.stringify(answer));
  }, [answer])

  return (
    <div className="memoCheckMBLD">
      <h3>"Put the pairs in the right order using space between them:"</h3>
      <br />
      <br />
      {answer.map((text, index) => {
        return (
          <div key={index} className="textAnswer">
            <h1>{index+1}-</h1>
            <input value={text} onChange={(e)=>updateAnswer(index, e.target.value.toUpperCase())} key={index} maxLength="33" type="text" />
          </div>
        );
      })}
    </div>
  );
}
