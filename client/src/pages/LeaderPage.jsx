import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import "./Leader.css";

export const LeaderPage = () => {
  const navigate = useNavigate();
  const [highScores, setHighScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    } else {
      const fetchHighScores = async () => {
        try {
          const response = await axios.get(
            "http://34.233.134.72:4001/api/game/highscores"
          );

          setHighScores(response.data);
        } catch (error) {
          console.error("Error fetching high scores:", error);
          setError("Error fetching high scores");
        } finally {
          setLoading(false);
        }
      };

      fetchHighScores();
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="Leader">
      <h2 className="text-center mb-3 mt-3" id="gameName">
        Luckiest People <br /> Ever Exisist
      </h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Username</th>
            <th scope="col">Level</th>
            <th scope="col">Score</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {highScores.map((score, index) => (
            <tr key={score._id}>
              <td scope="row">{index + 1}</td>
              <td>{score.username}</td>
              <td>{score.level}</td>
              <td>{score.score}</td>
              <td>
                {formatDistanceToNow(score.updatedAt, { addSuffix: true })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
