import router from '@/router';

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if (to.path === '/backHome') {
    if (sessionStorage.getItem('type') === '1') {
      next();
    } else { next({ path: '/userInfo' }); }
  }
  next();
});
