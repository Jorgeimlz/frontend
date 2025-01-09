import Vue from 'vue';
import VueRouter from 'vue-router';
import GastosView from '@/views/GastosView.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/gastos',
        name: 'Gastos',
        component: GastosView,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
