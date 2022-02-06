import { useState } from "react";

export const useAnswer = (cubes) => {
  const [answers, setAnswers] = useState([]);

  const startAnswers = () => {
    let arr = [];
    for (let i = 0; i < cubes; i++) {
        arr.push("");
    }
    setAnswers(arr);
  }

  const updateAnswers = (index, answer) => {
    let arr = [];
    for (let i = 0; i < cubes; i++) {
      if (i === index) {
        arr.push(answer);
      } else {
        arr.push(answers[i])
      }
    }
    setAnswers(arr);
  };

  return [answers, updateAnswers, startAnswers];
};
