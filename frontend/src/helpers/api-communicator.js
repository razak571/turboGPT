import axios from "axios";

export const loginUser = async (email, password) => {
  const res = await axios.post("/user/login", {
    email: email,
    password: password,
  });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};

export const signupUser = async (name, email, password) => {
  const res = await axios.post("/user/signup", {
    name: name,
    email: email,
    password: password,
  });

  if (res.status !== 201) {
    throw new Error("Unable to signup");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to Authenticate user");
  }
  const data = await res.data;
  return data;
};

export const sendChatRequest = async (message) => {
  const res = await axios.post("/chat/new", { message });
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to logout");
  }
  const data = await res.data;
  return data;
};
