<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import NProgress from 'nprogress';

export default {
  name: 'App',
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
  },
};
</script>

<style lang="scss">

</style>
