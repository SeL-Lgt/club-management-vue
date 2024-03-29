import Vue from 'vue';
import VueRouter from 'vue-router';
import BackHome from '@/router/modules/backHome';
import UserInfo from '@/router/modules/userInfo';
import ClubManagement from '@/router/modules/clubManagement';
import Affairs from '@/router/modules/affairs';
import Activity from '@/router/modules/activity';
import Photo from '@/router/modules/photo';
import Funding from '@/router/modules/funding';

Vue.use(VueRouter);

const Home = () => import('@/views/home/index');
const App = () => import('@/App');
const Layout = () => import('@/layout/index');
// const SocietiesShow = () => import('@/views/societiesShow/index');

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location)
    .catch((err) => err);
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
      Affairs,
      Activity,
      Photo,
      Funding,
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
