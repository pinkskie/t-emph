import axios from "axios";

export const api = axios.create({
  baseURL: "https://petstore3.swagger.io/api/v3",
});

const userInfo = JSON.parse(localStorage.getItem("user"));
