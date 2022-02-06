import React from "react";
import "./cardsMBLD.scss";
import { generateRandom } from "../../helpers.js";
import { useState, useEffect } from "react";

export default function CardsMBLD({ cubes }) {
  const [arrCubes, setArrCubes] = useState([]);
  const [letters] = useState(localStorage.getItem("LETTERS"));

  // Generate Cards to Memo
  useEffect(() => {
    let arrOfCubes = [];
    for (let i = 0; i < cubes; i++) {
      let amount = 20;
      let arrOfPairs = [];
      let randomIndex = generateRandom(amount, letters.length);
      for (let j = 0; j < amount; j += 2) {
        let pair = letters[randomIndex[j]] + letters[randomIndex[j + 1]];
        arrOfPairs.push(pair);
      }
      arrOfCubes.push(arrOfPairs);
    }
    setArrCubes(arrOfCubes);
    localStorage.setItem("arrOfCubes", JSON.stringify(arrOfCubes));
    console.log(arrOfCubes);
    return () => {
      setArrCubes([]);
    };
  }, []);

  return (
    <div className="cardsMBLD">
      {arrCubes.map((cube, index) => {
        return (
          <div key={index+1} className="cube">
              <h2>{index+1}</h2>
            {cube.map((pair) => {
              return (
                <div key={pair.toString()} className="letter-pair">
                  {pair}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
