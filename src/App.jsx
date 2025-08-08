import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlayerDetail from "./pages/PlayerDetail";
import SharedLayout from "./pages/SharedLayout";
import WelcomePage from "./pages/WelcomePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout/>}>
        <Route/>
          <Route index element={<WelcomePage/>}/>
          <Route path="player/:playerId" element={<PlayerDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
