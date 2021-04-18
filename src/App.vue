<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
import NProgress from 'nprogress';
import { queryUserByNumber } from '@/api/user';
import { querySocietiesType, querySocietiesJobs } from '@/api/societies';

export default {
  name: 'App',
  provide() { // 父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true, // 控制视图是否显示的变量
    };
  },
  created() {
    if (sessionStorage.getItem('user')) {
      queryUserByNumber({ number: sessionStorage.getItem('user') })
        .then((res) => {
          this.$store.commit('saveUserInfo', res.data);
        });
    }
    querySocietiesType()
      .then((res) => {
        this.$store.commit('saveSocietiesType', res.data);
      });
    querySocietiesJobs().then((res) => {
      this.$store.commit('saveSocietiesJobs', res.data);
    });
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    /**
     * 处理滚动
     */
    handleScroll() {
      // 剩余高度
      const surplus = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      // 当前滑动高度
      const scrollY = document.documentElement.scrollTop;
      // 当前位置百分比小数
      const coorY = scrollY / surplus;
      // 设置导航栏，这里使用NProgress.set() 动态更改进度条
      NProgress.set(coorY);
    },
    /**
     * 刷新页面
     */
    reload() {
      this.isRouterAlive = false; // 先关闭，
      this.$nextTick(() => {
        this.isRouterAlive = true; // 再打开
      });
    },
  },
};
</script>

<style lang="scss">

</style>
