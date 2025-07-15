import { useEffect, useState } from "react";
import { fetchPlayerData } from "./utils/api";

const App = () => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    fetchPlayerData(8449423).then((data) => {
      setPlayer(data);
    });
  }, []);

  return (
    <div>
      {player ? (
        <div>
          <h1>
            {player.firstName.default} {player.lastName.default}
            <img src={player.headshot} alt="" />
          </h1>
        </div>
      ) : (
        <p>Načítám hráče</p>
      )}
    </div>
  );
};

export default App;
