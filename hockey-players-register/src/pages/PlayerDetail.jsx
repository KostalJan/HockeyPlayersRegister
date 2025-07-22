import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../utils/api";
import { formatBirthDate } from "../utils/formatBirthDate";
import { getPlayersAge } from "../utils/getPlayersAge";
import SearchField from "../components/SearchField";

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
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [playerId]);

  if (loading)
    return <p className="text-center mt-10 text-red-500">Načítám hráče...</p>;
  if (error || !player)
    return (
      <p className="text-center mt-10 text-red-500">
        Hráč nebyl nalezen nebo došlo k chybě.
      </p>
    );

  const {
    firstName,
    lastName,
    headshot,
    team,
    position,
    country,
    sweaterNumber,
    heightCm,
    weightCm,
    birthDate,
    birthCity,
  } = player;

  return (
    <section className="bg-[#cdd9e5] min-h-screen  flex flex-col ">
      <div className="flex justify-center items-center mt-4">
        <SearchField className="mt-8 max-w-2xl mx-auto"/>
      </div>
      <div className="flex justify-center">
        <img
          src={headshot}
          alt={`Headshot of ${firstName} ${lastName}`}
          className=" w-[150px] h-[150px] mt-20 rounded-3xl bg-[#adbac7]"
        />
      </div>
      <div className="flex flex-col md:flex-row md:justify-around items-center gap-6 mt-10">
        <h2 className="text-4xl font-extrabold">
          {firstName} {lastName}
        </h2>
        <p className="text-3xl font-extrabold">
          #{sweaterNumber}
        </p>
      </div>
      <div className="flex justify-evenly mt-10 text-2xl text-[#545d68] font-bold">
        <p>{position}</p>
        <p>{team}</p>
      </div>
      <div className="flex flex-col md:flex-row mb-5 items-center justify-center gap-6 mt-12 text-xl font-bold md:divide-y-0 md:divide-x divide-[#909dab]">
        <div className="flex flex-col w-full md:w-1/3 items-center">
          <p className="text-black">Age</p>
          <p className="text-[#545d68] mt-0.5">{getPlayersAge(birthDate)}</p>
        </div>
        <div className="flex flex-col w-full md:w-1/3 items-center">
          <p className="text-black">Height</p>
          <p className="text-[#545d68] mt-0.5">{heightCm} cm</p>
        </div>
        <div className="flex flex-col w-full md:w-1/3 items-center">
          <p className="text-black">Weight</p>
          <p className="text-[#545d68] mt-0.5">{weightCm} kg</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row mb-5 items-center justify-center gap-6 md:mt-12 text-xl text-[#0C2D48] font-bold md:divide-y-0 md:divide-x divide-[#909dab]">
        <div className="flex flex-col w-full md:w-1/2 items-center">
          <p className="text-black">Birthdate</p>
          <p className="text-[#545d68] mt-0.5">{formatBirthDate(birthDate)}</p>
        </div>
        <div className="flex flex-col w-full md:w-1/2 items-center">
          <p className="text-black">Birthplace</p>
          <p className="text-[#545d68] mt-0.5">
            {birthCity}, {country}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PlayerDetail;
