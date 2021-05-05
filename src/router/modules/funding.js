const Funding = () => import('@/views/funding/index');
const CreateFunding = () => import('@/views/funding/createFunding/index');
const ProcessFunding = () => import('@/views/funding/processFunding/index');
const SelectFunding = () => import('@/views/funding/selectFunding/index');

export default {
  path: '/funding',
  name: 'Funding',
  meta: {
    title: '经费管理',
  },
  component: Funding,
  children: [
    {
      path: 'createFunding',
      name: 'CreateFunding',
      meta: {
        title: '申请经费',
      },
      component: CreateFunding,
    }, {
      path: 'processFunding',
      name: 'ProcessFunding',
      meta: {
        title: '经费分配',
      },
      component: ProcessFunding,
    }, {
      path: 'selectFunding',
      name: 'SelectFunding',
      meta: {
        title: '经费查询',
      },
      component: SelectFunding,
    },
  ],
};
