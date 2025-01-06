import "./Home.css";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, []);

  const gameChoose = async (mode) => {
    axios
      .get(`http://34.233.134.72:4001/api/game/mode?mode=${mode}`)
      .then((data) => {
        localStorage.setItem("game", JSON.stringify(data.data));
        localStorage.setItem(
          "coins",
          data.data.filter((value) => value === 0).length
        );
        localStorage.setItem("level", mode);
        navigate("/game");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="Home">
      z
      <h1 id="gameName" className="mt-5">
        Gold Grave
      </h1>
      <div className="container  ">
        <div className="row level-row d-flex justify-content-center align-items-center align-content-center">
          <div
            className=" level"
            onClick={() => {
              gameChoose("easy");
            }}
          >
            Easy
          </div>
          <div
            className=" level"
            onClick={() => {
              gameChoose("medium");
            }}
          >
            Medium
          </div>
          <div
            className=" level"
            onClick={() => {
              gameChoose("hard");
            }}
          >
            Hard
          </div>
        </div>

        <div className="row d-flex justify-content-center">
          <Link to="/instructions" className="col sec-row">
            Instructions
          </Link>
          <Link to="/leaderboard" className="col sec-row">
            Leader Board
          </Link>
        </div>
      </div>
    </div>
  );
};
