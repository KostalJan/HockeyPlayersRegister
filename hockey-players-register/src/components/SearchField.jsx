import { useEffect, useState } from "react";
import { fetchData } from "../utils/api";
import { Link } from "react-router-dom";

const SearchField = (className = "") => {
  const [allPlayers, setAllPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [playerName, setPlayerName] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  //Obsluha změny hodnoty ve vyhledávací poli
  const handleChange = (event) => {
    setPlayerName(event.target.value);
    setMessage("");
  };

  //Výpis výsledků vyhledávání
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const input = playerName.trim().toLowerCase();
      if (!input) {
        setFilteredPlayers([]);
        return;
      }

      const results = allPlayers
        .filter((player) =>
          `${player.firstName} ${player.lastName}`.toLowerCase().includes(input)
        )
        .slice(0, 10); //omezení na max 10 výsledků

      setFilteredPlayers(results);
    }, 300); //debounce delay

    return () => clearTimeout(delayDebounce);
  }, [playerName, allPlayers]);

  //Načtení dat
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
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder="First name"
        onChange={handleChange}
        value={playerName}
        className="px-3 py-2 border border-gray-300 rounded w-full max-w-md"
      />
      <div className="mt-2 w-full max-w-md">
        {playerName && filteredPlayers.length > 0 && (
          <ul className="absolute top-full left-0 w-full max-w-md bg-white rounded shadow-md mt-1 max-h-60 overflow-y-auto divide-y z-50">
            {filteredPlayers.map((player) => {
              return (
                <li key={player.id} >
                  <Link to={`/player/${player.id}`} state={{ player }} className=" block w-full hover:bg-gray-100 px-4 py-2">
                    {player.firstName} {player.lastName}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        {loading && <p>Načítám...</p>}
        {error && <p>Chyba při načítání hráčů</p>}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default SearchField;
