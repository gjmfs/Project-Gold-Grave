import "./Login.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
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
    console.log(username, password);
    await axios
      .post("http://localhost:4001/api/user/signup", { username, password })
      .then((data) => {
        if (data.data == 1) {
          alert("User already exists");
          return;
        } else {
          alert("User created successfully");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="Login">
      <h1 id="gameName" className="mt-5">
        Gold Grave
      </h1>
      <div className="container">
        <p className="heading">User Signup</p>
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
                SignUP
              </button>
            </div>
          </div>
        </form>
        <div className="row">
          <p className="subHead">
            Already Have an account?{" "}
            <Link to="/login" className="link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
