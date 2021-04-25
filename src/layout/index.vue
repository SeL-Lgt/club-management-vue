<template>
  <div id="layout">
    <el-container>
      <Aside/>
      <el-container class="container">
        <Header/>
        <Main/>
      </el-container>
    </el-container>
    <div class="bg"></div>
  </div>
</template>

<script>
import Aside from '@/layout/Aside/index.vue';
import Header from '@/layout/Header/index.vue';
import Main from '@/layout/Main/index.vue';

export default {
  name: 'Layout',
  components: {
    Aside,
    Header,
    Main,
  },
};
</script>

<style lang="scss" scoped>
@import "index";
</style>
