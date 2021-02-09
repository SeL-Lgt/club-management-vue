import Vue from 'vue';
import NProgress from 'nprogress';
import App from './App.vue';
import router from './router';
import store from './store';
import 'nprogress/nprogress.css'; // 引入基础样式
import './style/main.scss';
// eslint-disable-next-line import/order
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

NProgress.configure({ showSpinner: false });

Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  next();
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
