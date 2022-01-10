import React from 'react'
import "./topBar.scss"
import { Home } from '@mui/icons-material'
import { Link } from 'react-router-dom'

export default function TopBar({title}) {
    return (
        <div className='topBar'>
            <Link to="/">
            <Home className='homeIcon'/>
            </Link>
            <h1>{title}</h1>
            <Home className='homeIcon hidden'/>
        </div>
    )
}
