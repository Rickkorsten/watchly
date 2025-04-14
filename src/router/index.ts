import { createRouter, createWebHistory } from 'vue-router'
import OverviewPage from "../views/OverviewPage.vue";
import DetailPage from "../views/DetailPage.vue";
import NotFoundPage from '../views/NotFoundPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: OverviewPage
        },
        {
            path: '/detail/:id',
            component: DetailPage
        },
        {
            path: '/:catchAll(.*)',
            name: 'NotFound',
            component: NotFoundPage
        }
    ]
})

export default router

