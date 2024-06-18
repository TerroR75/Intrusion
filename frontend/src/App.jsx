import "./App.css";
import AuthProvider from "./components/auth/AuthProvider";
import Routes from "./components/routes/Routes";
import { ThemeProvider } from "./theme/ThemeContext";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;