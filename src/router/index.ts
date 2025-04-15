import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../views/OverviewPage.vue"),
    },
    {
      path: "/show/:id",
      component: () => import("../views/DetailPage.vue"),
      props: true,
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: () => import("../views/NotFoundPage.vue"),
    },
  ],
});

export default router;
