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
      <Table :tableProp="tableProp" :tableData="tableData"/>
    </el-col>
    <el-col :span="4" class="left">
      <el-image :src="Logo"/>
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
import { queryUserByNumber, updateUser } from '@/api/user';
import { querySocietiesPersonnelByOne } from '@/api/societies';

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
          prop: 'sname',
          label: '社团名字',
        },
        {
          prop: 'association',
          label: '社团类别',
        },
        {
          prop: 'job',
          label: '社团职位',
        },
        {
          prop: 'date',
          label: '加入时间',
        },
      ],
      tableData: [],
      changer: true,
      societiesType: [],
    };
  },
  created() {
    this.queryUser();
  },
  methods: {
    // 更新状态
    changerUserInfo() {
      this.changer = !this.changer;
    },
    // 更新个人信息
    updateUserInfo() {
      this.changer = !this.changer;
      const userInfo = {
        classname: this.registeredInfo.classname,
        id: this.registeredInfo.id,
        name: this.registeredInfo.name,
        number: this.registeredInfo.number,
        password: this.registeredInfo.password,
        phone: this.registeredInfo.phone,
        type: this.registeredInfo.type,
      };
      updateUser(userInfo)
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              message: '更新成功',
              type: 'success',
            });
          } else {
            this.$message.error('更新失败');
          }
        });
    },
    // 重置个人信息
    reset() {
      this.changer = !this.changer;
      queryUserByNumber({ number: sessionStorage.getItem('user') })
        .then((res) => {
          this.$store.commit('saveUserInfo', res.data);
          this.registeredInfo = this.$store.state.userInfo;
        });
    },

    // 查看个人社团
    queryUser() {
      querySocietiesPersonnelByOne({
        uid: this.$store.state.userInfo.id,
        status: 1,
      })
        .then((res) => {
          res.data.map((item) => {
            const association = this.$store.state.societiesType
              .filter((value) => value.id === item.societies.association)
              .map((societiesType) => societiesType.typename);
            const job = this.$store.state.societiesJobs
              .filter((value) => value.id === item.job)
              .map((societiesJobs) => societiesJobs.typename);
            const temp = {
              sname: item.societies.sname,
              association,
              job,
              date: item.date.split(' ')[0],
            };
            return this.tableData.push(temp);
          });
        });
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
