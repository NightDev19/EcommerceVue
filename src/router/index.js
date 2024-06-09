import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ProductList from '../views/ProductList.vue';
import ProductDetails from '../views/ProductDetails.vue';
import Cart from '../views/Cart.vue';
import Checkout from '../views/Checkout.vue';
import Admin from '../views/Admin.vue';
import Login from '../views/Login.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/products', name: 'ProductList', component: ProductList },
  { path: '/product/:id', name: 'ProductDetails', component: ProductDetails },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/checkout', name: 'Checkout', component: Checkout },
  { path: '/admin', name: 'Admin', component: Admin },
  { path: '/login', name: 'Login', component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
