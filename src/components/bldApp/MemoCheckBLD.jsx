import React from 'react'
import "./memoCheckBLD.scss"
import { useState, useEffect } from 'react'

export default function MemoCheck() {
    const [textAnswer, setTextAnswer] = useState("")

    const handleChange = (e) => {
        setTextAnswer(e.target.value);
    }

    useEffect(() => {
        localStorage.setItem("textAnswer", textAnswer);
    }, [textAnswer])

    return (
        <div className='memoCheckBLD'>
            <h3>"Put the pairs in the right order using space between them:"</h3>
            <br/>
            <br/>
            <input maxLength="33" onChange={(event)=>handleChange(event)} value={textAnswer.toUpperCase()} type="text" autoFocus/>
        </div>
    )
}
