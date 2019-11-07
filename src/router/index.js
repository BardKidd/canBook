import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '@/components/pages/Dashboard';
import Login from '@/components/pages/Login';
import Products from '@/components/pages/Products';
import Orderlist from '@/components/pages/Orderlist';
import Coupon from '@/components/pages/Coupon';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '*',
            redirect: 'login'
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/admin',
            name: 'Dashboard',
            component: Dashboard,
            meta: { requiresAuth: true },
            children: [
                {
                    path: 'products',
                    name: 'Products',
                    component: Products,
                    meta: { requiresAuth: true },
                },
                {
                    path: 'orderlist',
                    name: 'Orderlist',
                    component: Orderlist,
                    meta: { requiresAuth: true },
                },
                {
                    path: 'coupon',
                    name: 'Coupon',
                    component: Coupon,
                    meta: { requiresAuth: true },
                }
            ]
        }
    ]
})