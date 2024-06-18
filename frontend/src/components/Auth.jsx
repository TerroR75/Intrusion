import { Button } from "@mui/material";
import { useAuth } from "../components/auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import MenuBar from "/src/components/mainpage/MenuBar.jsx"
import Dashboard from "./dashboard/Dashboard";

export default function Auth() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault();

    setToken();
    localStorage.removeItem("token");
    //navigate("/", { replace: true });
  };
  return (
    <>
    <Dashboard/>
    <Button variant="contained" onClick={handleLogout}>
      Logout
    </Button>
    </>
  );
}
