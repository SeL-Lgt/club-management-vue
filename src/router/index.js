import Vue from 'vue';
import VueRouter from 'vue-router';
import BackHome from '@/router/modules/backHome';

Vue.use(VueRouter);

const Home = () => import('@/views/home/index');
const App = () => import('@/App');
const Layout = () => import('@/layout/index');

const routes = [
  {
    path: '/',
    name: '/',
    redirect: '/backstage',
    component: App,
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: {
          title: '首页',
        },
        component: Home,
      },
    ],
  },
  {
    path: '/backstage',
    name: 'Backstage',
    redirect: '/backHome',
    component: Layout,
    children: [
      BackHome,
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
