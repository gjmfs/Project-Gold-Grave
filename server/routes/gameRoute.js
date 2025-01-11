const express = require("express");

const router = express.Router();

const {
  gameMode,
  gameScore,
  getHighScores,
  getUserScore,
  levelUp,
} = require("../controllers/gameController");

router.get("/mode", gameMode);
router.post("/score", gameScore);
router.get("/highscores", getHighScores);
router.post("/user", getUserScore);
router.post("/levelup", levelUp);

module.exports = router;
