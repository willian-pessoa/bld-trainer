import React from 'react';
import "./homeScreen.scss";
import TopBar from "./TopBar.jsx"

/* HomeScreen
Here is the home page (path: "/") where the User can select who app would like to use,
the 3BLD memory trainer or MBLD memory trainer
*/

export default function HomeScreen() {
    return (
        <div className='homeScreen'>
            <TopBar title={"Welcome to the BLD Trainer"} />
            <div className="appSelection">
                
            </div>
        </div>
    )
}
