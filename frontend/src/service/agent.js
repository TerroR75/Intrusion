import axios from "axios";

const agent = axios.create({
  baseURL: "http://localhost:5555/",
});

// JWT configuration (if needed)
agent.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username, password) => {
  try {
    const response = await agent.post("/users/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const signup = async (username, email, password) => {
  try {
    const response = await agent.post("/users/register", { username, email, password });
    return response;
  } catch (error) {
    return error;
  }
};

export const verifyToken = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await agent.post("/users/validate-token", { token });
    return response.data;
  } catch (error) {
    console.error("Token validation failed:", error);
    return null;
  }
};
