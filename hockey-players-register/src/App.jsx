import { useEffect, useState } from "react";
import { fetchData } from "./utils/api";

const App = () => {
  const [player, setPlayer] = useState(null);
  const [team, setTeam] = useState(null);

  useEffect(() => {
    fetchData('player', 8477201).then((data) => {
      setPlayer(data);
    });
  }, []);

  useEffect(() => {
    fetchData("team", "tor").then((data) => {
      setTeam(data);
    });
  }, []);

  return (
    <div>
      {player ? (
        <div>
          <h3>
            {player.firstName.default} {player.lastName.default}{" "}
            {player.birthCountry} {player.birthDate} {player.position}
          </h3>
        </div>
      ) : (
        <p>Loading player...</p>
      )}
      {team ? <p>{team.gameType}</p> : <p>Loading team...</p>}
    </div>
  );
};

export default App;
