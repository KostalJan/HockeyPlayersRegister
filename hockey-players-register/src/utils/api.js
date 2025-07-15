import axios from "axios";


export const fetchPlayerData = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/player/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Chyba při načítání dat: ", error.message);
    return null;
  }
};


