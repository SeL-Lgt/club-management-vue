const Affairs = () => import('@/views/affairs/index');

export default {
  path: '/affairs',
  name: 'Affairs',
  meta: {
    title: '事务管理',
  },
  component: Affairs,
  children: [],
};
