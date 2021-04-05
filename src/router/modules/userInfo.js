const UserInfo = () => import('@/views/userInfo/index');

export default {
  path: '/userInfo',
  name: 'UserInfo',
  meta: {
    title: '个人信息管理',
  },
  component: UserInfo,
};
