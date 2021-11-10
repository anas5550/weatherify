import React from "react";
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import WeatherPage from "./WeatherPage";
import { Link } from 'react-router-dom';
function Navbar(){
    return (
        <>
        <Link to="/weatherpage">
            <h5 className="text-end navbar-heading">Weather</h5>
        </Link>
        </>
    )
}

export default Navbar;
