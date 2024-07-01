import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/cover.png";
import useLogout from "../hooks/useLogout";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const { handleLogout } = useLogout();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsCategoriesOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className={`links ${isMenuOpen ? "open" : ""}`}>
          <Link className="link" to="/" onClick={closeMenu}>
            Home
          </Link>
          <div className="subnav">
            <button className="subnavbtn" onClick={toggleCategories}>
              Categories
            </button>
            <div className={`subnav-content ${isCategoriesOpen ? "open" : ""}`}>
              <Link className="link" to="/?cat=art" onClick={closeMenu}>
                ART
              </Link>
              <Link className="link" to="/?cat=science" onClick={closeMenu}>
                SCIENCE
              </Link>
              <Link className="link" to="/?cat=technology" onClick={closeMenu}>
                TECHNOLOGY
              </Link>
              <Link className="link" to="/?cat=cinema" onClick={closeMenu}>
                CINEMA
              </Link>
              <Link className="link" to="/?cat=design" onClick={closeMenu}>
                DESIGN
              </Link>
              <Link className="link" to="/?cat=food" onClick={closeMenu}>
                FOOD
              </Link>
            </div>
          </div>
          {currentUser ? (
            <>
              <p>{currentUser?.username}</p>
              <p onClick={handleLogout}>Logout</p>
            </>
          ) : (
            <Link className="link" to="/login" onClick={closeMenu}>
              Login
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write" onClick={closeMenu}>
              Write
            </Link>
          </span>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
