const express = require("express");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;

app.use(cors());

const base_URL = "https://api-web.nhle.com/v1/";

//Koncové body endpointů
const endpointMap = {
  team: (id) => `club-stats/${id}/now`,
};

//Načte data z konkrétního endpointu
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


//Načte data ze souboru players.json a vytvoří pro ně endpoint
app.get("/api/players", (request, result) => {
  const filePath = path.join(__dirname, "players.json");

  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const players = JSON.parse(data);
    result.json(players);
  } catch (error) {
    console.error("Chyba při načítání players.json:", error.message);
    result.status(500).json({ error: "Chyba při načítání seznamu hráčů" });
  }
});

//spustí server
app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});
