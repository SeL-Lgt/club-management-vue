<template>
  <div id="main">
    <el-card style="height: 85vh;overflow: auto">
      <router-view></router-view>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Main',
};
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
