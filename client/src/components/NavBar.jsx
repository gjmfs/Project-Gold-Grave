import { NavLink } from "react-router-dom";
import React from "react";
import "./NavBar.css";
import menu from "../assets/icons/menu.svg";
import close from "../assets/icons/close.svg";
import zt from "../assets/images/zt.jpg";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const [score, setScore] = useState("");
  const [times, setTimes] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const storedData = localStorage.getItem("username");
    setTimes(localStorage.getItem("timesPlayed"));
    if (storedData == null) {
      navigate("/login");
    } else {
      let username;
      if (
        storedData &&
        storedData.startsWith('"') &&
        storedData.endsWith('"')
      ) {
        username = storedData.slice(1, -1);
      } else {
        username = storedData;
      }
      console.log(username);
      if (username.length > 0) {
        console.log(username);
        axios
          .post("http://34.233.134.72:4001/api/game/user", { username })
          .then((data) => {
            localStorage.setItem("gamedata", JSON.stringify(data.data));
          });
      }
      setScore(JSON.parse(localStorage.getItem("gamedata")));
    }
  }, [times]);

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
            localStorage.removeItem("mode");
          }}
        >
          Logout
        </NavLink>
      </div>
    </nav>
  );
};
