import React, { useState } from 'react'
import "./statistics.scss"

export default function Statistics() {
    const [data] = useState(JSON.parse(localStorage.getItem("dataUser")))



    return (
        <div className='statistics'>
            <div className="graph">

            </div>
            <div className="table">
                <h3>Max Level: {data.reduce((prev, current) => (prev.level > current.level) ? prev : current).level}</h3>
                <br />
                <h3>Total Trys: {data.length}</h3>
            </div>
        </div>
    )
}
