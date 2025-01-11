const user = require("../model/user");
const game = require("../model/gameScore");

//user login
const login = async (req, res) => {
  const { username, password } = req.body;
  const check = await user.findOne({ name: username, password: password });

  if (!check) {
    res.json(0);
  } else {
    res.json(check);
  }
};

//user signup
const signup = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const checkUser = await user.findOne({ name: username });
  const checkGame = await game.findOne({ username: username });
  console.log(checkUser);
  if (!checkUser) {
    await user.create({ name: username, password: password }).catch((err) => {
      res.json(err);
    });
    if (!checkGame) {
      await game.create({ username: username }).catch((err) => {
        res.json(err);
      });
    }
    res.json(0);
  } else {
    res.json(1);
  }
};

const countTotal = async (req, res) => {
  try {
    let resArr = [];
    const usercount = await user.countDocuments();
    const gamecount = await game.countDocuments();
    resArr.push(usercount, gamecount);
    res.json(resArr);
  } catch (err) {
    res.json(err);
  }
};

module.exports = { login, signup, countTotal };
