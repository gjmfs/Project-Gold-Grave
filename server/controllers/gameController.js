const GameScore = require("../model/gameScore");

// Generate game board based on mode
const generateGame = (size, enemies) => {
  const array = new Array(size * size).fill(0);
  let placed = 0;

  while (placed < enemies) {
    const position = Math.floor(Math.random() * (size * size));
    if (array[position] === 0) {
      array[position] = 1;
      placed++;
    }
  }

  return array;
};

// Game mode controller
const gameMode = async (req, res) => {
  try {
    const { mode } = req.query;
    console.log(mode);
    let gameData;
    switch (mode) {
      case "easy":
        gameData = generateGame(3, 2); // 3x3 grid, 2 enemies
        break;
      case "medium":
        gameData = generateGame(5, 8); // 5x5 grid, 8 enemies
        break;
      case "hard":
        gameData = generateGame(8, 30); // 8x8 grid, 30 enemies
        break;
      case "insane":
        gameData = generateGame(12, 1);
        break;
      default:
        gameData = generateGame(3, 2); // Default to easy mode
    }
    console.log(gameData);
    res.json(gameData);
  } catch (error) {
    console.error("Error generating game:", error);
    res.status(500).json({ error: "Error generating game" });
  }
};

// Game score controller
const gameScore = async (req, res) => {
  try {
    const { username, score } = req.body;
    console.log(username, score);
    if (!username || score === undefined) {
      return res.status(400).json({ error: "Username and score are required" });
    }

    let userScore = await GameScore.findOne({ username });

    if (!userScore) {
      userScore = new GameScore({
        username,
        score,
      });
      await userScore.save();
      return res.json({
        message: "Score saved successfully",
        updated: true,
      });
    }

    if (score > userScore.score) {
      userScore.score = score;
      userScore.updatedAt = Date.now();
      await userScore.save();
      return res.json({
        message: "New high score saved!",
        updated: true,
      });
    }

    return res.json({
      message: "Score not higher than previous best",
      updated: false,
    });
  } catch (error) {
    console.error("Error saving score:", error);
    res.status(500).json({ error: "Error saving score" });
  }
};

// Get high scores controller
const getHighScores = async (req, res) => {
  try {
    const highScores = await GameScore.find()
      .sort({ score: -1 })
      .limit(20)
      .select("username score updatedAt");

    res.json(highScores);
  } catch (error) {
    console.error("Error fetching high scores:", error);
    res.status(500).json({ error: "Error fetching high scores" });
  }
};

// Export all controllers
module.exports = {
  gameMode,
  gameScore,
  getHighScores,
};
