import React, { useState } from 'react';
import './NavBar.css';
import CartWidget from './CartWidget';
import logoImage from '../assets/logo_drinkshop.png';

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="index.html"><img src={logoImage} alt="Logo Drinkshop" className="logo-icon" /></a>
        <button className="navbar-toggler" type="button" onClick={toggleDropdown}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isDropdownOpen ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="index.html">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Cervezas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Whiskies</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" onClick={toggleDropdown}>
                Spirits
              </a>
              <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                <li><a className="dropdown-item" href="#">Vodka</a></li>
                <li><a className="dropdown-item" href="#">Gin</a></li>
                <li><a className="dropdown-item" href="#">Ron</a></li>
              </ul>
            </li>
          </ul>
          <CartWidget className="d-flex" />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;