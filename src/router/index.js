import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import CreateUser from "../views/CreateUser.vue";
import UpdateUser from "../views/UpdateUser.vue";

const Authrouter = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
];

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/create",
    name: "CreateUser",
    component: CreateUser,
  },
  {
    path: "/update/:id",
    name: "Update",
    component: UpdateUser,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: localStorage.getItem("token") ? routes : Authrouter,
});

export default router;
