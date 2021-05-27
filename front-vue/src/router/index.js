import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/client/:intId",
    name: "EditClient",
    component: () => import("../views/Clients/Clients.vue"),
  },
  {
    path: "/client",
    name: "Clients",
    component: () => import("../views/Clients/Clients.vue"),
    meta: {
      auth: true,
    },
  },

  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register/Register.vue"),
    meta: {
      auth: false,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login/Login.vue"),
    meta: {
      auth: false,
    },
  },
  {
    path: "/auth/:sub",
    name: "auth",
    component: () => import("../views/Login/Auth.vue"),
    meta: {
      auth: false,
    },
  },
  /*// USER ROUTES
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      auth: true,
    },
  },
  // ADMIN ROUTES
  {
    path: "/admin",
    name: "admin.dashboard",
    component: AdminDashboard,
    meta: {
      auth: {
        roles: 2,
        redirect: { name: "login" },
        forbiddenRedirect: "/403",
      },
    },
  },*/
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
/*
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("token") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath },
      });
    } else {
      let user = JSON.parse(localStorage.getItem("user"));
      if (to.matched.some((record) => record.meta.is_admin)) {
        if (user.is_admin == 1) {
          next();
        } else {
          next({ name: "userboard" });
        }
      } else {
        next();
      }
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem("token") == null) {
      next();
    } else {
      next({ name: "userboard" });
    }
  } else {
    next();
  }
});*/

export default router;
