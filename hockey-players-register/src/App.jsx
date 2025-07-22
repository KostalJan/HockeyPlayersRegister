import { useEffect, useState } from "react";
import { fetchData } from "./utils/api";
import { Link } from "react-router-dom";


const App = () => {
  const [allPlayers, setAllPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [playerName, setPlayerName] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);


  //Obsluha změny ve vyhledávání
  const handleChange = (event) => {
    const input = event.target.value;
    setPlayerName(input);

    if (!input || input.trim() === "") {
      setFilteredPlayers([]);
      setMessage("");
      return;
    }

    const filtered = allPlayers.filter((onePlayer) => {
      const fullName =
        `${onePlayer.firstName} ${onePlayer.lastName}`.toLowerCase();
      return fullName.includes(input.toLowerCase());
    });

    setFilteredPlayers(filtered);
    setMessage("");
  };


  //Obsluha odeslání formuláře
  const handleSubmit = (event) => {
    event.preventDefault();

    if (filteredPlayers.length === 0) {
      setMessage("Hráč nebyl nalezen");
    } else {
      setMessage("");
    }

    const filteredResults = allPlayers.filter((onePlayer) => {
      return onePlayer.firstName.toLowerCase() === playerName.toLowerCase();
    });

    setFilteredPlayers(filteredResults);

    if (filteredPlayers.length === 0) {
      setMessage("Hráč nebyl nalezen");
    } else {
      setMessage("");
    }
    setPlayerName("");
  };


  useEffect(() => {
    setLoading(true);
    setError(false);
    fetchData("players")
      .then((data) => setAllPlayers(data))
      .catch(() => {
        setAllPlayers([]);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);


  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First name"
          onChange={handleChange}
          value={playerName}
        />
        <input type="submit" />
      </form>
      <div>
        {playerName && filteredPlayers.length > 0 && (
          <ul>
            {filteredPlayers.map((player) => {
              return (
                <li key={player.id}>
                  <Link to={`/player/${player.id}`}
                  state={{player}}>
                    {player.firstName} {player.lastName}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        {loading && <p>Načítám...</p>}
        {error && <p>Chyba při načítání hráčů.</p>}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default App;
