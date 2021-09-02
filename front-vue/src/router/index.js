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
    path: "/provider/:intId",
    name: "EditProvider",
    component: () => import("../views/Providers/Providers.vue"),
  },
  {
    path: "/provider",
    name: "Providers",
    component: () => import("../views/Providers/Providers.vue"),
    meta: {
      auth: true,
    },
  },
  {
    path: "/product/:intId",
    name: "EditProduct",
    component: () => import("../views/Products/Products.vue"),
  },
  {
    path: "/product",
    name: "Products",
    component: () => import("../views/Products/Products.vue"),
    meta: {
      auth: true,
    },
  },
  {
    path: "/portifolio/:intId",
    name: "EditPortifolio",
    component: () => import("../views/Portifolios/Portifolios.vue"),
  },
  {
    path: "/portifolio",
    name: "Portifolios",
    component: () => import("../views/Portifolios/Portifolios.vue"),
    meta: {
      auth: true,
    },
  },
  {
    path: "/composition/:intId",
    name: "EditComposition",
    component: () => import("../views/Compositions/Compositions.vue"),
  },
  {
    path: "/composition",
    name: "Compositions",
    component: () => import("../views/Compositions/Compositions.vue"),
    meta: {
      auth: true,
    },
  },
  {
    path: "/portifolio_composition/:intId",
    name: "EditPortifolioComposition",
    component: () => import("../views/Portifolios/PortifolioCompositions.vue"),
  },
  {
    path: "/portifolio_composition",
    name: "PortifolioCompositions",
    component: () => import("../views/Portifolios/PortifolioCompositions.vue"),
    meta: {
      auth: true,
    },
  },
  // // ADMIN ROUTES
  // {
  //   path: "/client",
  //   name: "admin.client",
  //   component: () => import("../views/Clients/AdminClients.vue"),
  //   meta: {
  //     auth: true,
  //     roles: 2,
  //   },
  // },

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
  {
    path: "/logout",
    name: "logout",
    component: () => import("../views/Login/Logout.vue"),
    meta: {
      auth: true,
    },
  },
  /*
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

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  if (to.matched.some((record) => record.meta.auth)) {
    if (token) {
      console.log(next.name);
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
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
