const BackHome = () => import('@/views/backHome/index.vue');

export default {
  path: '/backHome',
  name: 'BackHome',
  meta: {
    title: '后台首页',
  },
  component: BackHome,
  children: [],
};
