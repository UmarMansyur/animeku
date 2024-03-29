import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "parent",
    component: () => import("../views/Parent.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/search/:query",
    name: "Search",
    component: () => import("../views/Search.vue"),
  },
  {
    path: "/:id",
    name: "Anime",
    component: () => import("../views/Detail.vue"),
  },
  {
    path: "/:name/:id",
    name: "Anime Detail",
    component: () => import("../views/DetailAnimeEps.vue"),
  },
  {
    path: '/ongoing-anime',
    name: 'OnGoingAnime',
    component: () => import('../views/MoreAnime.vue')
  },
  {
    path: '/genre',
    name: 'genre',
    component: () => import('../views/Genre.vue')
  },
  {
    path: '/genre/:id',
    name: 'list-genre',
    component: () => import('../views/DetailGenre.vue')
  },
  {
    path: '/complete-anime',
    name: 'CompleteAnime',
    component: () => import('../views/MoreAnime.vue')
  }
];



const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  if (to.path === '/') {
    next('/home')
  } else {
    next()
  }
});

export default router;