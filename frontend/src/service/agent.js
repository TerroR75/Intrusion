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

    const { token } = response.data;
    console.log(token);
    return token;
  } catch (error) {
    return error.response.data.message;
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
