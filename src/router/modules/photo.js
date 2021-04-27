const Photo = () => import('@/views/photo/index');

export default {
  path: '/photo',
  name: 'Photo',
  meta: {
    title: '相册管理',
  },
  component: Photo,
  children: [],
};
