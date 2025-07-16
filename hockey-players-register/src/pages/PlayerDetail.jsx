import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../utils/api";

const PlayerDetail = () => {
  const { playerId } = useParams();
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetchData("player", playerId)
      .then((data) => {
        if (data) {
          setPlayer(data);
          console.log(data);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [playerId]);

  if (loading) return <p>Načítám hráče...</p>;
  if (error || !player) return <p>Hráč nebyl nalezen nebo došlo k chybě.</p>;

  const {firstName, lastName, headshot, team} = player
  return (
    <div>
      <h3>{firstName} {lastName} -- {team}</h3>
      <img src={headshot} alt="" />
    </div>
  );
};

export default PlayerDetail;
