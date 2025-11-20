import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Multi-Environment Application</h1>
      <p>Choose your environment to continue:</p>
      <div className="nav-links">
        <Link to="/dev">Development Environment</Link>
        <Link to="/prod">Production Environment</Link>
      </div>
    </div>
  );
};

export default Home;
