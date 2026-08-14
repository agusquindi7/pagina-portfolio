import './Navbar.css'

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Navbar({isDeveloperModeOn}) {
  return (
    <nav className="navbar">
      <div className="navbar-title">
        <div className="typewriter">
            <h1>Welcome to my portfolio</h1>
            <p>by Agustin Quindimil</p>
        </div>
      </div>
      <ul className="navbar-links">
        <li><Link to="/" style=
        {{ 
          textDecoration: 'none' , 
          color: 'inherit' ,
          padding: '10px',}}>
        Home
        </Link></li>
        <li><Link to="/fullstack" style=
        {{ 
          textDecoration: 'none' , 
          color: 'inherit' ,
          padding: '10px',}}>
        FullStack
        </Link></li>
        <li><Link to="/backend" style=
        {{ 
          textDecoration: 'none' , 
          color: 'inherit' ,
          padding: '10px',}}>
        BackEnd
        </Link></li>
        <li><Link to="/gamedev" style=
        {{ 
          textDecoration: 'none' , 
          color: 'inherit' ,
          padding: '10px',}}>
        GameDev
        </Link></li>
        {isDeveloperModeOn && <li><Link to="/addProject" style=
        {{ 
          textDecoration: 'none' , 
          color: 'inherit' ,
          padding: '10px',}}>
        +
        </Link></li>}
      </ul>
    </nav>
  )
}

export default Navbar