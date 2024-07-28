import React, { useState } from "react";
import "./NavBar.css";
import CartWidget from "../cartwidget/CartWidget";
import logoImage from "../../assets/logo_drinkshop.png";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src={logoImage} alt="Logo Drinkshop" className="logo-icon" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isDropdownOpen}
          aria-label="Toggle navigation"
          onClick={toggleDropdown}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isDropdownOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Nav.Link as={NavLink} aria-current="page" to="/">
                Inicio
              </Nav.Link>
            </li>
            <li className="nav-item">
              <Nav.Link as={NavLink} to="/category/cervezas">
                Cervezas
              </Nav.Link>
            </li>
            <li className="nav-item">
              <Nav.Link as={NavLink} to="/category/whiskies">
                Whiskies
              </Nav.Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded={isDropdownOpen}
                onClick={toggleDropdown}
              >
                Spirits
              </a>
              <ul
                className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <Nav.Link
                    as={NavLink}
                    className="dropdown-item"
                    to="/category/vodka"
                  >
                    Vodka
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link
                    as={NavLink}
                    className="dropdown-item"
                    to="/category/gin"
                  >
                    Gin
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link
                    as={NavLink}
                    className="dropdown-item"
                    to="/category/ron"
                  >
                    Ron
                  </Nav.Link>
                </li>
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
