const mongoose = require("mongoose");

const gameScoreSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  score: {
    type: Number,
    required: true,
    default: 0,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  level: {
    type: String,
    required: true,
    default: "easy",
  },
});

module.exports = mongoose.model("GameScore", gameScoreSchema);
