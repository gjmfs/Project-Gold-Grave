import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Instructions.css";

export const Instruction = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="Instructions">
      <h2 id="gameName">Instruction</h2>
      <div className="inst">
        <p className="head">Concept</p>
        <p className="body">
          There's a cemetery. It's contain Tresure. You are here to collect
          these treasures for your fortune. <br />
          but there's one problem here. when it come to fortune theres always
          risk comes front. <br />
          yeah. you can find your fortune in some cemeteries also theres some
          cemeteries have zombies. <br />
          if you choose golden cemetery you can get 100 score. but if you choose
          wrong one you will end up game over. <br />
          Sounds like fun huh. <br />
          let's give it a try then. <br />
          Good Luck Gamers.
        </p>
      </div>
      <div className="inst">
        <p className="head">How to Play</p>
        <p className="body">
          It's a simple game. You have to choose what kind a level you wish to
          play. and then you have to belive in your luck and pick up the
          cemeteries.
        </p>
      </div>
      <div className="inst">
        <p className="head">About Game Algorithm</p>
        <p className="body">
          It's a simple game. You have to choose what kind a level you wish to
          play. and then you have to belive in your luck and pick up the
          cemeteries.
        </p>
      </div>
      <div className="inst">
        <p className="head">Chances to Win</p>
        <p className="body">
          Each Level have the unique number of chances to win. <br />
          <ul>
            <li>Easy Level: 7 Chances</li>
            <li>Medium Level: 17 Chances</li>
            <li>Hard Level: 34 Chances</li>
          </ul>
          So. Better Luck Next Time.
        </p>
      </div>
    </div>
  );
};
