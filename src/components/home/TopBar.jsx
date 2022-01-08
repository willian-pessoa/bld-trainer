import React from 'react'
import "./topBar.scss"

export default function TopBar({title}) {
    return (
        <div className='topBar'>
            <h1>{title}</h1>
        </div>
    )
}
