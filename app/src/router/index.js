import {createRouter, createWebHistory } from 'vue-router';

import ProductList from '../components/ProductList.vue';
import OrderForm from '../components/OrderForm.vue';

const routes = [
    {
        path: '/',
        name: 'ProductList',
        component: ProductList
    },
    {
        path: '/order',
        name: 'OrderForm',
        component: OrderForm,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;