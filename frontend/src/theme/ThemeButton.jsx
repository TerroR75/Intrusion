// src/components/ToggleThemeButton.jsx
import React from "react";
import Button from "@mui/material/Button";
import { useTheme } from "../theme/ThemeContext";

const ThemeButton = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Button variant="contained" color="secondary" onClick={toggleTheme}>
      Switch to {isDarkMode ? "Light" : "Dark"} Mode
    </Button>
  );
};

export default ThemeButton;
