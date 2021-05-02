const Affairs = () => import('@/views/affairs/index');
const AllAffairs = () => import('@/views/affairs/allAffairs/index');
const MyAffairs = () => import('@/views/affairs/myAffairs/index');

export default {
  path: '/affairs',
  name: 'Affairs',
  meta: {
    title: '事务管理',
  },
  component: Affairs,
  children: [
    {
      path: 'myAffairs',
      name: 'MyAffairs',
      meta: {
        title: '个人事务管理',
      },
      component: MyAffairs,
    },
    {
      path: 'allAffairs',
      name: 'AllAffairs',
      meta: {
        title: '社团事务管理',
      },
      component: AllAffairs,
    },
  ],
};
