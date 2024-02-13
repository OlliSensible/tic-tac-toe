import React from "react";
import { Link } from "react-router-dom"; 
import { useAuth } from './context/auth-context';

import "./header.css";

function Header() {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="home-container">
      <div className="logo-header-container">
        <Link to="/">
          <span className="circle-image">
            <img src="images/logo.png" alt="Tic-Tac-Toe logo" />
          </span>
        </Link>
        <header className="page-header">TicTacToe</header>
      </div>
      <div className="buttons-container">
        <Link to="/profile">Profile</Link>
        <Link to="/">Game</Link>
        <Link to="/registration">Registration</Link>
        <Link to="/participants">Participants</Link>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="login-button">
            Logout
          </button>
        ) : (
          <Link to="/login" className="login-button">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;