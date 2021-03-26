<template>
  <el-header id="header" style="height: 10vh">
    <i class="icon el-icon-s-fold"></i>
    <el-dropdown>
      <div>
        <span>用户名</span>
        <i class="el-icon-caret-bottom"/>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>

</template>

<script>
export default {
  name: 'Header',

};
</script>

<style lang="scss" scoped>
@import "index";
</style>
