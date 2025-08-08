const express = require("express");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;

app.use(cors());

const base_URL = "https://api-web.nhle.com/v1/";

//spustí server
app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});

//Koncové body endpointů
const endpointMap = {
  team: (id) => `club-stats/${id}/now`,
};

//Funkce pro načtení dat ze souboru a naparsování data
const readJsonFile = (fileName) => {
  const filePath = path.join(__dirname, fileName);
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

//funkce pro nalezení objektu dle id
const findItemById = (dataArray, id) => {
  return dataArray.find((item) => String(item.id) === String(id));
};

//Endpoint pro všechny hráče
app.get("/api/players", (request, result) => {
  try {
    const players = readJsonFile("players.json");
    result.json(players);
  } catch (error) {
    console.error("Chyba při načítání hráčů:", error.message);
    result.status(500).json({ error: "Chyba při načítání seznamu hráčů" });
  }
});

//Endpoint pro konkrétního hráče
app.get("/api/player/:id", (request, result) => {
  try {
    const players = readJsonFile("players.json");
    const player = findItemById(players, request.params.id);
    if (player) {
      result.json(player);
    } else {
      result.status(404).json({ error: "Hráč nebyl nalezen" });
    }
  } catch (error) {
    console.error("Chyba při načítání hráče:", error.message);
    result.status(500).json({ error: "Chyba při načítání hráče" });
  }
});

//Načtení data z konkrétního endpointu
app.get("/api/:type/:id", async (request, result) => {
  const { type, id } = request.params;
  const endpointBuilder = endpointMap[type];

  if (!endpointBuilder) {
    return result.status(404).json({ error: "Zadaný endpoint neexistuje" });
  }

  try {
    const url = base_URL + endpointBuilder(id);
    const response = await axios.get(url);
    result.json(response.data);
  } catch (error) {
    console.error("Chyba při volání NHL API:", error.message);
    result.status(500).json({ error: "Chyba při načítání dat (server)" });
  }
});
