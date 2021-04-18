const clubManagement = () => import('@/views/clubManagement/index');
const member = () => import('@/views/clubManagement/member/index');
const info = () => import('@/views/clubManagement/info/index');

export default {
  path: '/clubManagement',
  name: 'ClubManagement',
  meta: {
    title: '个人信息管理',
  },
  component: clubManagement,
  children: [{
    path: 'member',
    name: 'Member',
    meta: {
      title: '社团成员',
    },
    component: member,
  }, {
    path: 'info',
    name: 'Info',
    meta: {
      title: '社团信息',
    },
    component: info,
  }],
};
