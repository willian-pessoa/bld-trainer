import React, { useEffect } from "react";
import "./cardsBLD.scss";
import { generateRandom } from "./helpers";
import { useState } from "react";

export default function Cards({ nivel, LETTERS}) {
  const [letterPairs, setLetterPairs] = useState([]);

    // Generate Cards to Memo
    useEffect(() => {
      let amount = parseInt(nivel) * 2;
      let arrOfPairs = [];
      let randomIndex = generateRandom(amount, LETTERS.length);
      for (let i = 0; i < amount; i += 2) {
        let pair = LETTERS[randomIndex[i]] + LETTERS[randomIndex[i + 1]];
        arrOfPairs.push(pair);
      }
      setLetterPairs(arrOfPairs);
      localStorage.setItem("listLetterPairs", arrOfPairs);
      return () => {
        setLetterPairs([]);
      }
      },[]);


  return (
    <div className="cardsBLD">
      {letterPairs.map((item) => {
        return <div key={item.toString()} className="letter-pair">{item}</div>;
      })}
    </div>
  );
}
