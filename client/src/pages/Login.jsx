import "./Login.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/home");
    }
  }, []);
  const [password, setPassword] = useState();
  const [username, setUserName] = useState();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password || "hi");
    await axios
      .post("http://34.233.134.72:4001/api/user/login", { username, password })
      .then((data) => {
        if (!data.data == 0) {
          localStorage.setItem("user", JSON.stringify(data.data));
          localStorage.setItem("username", JSON.stringify(data.data.name));
          navigate("/home");
        } else {
          alert("User not found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post("http://34.233.134.72:4001/api/game/user", { username })
      .then((data) => {
        localStorage.setItem("gamedata", JSON.stringify(data.data));
      });
  };
  return (
    <div className="Login">
      <h1 id="gameName" className="mt-5">
        Gold Grave
      </h1>
      <div className="container">
        <p className="heading">User Login</p>
        <form method="post">
          <div className="row">
            <div className="col-3">
              <p className="subHead">User Name:</p>
            </div>
            <div className="col">
              <input
                required
                type="text"
                className="form-control"
                name="Name"
                placeholder="Your Name"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <p className="subHead">Password:</p>
            </div>
            <div className="col">
              <input
                required
                type="password"
                name="password"
                className="form-control"
                placeholder="Your Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="row mb-3 ">
              <button onClick={handleSubmit} type="submit" className="col btn">
                Login
              </button>
            </div>
          </div>
        </form>
        <div className="row">
          <p className="subHead">
            Don't have an account?{" "}
            <Link to="/signup" className="link">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
