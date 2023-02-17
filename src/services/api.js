import axios from "axios";

const user = JSON.parse(localStorage.getItem("token"));

export const api = axios.create({
  baseURL: "https://test-assignment.emphasoft.com/api/v1/",
  headers: user
    ? {
        Authorization: `Token ${user?.token}`,
      }
    : {},
});

export default {
  login: (body) => api.post("login/", body).then((res) => res.data),
  logout: () => localStorage.removeItem("token"),
  getUsers: () => api.get("users/").then((res) => res.data),
  getUserById: (id) => api.get(`users/${id}`).then((res) => res.data),
  createUser: (body) => api.post("users/", body).then((res) => res.data),
  updateUser: (id, body) =>
    api.put(`users/${id}`, body).then((res) => res.data),
};
