<template>
  <el-row id="UserInfo" :gutter="20">
    <el-col :span="20">
      <el-form ref="registered"
               status-icon
               :rules="registeredRules"
               :model="registeredInfo"
               :disabled="changer"
               label-width="10%"
      >
        <el-form-item label="学号:" prop="number">
          <el-input v-model="registeredInfo.number" disabled/>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input type="password" v-model="registeredInfo.password"/>
        </el-form-item>
        <el-form-item label="真实姓名:" prop="name">
          <el-input v-model="registeredInfo.name" disabled/>
        </el-form-item>
        <el-form-item label="联系方式:" prop="phone">
          <el-input v-model="registeredInfo.phone"/>
        </el-form-item>
        <el-form-item label="所属班级:" prop="classname">
          <el-input v-model="registeredInfo.classname"/>
        </el-form-item>
      </el-form>
      <Table :table-prop=tableProp />
    </el-col>
    <el-col :span="4" class="left">
      <el-image :src="Logo"/>
      <el-button>上传头像</el-button>
      <el-button v-if="changer" type="primary" @click="changerUserInfo()">修改信息</el-button>
      <template v-else>
        <el-row>
          <el-button type="primary" @click="updateUserInfo()">保存信息</el-button>
        </el-row>
        <el-row>
          <el-button @click="reset()">取消修改</el-button>
        </el-row>
      </template>
    </el-col>
  </el-row>
</template>

<script>
import * as checkRules from '@/utils/InfoRules';
import Logo from '@/assets/logo.png';
import Table from '@/components/table/index.vue';

export default {
  name: 'UserInfo',
  data() {
    return {
      Logo,
      registeredRules: {
        number: [
          {
            validator: checkRules.checkUpdateNumber,
            trigger: 'blur',
          },
        ],
        password: [
          {
            validator: checkRules.checkPassword,
            trigger: 'blur',
          },
        ],
        name: [
          {
            validator: checkRules.checkName,
            trigger: 'blur',
          },
        ],
        phone: [
          {
            validator: checkRules.checkPhone,
            trigger: 'blur',
          },
        ],
        classname: [
          {
            validator: checkRules.checkClassName,
            trigger: 'blur',
          },
        ],
      },
      registeredInfo: this.$store.state.userInfo,
      tableProp: [
        {
          prop: '',
          label: '社团名字',
        },
        {
          prop: '',
          label: '社团类别',
        },
        {
          prop: '',
          label: '社团职位',
        },
        {
          prop: '',
          label: '加入时间',
        },
      ],
      changer: true,
    };
  },
  created() {
  },
  methods: {
    changerUserInfo() {
      this.changer = !this.changer;
      this.registeredInfo = this.$store.state.userInfo;
    },
    updateUserInfo() {
      this.changer = !this.changer;
    },
    reset() {
      this.changer = !this.changer;
      this.registeredInfo = this.$store.state.userInfo;
    },
  },
  components: {
    Table,
  },
};
</script>

<style lang="scss" scoped>
@import "index";
</style>
