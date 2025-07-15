import { useEffect, useState } from "react";
import { fetchPlayerData, fetchTeamData } from "./utils/api";

const App = () => {
  const [player, setPlayer] = useState(null);
  const [team, setTeam] = useState(null);

  useEffect(() => {
    fetchPlayerData(8478402).then((data) => {
      setPlayer(data);
      console.log(data);
    });
  }, []);

  useEffect(() => {
    fetchTeamData("edm").then((data) => {
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
      {team ? <p>{team.season}</p> : <p>Loading team...</p>}
    </div>
  );
};

export default App;
