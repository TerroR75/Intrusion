import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { verifyToken } from "../../service/agent";
import { CircularProgress } from "@mui/material";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [loading, setLoading] = useState(true);

  const setToken = (newToken) => {
    setToken_(newToken);
  };

  useEffect(() => {
    const validateAndSetToken = async () => {
      setLoading(true);
      if (token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        localStorage.setItem("token", token);
        const data = await verifyToken();
        if (data) {
          setIsTokenValid(true);
        } else {
          setIsTokenValid(false);
          setToken_(null);
        }
      } else {
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
        setIsTokenValid(false);
      }
      setLoading(false);
    };

    validateAndSetToken();
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      isTokenValid,
      setToken,
    }),
    [token, isTokenValid]
  );

  return <AuthContext.Provider value={contextValue}>{!loading && children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
