<template>
  <el-row id="clubManagementInfo" :gutter="20">
    <el-col :span="20">
      <el-form status-icon
               :model="form"
               :disabled="changer"
               label-width="10%">
        <el-form-item label="社团名字" prop="sname">
          <el-input v-model="form.sname"/>
        </el-form-item>
        <el-form-item label="社团类型" prop="association">
          <el-input v-model="form.association"/>
        </el-form-item>
        <el-form-item label="社长学号" prop="founder">
          <el-input v-model="form.founder"/>
        </el-form-item>
        <el-form-item label="创建日期" prop="date">
          <el-input v-model="form.date"/>
        </el-form-item>
        <el-form-item label="指导老师" prop="instructor">
          <el-input v-model="form.instructor"/>
        </el-form-item>
        <el-form-item label="社团简介" prop="introduction">
          <el-input type="textarea" v-model="form.introduction"/>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="4" class="left">
      <el-image :src="Logo"/>
      <el-button v-if="changer" type="primary" @click="changerInfo()">修改信息</el-button>
      <template v-else>
        <el-row>
          <el-button type="primary" @click="updateInfo()">保存信息</el-button>
        </el-row>
        <el-row>
          <el-button @click="reset()">取消修改</el-button>
        </el-row>
      </template>
    </el-col>
  </el-row>
</template>

<script>
import Logo from '@/assets/logo.png';
import { querySocietiesByCondition } from '@/api/societies';

export default {
  name: 'Info',
  data() {
    return {
      Logo,
      form: {
        id: '',
        sname: '',
        association: '',
        date: '',
        founder: '',
        instructor: '',
        introduction: '',
        money: '',
      },
      changer: true,
    };
  },
  methods: {
    reset() {
      this.changer = !this.changer;
    },
    changerInfo() {
      querySocietiesByCondition(this.$store.state.userInfo);
      this.changer = !this.changer;
    },
    updateInfo() {
      this.changer = !this.changer;
    },
  },
};
</script>

<style lang="scss" scoped>
#clubManagementInfo {
  .left {
    text-align: center;
  }

  .el-button + .el-button {
    margin: 0;
  }

  .el-button {
    margin-bottom: 10px;
  }
}
</style>
