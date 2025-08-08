import SearchField from "../components/SearchField";
import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default SharedLayout;
