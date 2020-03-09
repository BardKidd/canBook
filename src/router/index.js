import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/components/backend/Dashboard'
import Login from '@/components/frontend/Login'
import Products from '@/components/backend/Products'
import Orderlist from '@/components/backend/Orderlist'
import Coupon from '@/components/frontend/Coupon'
import CustomerOrder from '@/components/backend/CustomerOrder'
import CustomerOrderCheck from '@/components/backend/CustomerOrderCheck'

import CanBook from '@/components/frontend/CanBook'
import FeaturedBooks from '@/components/frontend/FeaturedBooks'
import Shop from '@/components/frontend/Shop'
import ShopCheck from '@/components/frontend/ShopCheck'
import News from '@/components/frontend/News'
import Surprise from '@/components/frontend/Surprise'
import AboutUs from '@/components/frontend/AboutUs'
import Cart from '@/components/frontend/Cart'
import CartCheck from '@/components/frontend/CartCheck'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '*',
      redirect: 'canbook/featuredBooks'
    },
    {
      path: '/canbook',
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
          component: Shop
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
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true }
        },
        {
          path: 'orderlist',
          name: 'Orderlist',
          component: Orderlist,
          meta: { requiresAuth: true }
        },
        {
          path: 'coupon',
          name: 'Coupon',
          component: Coupon,
          meta: { requiresAuth: true }
        },
        {
          path: 'customerorder',
          name: 'CustomerOrder',
          component: CustomerOrder,
          meta: { requiresAuth: true }
        },
        {
          path: 'customerorder_check/:orderId',
          name: 'CustomerOrderCheck',
          component: CustomerOrderCheck
        }
      ]
    }
  ]
})
