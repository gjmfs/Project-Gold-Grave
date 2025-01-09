import "./Welcome.css";
import { Link } from "react-router-dom";

export const WelcomePage = () => {
  return (
    <div className="WelcomePage text-center">
      <div className="container mt-5">
        <h2 id="wel">Welcome To</h2>
        <h1 id="gameName">Gold Grave</h1>
        <h3>Let's take a look how lucky you are</h3>
        <div className="button">
          <Link to="/login" className="btn">
            Play
          </Link>
        </div>
      </div>
    </div>
  );
};
