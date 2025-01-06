const user = require("../model/user");
const game = require("../model/gameScore");
//user login
const login = async (req, res) => {
  const { username, password } = req.body;
  const check = await user.findOne({ name: username, password: password });
  const score = await game.findOne({ username: username });
  if (!check) {
    res.json(0);
  } else {
    res.json([check, score]);
  }
};

//user signup
const signup = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const check = await user.findOne({ name: username });
  console.log(check);
  if (!check) {
    await user.create({ name: username, password: password }).catch((err) => {
      res.json(err);
    });
    await game.create({ username: username, score: 0 }).catch((err) => {
      res.json(err);
    });
  } else {
    res.json(1);
  }
};

module.exports = { login, signup };
