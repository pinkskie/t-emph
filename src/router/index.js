import { createRouter, createWebHistory } from "vue-router";

import mainLayout from "../layout/mainLayout.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      auth: true,
      layout: mainLayout,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/create",
    name: "CreateUser",
    component: () => import("../views/CreateUser.vue"),
    meta: {
      auth: true,
      layout: mainLayout,
    },
  },
  {
    path: "/update/:id",
    name: "Update",
    component: () => import("../views/UpdateUser.vue"),
    meta: {
      auth: true,
      layout: mainLayout,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../views/PageNotFound"),
  },
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
