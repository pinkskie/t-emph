import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import CreateUser from "../views/CreateUser.vue";
import UpdateUser from "../views/UpdateUser.vue";
import PageNotFound from "../views/PageNotFound";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      auth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/create",
    name: "CreateUser",
    component: CreateUser,
    meta: {
      auth: true,
    },
  },
  {
    path: "/update/:id",
    name: "Update",
    component: UpdateUser,
    meta: {
      auth: true,
    },
  },
  { path: "/:pathMatch(.*)*", component: PageNotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (localStorage.getItem("token")) {
      return next();
    } else {
      return next("/login");
    }
  }
  next();
});

export default router;
