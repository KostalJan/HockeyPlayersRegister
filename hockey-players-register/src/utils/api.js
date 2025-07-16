import axios from "axios";

export const fetchData = async (url, id) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/${url}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Chyba při načítání dat: ", error.message);
    return null;
  }
};


