import Vue from 'vue';
import VueRouter from 'vue-router';
import BackHome from '@/router/modules/backHome';
import UserInfo from '@/router/modules/userInfo';
import ClubManagement from '@/router/modules/clubManagement';

Vue.use(VueRouter);

const Home = () => import('@/views/home/index');
const App = () => import('@/App');
const Layout = () => import('@/layout/index');
// const SocietiesShow = () => import('@/views/societiesShow/index');

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

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
        // children: [
        //   {
        //     path: 'societiesShow/:id',
        //     name: 'SocietiesShow',
        //     meta: {
        //       title: '社团详情',
        //     },
        //     component: SocietiesShow,
        //   },
        // ],
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
      ClubManagement,
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
