<template>
  <el-row id="ActivityCreate" :gutter="20">
    <el-form ref="form"
             status-icon
             :model="form"
             label-width="10%"
    >
      <el-form-item label="社团"></el-form-item>
      <el-form-item label="活动名字" prop="name">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="活动发起人">
        <el-input v-model="form.principal" disabled></el-input>
      </el-form-item>
      <el-form-item label="活动类型">
      </el-form-item>
      <el-form-item label="活动地点"></el-form-item>
      <el-form-item label="开始时间"></el-form-item>
      <el-form-item label="活动时间"></el-form-item>
      <el-form-item label=""></el-form-item>
    </el-form>
  </el-row>
</template>

<script>
export default {
  name: 'activityCreate',
  data() {
    return {
      form: {
        sId: null,
        name: '',
        principal: '', // 负责人姓名
        type: '',
        location: '',
        startTime: '',
        endTime: '',
        instructor: '', // 指导老师工号
      },
    };
  },
};
</script>

<style scoped>

</style>
