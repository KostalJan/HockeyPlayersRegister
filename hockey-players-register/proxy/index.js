const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());

const base_URL = `http://localhost:${PORT}`

app.get("/api/player/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(
      `https://api-web.nhle.com/v1/player/${id}/landing`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Chyba při volání NHL API:", error.message);
    res.status(500).json({ error: "Chyba při načítání dat" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy běží na ${base_URL}`);
});
