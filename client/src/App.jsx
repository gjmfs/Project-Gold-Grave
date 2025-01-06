import { Routes, Route } from "react-router-dom";
import { Err } from "./pages/Err";
import { WelcomePage } from "./pages/WelcomePage";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Home } from "./pages/Home";
import { LeaderPage } from "./pages/LeaderPage";
import { Instruction } from "./pages/Instruction";
import { GamePage } from "./pages/GamePage";
import { NavBar } from "./components/NavBar";

export const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/leaderboard" element={<LeaderPage />} />
        <Route path="/instructions" element={<Instruction />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/*" element={<Err />} />
      </Routes>
    </div>
  );
};
