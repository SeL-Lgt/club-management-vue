const Activity = () => import('@/views/activity');
const CreateActivity = () => import('@/views/activity/create/index');
const MyActivity = () => import('@/views/activity/myActivity/index');
const QueryActivity = () => import('@/views/activity/query/index');

export default {
  path: '/activity',
  name: 'Activity',
  meta: {
    title: '社团活动管理',
  },
  component: Activity,
  children: [
    {
      path: 'createActivity',
      name: 'CreateActivity',
      meta: {
        title: '创建社团活动',
      },
      component: CreateActivity,
    },
    {
      path: 'myActivity',
      name: 'MyActivity',
      meta: {
        title: '查看我的活动',
      },
      component: MyActivity,
    },
    {
      path: 'queryActivity',
      name: 'QueryActivity',
      meta: {
        title: '查看活动信息',
      },
      component: QueryActivity,
    },
  ],
};
