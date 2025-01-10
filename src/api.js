import axios from "axios";

const jwt = localStorage.getItem("jwt");

const api = axios.create({
  baseURL: "https://cloud.appwrite.io/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt}`,
  },
});

export default api;
