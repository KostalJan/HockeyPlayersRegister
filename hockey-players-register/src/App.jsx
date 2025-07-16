import { useState } from "react";
import { fetchData } from "./utils/api";

const App = () => {
  const [playerId, setPlayerId] = useState(null);
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    setLoading(true);
    setError(false);
    event.preventDefault();
    fetchData("player", playerId)
      .then((data) => setPlayer(data))
      .catch(() => {
        setPlayer(null);
        setError(true);
        console.log("Hráč s daným ID neexistuje");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search player"
          onChange={(event) => setPlayerId(event.target.value)}
        />
        <input type="submit" />
      </form>
      <div>
        {loading && <p>Načítám</p>}
        {error && <p>Hráč nenalezen</p>}
        {player && (
          <p>
            {player.firstName.default} {player.lastName.default}
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
