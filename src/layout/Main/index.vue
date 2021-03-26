<template>
  <div id="main">
    <el-card style="height: 85vh">
      <slot></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Main',
};
</script>

<style scoped>
@import "index.scss";
</style>
