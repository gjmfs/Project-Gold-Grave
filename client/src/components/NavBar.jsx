import { NavLink } from "react-router-dom";
import React from "react";
import "./NavBar.css";
import menu from "../assets/icons/menu.svg";
import close from "../assets/icons/close.svg";
import zt from "../assets/images/zt.jpg";

const score = JSON.parse(localStorage.getItem("gamedata"));

export const NavBar = () => {
  return (
    <nav>
      <NavLink to="/home">
        <img id="logo" src={zt} alt="logo" />

        <NavLink>User_Name: {score.username}</NavLink>
        <NavLink>High_Score: {score.score}</NavLink>
      </NavLink>

      <input type="checkbox" id="sidebar-active" />
      <label htmlFor="sidebar-active" className="open-sidebar-button">
        <img className="icons" src={menu} />
      </label>
      <label htmlFor="sidebar-active" id="overlay"></label>
      <div className="links-container">
        <label htmlFor="sidebar-active" className="close-sidebar-button">
          <img className="icons" src={close} />
        </label>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
        <NavLink to="/instructions">Instructions</NavLink>
        <NavLink
          to={"/"}
          onClick={() => {
            localStorage.removeItem("game");
            localStorage.removeItem("user");
          }}
        >
          Logout
        </NavLink>
      </div>
    </nav>
  );
};
