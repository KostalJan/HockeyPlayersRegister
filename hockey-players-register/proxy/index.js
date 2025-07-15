const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());

const base_URL = "https://api-web.nhle.com/v1/";

//GET endpoint for getting datas about player
app.get("/api/player/:id", async (request, result) => {
  const { id } = request.params;

  try {
    const response = await axios.get(`${base_URL}player/${id}/landing`);
    result.json(response.data);
  } catch (error) {
    console.error("Chyba při volání NHL API:", error.message);
    result.status(500).json({ error: "Chyba při načítání dat (server)" });
  }
});


app.get("/api/team/:id", async (request, result) => {
  const { id } = request.params;

  try {
    const response = await axios.get(`${base_URL}club-stats/${id}/20242025/2`);
    result.json(response.data);
  } catch (error) {
    console.error("Chyba při volání NHL API:", error.message);
    result.status(500).json({ error: "Chyba při načítání dat" });
  }
});

app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});
