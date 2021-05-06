import Vue from 'vue';
import NProgress from 'nprogress';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import './permission';

import 'element-ui/lib/theme-chalk/index.css';
import 'nprogress/nprogress.css'; // 引入基础样式
import './style/main.scss';

Vue.config.productionTip = false;

NProgress.configure({ showSpinner: false });

Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if (to.path === '/backHome') {
    if (sessionStorage.getItem('type') === '1') {
      next();
    } else { next({ path: '/userInfo' }); }
  }
  next();
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
