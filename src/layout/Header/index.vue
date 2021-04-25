<template>
  <el-header id="header" style="height: 10vh">
    <i class="icon el-icon-s-fold"></i>
    <el-dropdown>
      <div class="name">
        <span>{{ $store.state.userInfo.name }}</span>
        <i class="el-icon-caret-bottom"/>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="loginOut()">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>

</template>

<script>
export default {
  name: 'Header',
  data() {
    return {};
  },
  created() {
  },
  methods: {
    loginOut() {
      this.$message({
        message: '退出成功',
        type: 'success',
      });
      sessionStorage.clear();
      this.$store.commit('reset');
      this.$router.push('/home');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "index";
</style>
