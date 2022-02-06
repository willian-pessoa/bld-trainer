import React, { useEffect } from "react";
import "./cardsBLD.scss";
import { generateRandom } from "../../helpers.js";
import { useState } from "react";

export default function Cards({ nivel }) {
  const [letterPairs, setLetterPairs] = useState([]);
  const [letters] = useState(localStorage.getItem("LETTERS"))
  
    // Generate Cards to Memo
    useEffect(() => {
      let amount = nivel * 2;
      let arrOfPairs = [];
      let randomIndex = generateRandom(amount, letters.length);
      for (let i = 0; i < amount; i += 2) {
        let pair = letters[randomIndex[i]] + letters[randomIndex[i + 1]];
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
