const express = require("express");

const router = express.Router();

const {
  gameMode,
  gameScore,
  getHighScores,
} = require("../controllers/gameController");

router.get("/mode", gameMode);
router.post("/score", gameScore);
router.get("/highscores", getHighScores);

module.exports = router;
