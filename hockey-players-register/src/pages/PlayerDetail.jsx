import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchData } from "../utils/api";
import { formatBirthDate } from "../utils/formatBirthDate";
import { getPlayersAge } from "../utils/getPlayersAge";
import { isDark } from "../utils/isDark";
import { getImageUrl, getObject } from "../utils/getDataFromJSON";
import SearchField from "../components/SearchField";
import WelcomePage from "./WelcomePage";
import flags from "../assets/json_lists/flags.json";
import teams from "../assets/json_lists/teams.json";

const PlayerDetail = () => {
  const { playerId } = useParams();
  const [playerData, setPlayerData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [flagUrl, setFlagUrl] = useState(null);
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetchData("player", playerId)
      .then((data) => {
        if (data) {
          setPlayerData(data);
          setFlagUrl(
            getImageUrl(flags, "country", data.country, "flag", "flags")
          );
          setTeamData(getObject(teams, "team", data.team));
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [playerId]);

  if (loading)
    return <p className="text-center mt-10 text-red-500">Loading player...</p>;
  if (error || !playerData)
    return (
      <p className="text-center mt-10 text-red-500">
        Player was not found or an error hapenned.
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
  } = playerData;

  const { fullTeamName, logo, primaryColor, secondaryColor } = teamData;

  const teamLogoUrl = new URL(`../assets/team_logos/${logo}`, import.meta.url)
    .href;

  const isBgDark = isDark(primaryColor)? "text-white" : "text-black";


  return (
    <section
      style={{ backgroundColor: primaryColor }}
      className="min-h-screen  flex flex-col"
    >
      <div className="flex justify-center items-center mt-4">
        <SearchField className="mt-8 max-w-2xl mx-auto" />
        <Link to="/" element={<WelcomePage />} className="ml-5">
          Home
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center">
        <img
          src={headshot}
          alt={`Headshot of ${firstName} ${lastName}`}
          className=" w-[150px] h-[150px] mt-20 mb-4 rounded-3xl bg-[#adbac7]"
        />
        <img src={teamLogoUrl} alt={`${team} logo`} className="w-[150px] " />
      </div>
      <div className="flex flex-col md:flex-row md:justify-around items-center gap-6 mt-10">
        <h2 className= {`${isBgDark} text-4xl font-extrabold`}>
          {firstName} {lastName}
        </h2>
        <p className= {`${isBgDark} text-3xl font-extrabold`}>#{sweaterNumber}</p>
      </div>
      <div className="flex justify-evenly mt-10 text-2xl text-[#545d68] font-bold">
        <p className={`${isBgDark}`}>{position}</p>
        <p className={`${isBgDark}`}>{fullTeamName}</p>
      </div>
      <div className="flex flex-col md:flex-row mb-5 items-center justify-center gap-6 mt-12 text-xl font-bold md:divide-y-0 md:divide-x divide-[#909dab]">
        <div className="flex flex-col w-full md:w-1/3 items-center">
          <p style={{ color: secondaryColor }}>Age</p>
          <p className={`${isBgDark} mt-0.5`}>{getPlayersAge(birthDate)}</p>
        </div>
        <div className="flex flex-col w-full md:w-1/3 items-center">
          <p style={{ color: secondaryColor }}>Height</p>
          <p className={`${isBgDark} mt-0.5`}>{heightCm} cm</p>
        </div>
        <div className="flex flex-col w-full md:w-1/3 items-center">
          <p style={{ color: secondaryColor }}>Weight</p>
          <p className={`${isBgDark} mt-0.5`}>{weightCm} kg</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row mb-5 items-center justify-center gap-6 md:mt-12 text-xl text-[#0C2D48] font-bold md:divide-y-0 md:divide-x divide-[#909dab]">
        <div className="flex flex-col w-full md:w-1/2 items-center">
          <p style={{ color: secondaryColor }}>Birthdate</p>
          <p className={`${isBgDark} mt-0.5`}>{formatBirthDate(birthDate)}</p>
        </div>
        <div className="flex flex-col w-full md:w-1/2 items-center">
          <p style={{ color: secondaryColor }}>Birthplace</p>
          <div className="flex items-center">
            <img src={flagUrl} alt={`${country} flag`} className="mr-2" />
            <p className={`${isBgDark} mt-0.5`}>
              {country}, {birthCity}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayerDetail;
