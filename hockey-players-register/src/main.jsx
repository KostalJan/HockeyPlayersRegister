
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PlayerDetail from "./pages/PlayerDetail.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="" element={<App />} />
      <Route path="player/:playerId" element={<PlayerDetail />} />
    </Routes>
  </BrowserRouter>
);
