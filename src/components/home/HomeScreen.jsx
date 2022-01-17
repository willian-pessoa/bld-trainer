import React from "react";
import "./homeScreen.scss";
import TopBar from "./TopBar.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";

/* HomeScreen
Here is the home page (path: "/") where the User can select who app would like to use,
the 3BLD memory trainer or MBLD memory trainer
*/

export default function HomeScreen({ LETTERS }) {
  const [letters, setLetters] = useState(LETTERS);

  const updateStorage = () =>{
      if (letters.length < 22){
        localStorage.setItem("LETTERS", "ABCDEFGJKLMNOPQRSTUVWX")
      } else {
        localStorage.setItem("LETTERS", letters);
      }
  }

  return (
    <div className="homeScreen">
      <TopBar className="home_topBar" title={"Welcome to the BLD Trainer"} />
      <div className="letterScheme">
        <h4>Put your Letters below:</h4>
        <input
          onChange={(e) => setLetters(e.target.value.toUpperCase())}
          value={letters}
          type="text"
          maxLength="26"
          minLength="22"
        />
      </div>
      <div className="appSelection">
        <div className="bld">
          <Link to="/bld">
            <img onClick={()=>updateStorage()} src="assets/3bld.jpg" alt="" />
          </Link>
          <h4>3BLD Memorization Trainer</h4>
          <hr />
          <p>You can use this App to improve your short term memory</p>
        </div>
        <div className="mbld">
          <Link to="/mbld">
            <img onClick={()=>updateStorage()} src="assets/mbld.jpg" alt="" />
          </Link>
          <h4>MBLD Memorization Trainer</h4>
          <hr />
          <p>You can use this App to improve your long term memory</p>
        </div>
      </div>
      <form action="https://www.paypal.com/donate" method="post" target="_black">
      <input type="hidden" name="hosted_button_id" value="YJ29DR3TUQQWL" />
      <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
      </form>
    </div>
  );
}
