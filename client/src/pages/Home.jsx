import "./Home.css";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, []);

  const gameChoose = async (mode) => {
    localStorage.setItem("mode", mode);
    navigate("/game");
  };

  return (
    <div className="Home">
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
            Play
          </div>
        </div>

        <div className="row row-cols-1 row-cols-lg-2 row-cols-md-2 d-flex justify-content-center">
          <div className="col">
            <Link to="/instructions" className="col sec-row">
              Instructions
            </Link>
          </div>
          <div className="col">
            <Link to="/leaderboard" className="col sec-row">
              Leader Board
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
