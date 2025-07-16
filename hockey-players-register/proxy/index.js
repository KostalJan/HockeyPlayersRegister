const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());

const base_URL = "https://api-web.nhle.com/v1/";

const endpointMap = {
  player: (id) => `player/${id}/landing`,
  team: (id) => `club-stats/${id}/now`,
};

//Getting data from a specific endpoint
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

app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});
