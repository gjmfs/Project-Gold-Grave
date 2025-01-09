// App.jsx
import { useState, useEffect, useRef } from "react";
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
import bgMusic from "./assets/audio/gamebgm.mp3";

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    // Initialize audio on component mount
    audioRef.current = new Audio(bgMusic);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    // Clean up on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle play state changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Playback failed:", error);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Save audio preferences to localStorage
  useEffect(() => {
    localStorage.setItem("bgMusicVolume", volume);
    localStorage.setItem("bgMusicPlaying", isPlaying);
  }, [volume, isPlaying]);

  // Load audio preferences from localStorage
  useEffect(() => {
    const savedVolume = localStorage.getItem("bgMusicVolume");
    const savedIsPlaying = localStorage.getItem("bgMusicPlaying");

    if (savedVolume !== null) {
      setVolume(parseFloat(savedVolume));
    }
    if (savedIsPlaying !== null) {
      setIsPlaying(savedIsPlaying === "true");
    }
  }, []);

  return (
    <div className="audio-controls">
      <button
        onClick={togglePlay}
        className="music-toggle"
        style={{
          position: "fixed",
          right: "20px",
          bottom: "20px",
          zIndex: 1000,
          padding: "10px",
          borderRadius: "50%",
          border: "none",
          background: "rgba(0, 0, 0, 0.5)",
          color: "white",
          cursor: "pointer",
        }}
      >
        {isPlaying ? "🔊" : "🔇"}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        style={{
          position: "fixed",
          right: "70px",
          bottom: "25px",
          zIndex: 1000,
          width: "100px",
        }}
      />
    </div>
  );
};

export const App = () => {
  return (
    <div className="App">
      <NavBar />
      <BackgroundMusic />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/instructions" element={<Instruction />} />
        <Route path="/leaderboard" element={<LeaderPage />} />
      </Routes>
    </div>
  );
};
