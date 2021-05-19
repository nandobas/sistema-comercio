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
    path: "/arquivos",
    name: "Arquivos",
    component: () => import("../views/Arquivos/Arquivos.vue"),
  },
  {
    path: "/legislacoes/:fileId/:parentId",
    name: "Legislacoes",
    component: () => import("../views/Legislacoes/Legislacoes.vue"),
  },
  {
    path: "/livros",
    name: "Livros",
    component: () => import("../views/Livros/Livros.vue"),
  },
  {
    path: "/indices/:fileId/:parentId",
    name: "Indices",
    component: () => import("../views/Indices/Indices.vue"),
  },
  {
    path: "/livro/:idLivro",
    name: "Livro",
    component: () => import("../views/Livros/Livro.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
