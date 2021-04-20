<template>
  <el-row id="clubManagementInfo" :gutter="20">
    <el-col :span="20" class="right">
      <el-form
        ref="form"
        status-icon
        :model="form"
        :disabled="changer"
        label-width="10%"
      >
        <el-form-item label="社团名字" prop="sname">
          <el-input v-model="form.sname"/>
        </el-form-item>
        <el-form-item label="社团类型" prop="association">
          <el-select v-model="form.association" placeholder="所属社团类型">
            <el-option v-for="(item,index) in societiesType"
                       :key="index"
                       :label="item.typename"
                       :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="社长学号" prop="founder">
          <el-input v-model="form.founder"/>
        </el-form-item>
        <el-form-item label="创建日期" prop="date">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"/>
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
      <el-row>
        <el-select v-model="form.id" placeholder="所属社团" @change="getInfo">
          <el-option v-for="(item,index) in societies"
                     :key="index"
                     :label="item.association[0]+item.sname"
                     :value="item.sid"
          />
        </el-select>
      </el-row>
      <el-button v-if="changer"
                 type="primary"
                 :disabled="disableChanger"
                 @click="changerInfo()">
        修改信息
      </el-button>
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
import { querySocietiesByCondition, updateSocietiesInfo } from '@/api/societies';
import { queryUserByNumber } from '@/api/user';

export default {
  name: 'Info',
  inject: ['reload'],
  data() {
    return {
      Logo,
      form: {
        id: null,
        sname: null,
        association: null,
        date: null,
        founder: null,
        instructor: null,
        introduction: null,
        money: null,
      },
      changer: true,
      societies: [],
      disableChanger: true,
      societiesType: this.$store.state.societiesType,
    };
  },
  created() {
    this.getSelect();
    this.getInfo();
  },
  methods: {
    /**
     * 获取所属社团
     */
    getSelect() {
      this.societies = this.$store.state.societiesPersonnel.map((item) => {
        const temp = {
          job: item.job,
          sid: item.sid,
          association: '',
          sname: item.societies.sname,
        };
        temp.association = this.$store.state.societiesType
          // eslint-disable-next-line no-shadow
          .filter((value) => value.id === item.societies.association)
          // eslint-disable-next-line no-shadow
          .map((item) => item.typename);
        return temp;
      });
      this.form.id = this.societies[0].sid;
    },
    /**
     * 获取信息
     */
    getInfo() {
      querySocietiesByCondition({ id: this.form.id })
        .then((res) => {
          // eslint-disable-next-line prefer-destructuring
          this.form = res.data[0];
        });
      const data = this.$store.state.societiesPersonnel
        .filter((value) => value.sid === this.form.id);
      if (data[0].job === 3) {
        this.disableChanger = false;
      } else {
        this.disableChanger = true;
      }
    },
    reset() {
      querySocietiesByCondition({ id: this.form.id })
        .then((res) => {
          // eslint-disable-next-line prefer-destructuring
          this.form = res.data[0];
        });
      this.changer = !this.changer;
    },
    changerInfo() {
      this.changer = !this.changer;
    },
    updateInfo() {
      updateSocietiesInfo(this.form)
        .then((res) => {
          if (res.code === 200) {
            queryUserByNumber({ number: sessionStorage.getItem('user') })
              .then((resf) => {
                this.$store.commit('saveUserInfo', resf.data);
                this.getSelect();
                this.reload();
              });
            this.$message({
              message: '修改社团信息成功',
              type: 'success',
            });
          } else {
            this.$message.error('修改失败');
            this.reset();
          }
        });
      this.changer = !this.changer;
    },
  },
};
</script>

<style lang="scss" scoped>
#clubManagementInfo {
  .right {
    ::v-deep .el-date-editor.el-input, {
      width: 100%;
    }

    .el-select {
      width: 100%;
    }
  }

  .left {
    text-align: center;

    .el-row {
      margin-bottom: 10px;
    }
  }

  .el-button + .el-button {
    margin: 0;
  }

  .el-button {
    width: 100%;
  }
}
</style>
