<template>
  <div id="createFunding">
    <el-form>
      <el-form-item label="申请人"></el-form-item>
      <el-form-item label="申请信息"></el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CreateFunding',
};
</script>

<style lang="scss" scoped>
.el-form {
  width: 99%;
}

.el-select {
  width: 100%;
}

.el-date-editor {
  width: 100%;
}
</style>
