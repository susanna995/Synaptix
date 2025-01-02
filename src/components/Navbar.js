import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">SYNAPTI-X</div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/detect">Detect</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </div>
            
        </nav>
    );
};

export default Navbar;
