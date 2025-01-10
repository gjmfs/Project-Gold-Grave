import { NavLink } from "react-router-dom";
import React from "react";
import "./NavBar.css";
import menu from "../assets/icons/menu.svg";
import close from "../assets/icons/close.svg";
import zt from "../assets/images/zt.jpg";
import axios from "axios";
import { useState, useEffect } from "react";

export const NavBar = () => {
  let score = "";

  useEffect(() => {
    const username = localStorage.getItem("username");
    console.log(username);
    axios.post("http://localhost:4001/api/game/user", username).then((data) => {
      console.log(data.data);
    });
  }, []);

  return (
    <nav>
      <NavLink to="/home">
        <img id="logo" src={zt} alt="logo" />
        {score && score.username ? (
          <>
            {score.username}
            <span style={{ marginLeft: "5px" }}> {score.score}</span>
          </>
        ) : (
          "none"
        )}
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
            localStorage.removeItem("gamedata");
            localStorage.removeItem("username");
          }}
        >
          Logout
        </NavLink>
      </div>
    </nav>
  );
};
