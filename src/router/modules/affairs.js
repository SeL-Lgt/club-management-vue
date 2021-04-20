const Affairs = () => import('@/views/affairs/index');

export default {
  path: '/affairs',
  name: 'Affairs',
  meta: {
    title: '后台首页',
  },
  component: Affairs,
  children: [],
};
