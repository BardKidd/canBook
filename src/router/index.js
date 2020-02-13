import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '@/components/pages/Dashboard';
import Login from '@/components/pages/Login';
import Products from '@/components/pages/Products';
import Orderlist from '@/components/pages/Orderlist';
import Coupon from '@/components/pages/Coupon';
import CustomerOrder from '@/components/pages/CustomerOrder';
import CustomerOrderCheck from '@/components/pages/CustomerOrderCheck';

import CanBook from '@/components/pages/CanBook';
import FeaturedBooks from '@/components/pages/FeaturedBooks';
import Shop from '@/components/pages/Shop';
import ShopCheck from '@/components/pages/ShopCheck';
import News from '@/components/pages/News';
import Surprise from '@/components/pages/Surprise';
import AboutUs from '@/components/pages/AboutUs';
import Cart from '@/components/pages/Cart';
import CartCheck from '@/components/pages/CartCheck';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '*',
            redirect: 'canbook/featuredBooks'
        },
        {
            path: '/canbook',
            name: 'CanBook',
            component: CanBook,
            children: [
                {
                    path: 'featuredBooks',
                    name: 'FeaturedBooks',
                    component: FeaturedBooks
                },
                {
                    path: 'shop',
                    name: 'Shop',
                    component: Shop,
                },
                {
                    path: 'shop/:shopId',
                    name: 'ShopCheck',
                    component: ShopCheck
                },
                {
                    path: 'news',
                    name: 'News',
                    component: News
                },
                {
                    path: 'surprise',
                    name: 'Surprise',
                    component: Surprise
                },
                {
                    path: 'aboutUs',
                    name: 'AboutUs',
                    component: AboutUs
                },
                {
                    path: 'cart',
                    name: 'Cart',
                    component: Cart
                },
                {
                    path: 'cart/:cartId',
                    name: 'CartCheck',
                    component: CartCheck
                }
            ]
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
                },
                {
                    path: 'customerorder',
                    name: 'CustomerOrder',
                    component: CustomerOrder,
                    meta: { requiresAuth: true },
                },
                {
                    path: 'customerorder_check/:orderId',
                    name: 'CustomerOrderCheck',
                    component: CustomerOrderCheck,
                }
            ]
        }
    ]
})