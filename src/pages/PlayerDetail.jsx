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

  const isBgDark = isDark(primaryColor) ? "text-white" : "text-black";

  return (
    <section
      style={{ backgroundColor: primaryColor }}
      className="min-h-screen flex flex-col w-full overflow-x-hidden"
    >
      <div className="w-full mx-auto max-w-6xl px-4 md:px-12 py-6 md:py-12">
        <div className="flex justify-center items-center mt-6 md:mt-0 gap-5">
          <SearchField className=" w-full max-w-2xl " bgDark={isBgDark} />
          <Link to="/" element={<WelcomePage />} className={`mr-3 ${isBgDark}`}>
            Home
          </Link>
        </div>
        <div className="md:flex md:flex-nowrap md:justify-between gap-8 md:gap-12 mt-8 md:mt-12 flex-wrap">
          {/* Levý sloupec s obrázky */}
          <div className="flex flex-col items-center gap-10">
            <img
              src={headshot}
              alt={`Headshot of ${firstName} ${lastName}`}
              className=" w-[150px] h-[150px] mt-20 md:w-[240px] md:h-[240px] max-w-full rounded-3xl bg-[#adbac7]"
            />
            <img
              src={teamLogoUrl}
              alt={`${team} logo`}
              className="w-[100px] mt-5 md:w-[120px] max-w-full"
            />
          </div>
          {/* Pravý sloupec s texty */}
          <div>
            <div className="flex flex-col md:flex-row md:justify-around items-center gap-6 md:gap-10 mt-10 md:mt-15">
              <h2
                className={`${isBgDark} font-extrabold leading-tight flex-shrink`}
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 56px)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {firstName} {lastName}
              </h2>
              <p
                className={`${isBgDark} text-3xl md:text-[56px] font-extrabold`}
              >
                #{sweaterNumber}
              </p>
            </div>
            <div className="flex justify-evenly mt-10 text-2xl md:text-[50px] text-[#545d68] font-bold md:gap-10">
              <p className={`${isBgDark}`}>{position}</p>
              <p className={`${isBgDark}`}>{fullTeamName}</p>
            </div>
            <div className="flex flex-col md:flex-row mb-5 items-center justify-center gap-6 mt-12 text-xl md:text-3xl font-bold md:divide-y-0 md:divide-x divide-[#909dab]">
              <div className="flex flex-col w-full md:w-1/3 items-center">
                <p style={{ color: secondaryColor }}>Age</p>
                <p className={`${isBgDark} mt-0.5 md:mt-2`}>
                  {getPlayersAge(birthDate)}
                </p>
              </div>
              <div className="flex flex-col w-full md:w-1/3 items-center">
                <p style={{ color: secondaryColor }}>Height</p>
                <p className={`${isBgDark} mt-0.5 md:mt-2`}>{heightCm} cm</p>
              </div>
              <div className="flex flex-col w-full md:w-1/3 items-center">
                <p style={{ color: secondaryColor }}>Weight</p>
                <p className={`${isBgDark} mt-0.5 md:mt-2`}>{weightCm} kg</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row mb-5 items-center justify-center gap-6 md:mt-12 text-xl md:text-3xl text-[#0C2D48] font-bold md:divide-y-0 md:divide-x divide-[#909dab]">
              <div className="flex flex-col w-full md:w-1/2 items-center">
                <p style={{ color: secondaryColor }}>Birthdate</p>
                <p className={`${isBgDark} mt-0.5 md:mt-2`}>
                  {formatBirthDate(birthDate)}
                </p>
              </div>
              <div className="flex flex-col w-full md:w-1/2 items-center">
                <p style={{ color: secondaryColor }}>Birthplace</p>
                <div className="flex items-center">
                  <img src={flagUrl} alt={`${country} flag`} className="mr-2" />
                  <p className={`${isBgDark} mt-0.5 md:mt-2`}>
                    {country}, {birthCity}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayerDetail;
