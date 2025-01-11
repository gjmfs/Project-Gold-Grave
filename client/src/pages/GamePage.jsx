import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Game.css";
import gold from "../assets/icons/gold.svg";
import zombie from "../assets/icons/zombie.svg";
import axios from "axios";
import goldSound from "../assets/audio/coins.mp3";
import zombieSound from "../assets/audio/zombie.mp3";
import { Link } from "react-router-dom";

// Score Display Component
const ScoreDisplay = ({ score }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 300);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className={`score-display ${animate ? "updated" : ""}`}>
      Score: {score}
    </div>
  );
};

// Settings Panel Component
const SettingsPanel = ({
  volume,
  setVolume,
  isSoundEnabled,
  setIsSoundEnabled,
}) => {
  return (
    <div className="settings-panel">
      <div className="settings-content">
        <div className="setting-item">
          <button
            className="sound-toggle"
            onClick={() => setIsSoundEnabled(!isSoundEnabled)}
          >
            {isSoundEnabled ? "🔊" : "🔇"}
          </button>
        </div>
        <div className="setting-item">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="volume-slider"
          />
        </div>
      </div>
    </div>
  );
};

export const GamePage = () => {
  const navigate = useNavigate();
  const [chance, setChance] = useState(0);
  const [coins, setCoins] = useState(0);
  const [username, setUsername] = useState("");
  const [gameData, setGameData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gridSize, setGridSize] = useState(0);
  const [clickedCells, setClickedCells] = useState(new Set());
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [volume, setVolume] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [res, setRes] = useState(null);
  const [level, setLevel] = useState("easy");

  const [goldAudio] = useState(new Audio(goldSound));
  const [zombieAudio] = useState(new Audio(zombieSound));

  // Initial data fetch
  useEffect(() => {
    const initializeGame = async () => {
      try {
        const userString = localStorage.getItem("gamedata");
        if (!userString) {
          navigate("/login");
          return;
        }
        let storedScore = parseInt(localStorage.getItem("score"));
        if (storedScore > score) {
          setScore(storedScore);
        }
        const userData = JSON.parse(userString);
        setUsername(userData.username);

        // Set initial level if not exists
        const currentLevel = localStorage.getItem("mode") || "easy";
        setLevel(currentLevel);

        // Fetch initial game data
        const response = await axios.get(
          `http://localhost:4001/api/game/mode?mode=${currentLevel}`
        );

        if (response.data) {
          const gameData = response.data;
          localStorage.setItem("game", JSON.stringify(gameData));
          const coinCount = gameData.filter((value) => value === 0).length;
          localStorage.setItem("coins", coinCount);
          localStorage.setItem("mode", currentLevel);

          setGameData(gameData);
          setCoins(coinCount);

          // Set grid size
          const squareRoot = Math.floor(Math.sqrt(gameData.length));
          setGridSize(squareRoot);
        }
      } catch (error) {
        console.error("Error initializing game:", error);
        setError("Failed to initialize game");
      } finally {
        setIsLoading(false);
      }
    };

    initializeGame();
  }, [navigate]);

  // Audio volume effect
  useEffect(() => {
    goldAudio.volume = volume;
    zombieAudio.volume = volume;
  }, [volume, goldAudio, zombieAudio]);

  const levelDataReq = async (newLevel) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:4001/api/game/mode?mode=${newLevel}`
      );

      if (response.data) {
        const newGameData = response.data;
        localStorage.setItem("game", JSON.stringify(newGameData));
        localStorage.setItem(
          "coins",
          newGameData.filter((value) => value === 0).length
        );
        localStorage.setItem("mode", newLevel);

        // Update state before reload
        setGameData(newGameData);
        setLevel(newLevel);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error fetching new level data:", error);
      setError("Failed to load new level");
    } finally {
      setIsLoading(false);
    }
  };

  const gameWin = () => {
    const levels = {
      easy: "medium",
      medium: "hard",
      hard: "insane",
    };
    const nextLevel = levels[level];
    if (nextLevel) {
      levelDataReq(nextLevel);
    }
  };

  const handleGameOver = async () => {
    try {
      console.log(username, score);
      const response = await axios.post(
        "http://localhost:4001/api/game/score",
        {
          username,
          score,
        }
      );

      if (response.data) {
        setRes(response.data.updated);
      }
    } catch (error) {
      console.error("Error saving score:", error);
      setError("Failed to save score");
    }
  };

  const playSound = (audio) => {
    if (isSoundEnabled) {
      audio.currentTime = 0;
      audio.play().catch((error) => {
        console.error("Audio play failed:", error);
      });
    }
  };

  const handleClick = (index, itemType) => {
    if (clickedCells.has(index) || isGameOver) {
      return;
    }

    setClickedCells((prev) => new Set([...prev, index]));

    if (itemType === 1) {
      playSound(zombieAudio);
      setIsGameOver(true);
      handleGameOver();
    } else if (itemType === 0) {
      playSound(goldAudio);

      setScore((prevScore) => prevScore + 100);
      setChance((prevChance) => {
        const newChance = prevChance + 1;
        if (newChance === coins) {
          localStorage.setItem("score", score);
          gameWin();
        }
        return newChance;
      });
    }
  };

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!gameData.length)
    return <div className="error">No game data available</div>;

  const gridStyles = {
    display: "grid",
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
    gap: "10px",
    padding: "20px",
    width: "100%",
    maxWidth: "80vw",
    margin: "0 auto",
  };

  return (
    <div className="Game">
      <div className="settings-control">
        <button
          className="settings-button"
          onClick={() => setShowSettings(!showSettings)}
        >
          ⚙️
        </button>
        {showSettings && (
          <SettingsPanel
            volume={volume}
            setVolume={setVolume}
            isSoundEnabled={isSoundEnabled}
            setIsSoundEnabled={setIsSoundEnabled}
          />
        )}
      </div>

      <h1 id="gameName" className="mt-5">
        Gold Grave
      </h1>
      <ScoreDisplay score={score} />
      {isGameOver && (
        <div className="game-over">
          {res ? (
            <div>
              New High Score: {score}! <br />
              <Link
                to={"/home"}
                onClick={() => {
                  localStorage.removeItem("game");
                  localStorage.removeItem("score");
                }}
              >
                Give Up
              </Link>
            </div>
          ) : (
            <div>
              Game Over! Your score: {score}
              <br />
              <Link
                to="/home"
                onClick={() => {
                  localStorage.removeItem("game");
                  localStorage.removeItem("score");
                }}
              >
                Give Up
              </Link>
            </div>
          )}
        </div>
      )}

      <div className="container gamePad">
        <div style={gridStyles}>
          {gameData.map((item, index) => (
            <div
              className={`game-cell ${
                clickedCells.has(index) ? "revealed" : ""
              }`}
              key={index}
              onClick={() => handleClick(index, item)}
            >
              <div className="cell-content">
                <div className="cell-front"></div>
                <div className="cell-back">
                  {item === 1 ? (
                    <img src={zombie} alt="zombie" className="img-fluid" />
                  ) : item === 0 ? (
                    <img src={gold} alt="gold" className="img-fluid" />
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
