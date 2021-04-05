import Vue from 'vue';
import VueRouter from 'vue-router';
import BackHome from '@/router/modules/backHome';
import UserInfo from '@/router/modules/userInfo';

Vue.use(VueRouter);

const Home = () => import('@/views/home/index');
const App = () => import('@/App');
const Layout = () => import('@/layout/index');

const routes = [
  {
    path: '/',
    name: '/',
    redirect: '/home',
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
      UserInfo,
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
