<template>
  <div id="ActivityCreate">
    <el-form ref="form"
             status-icon
             :model="form"
             label-width="10%"
    >
      <el-form-item label="社团">
        <el-select v-model="form.sid" placeholder="所属社团">
          <el-option v-for="(item,index) in societies"
                     :key="index"
                     :label="item.association+item.sname"
                     :value="item.sid"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="活动名字" prop="name">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="活动发起人" prop="principal">
        <div>{{ $store.state.userInfo.name }}</div>
      </el-form-item>
      <el-form-item label="活动类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择活动类型">
          <el-option v-for="(item,index) in activityType"
                     :key="index"
                     :label="item.typename"
                     :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="指导老师工号" prop="instructor">
        <el-input v-model="form.instructor"/>
      </el-form-item>
      <el-form-item label="活动地点" prop="location">
        <el-input v-model="form.location"/>
      </el-form-item>
      <el-form-item label="活动时间" prop="time">
        <el-date-picker
          v-model="time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          clearable
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="活动简介" prop="introduction">
        <el-input v-model="form.introduction"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="reset('form')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createActivity } from '@/api/activity';
import * as DateUtil from '@/utils/DateUtil';

export default {
  name: 'activityCreate',
  data() {
    return {
      form: {
        sid: '',
        name: '',
        principal: this.$store.state.userInfo.id, // 负责人姓名
        type: '',
        location: '',
        starttime: '',
        endtime: '',
        instructor: '', // 指导老师工号
        introduction: '',
        userName: this.$store.state.userInfo.name,
      },
      societies: [],
      activityType: this.$store.state.activityType,
      time: [],
    };
  },
  created() {
    this.getSelect();
  },
  methods: {
    onSubmit() {
      if (this.time != null && this.time.length > 0) {
        this.form.starttime = DateUtil.formatDate(this.time[0], 3);
        this.form.endtime = DateUtil.formatDate(this.time[1], 4);
      }
      createActivity(this.form)
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              message: '创建社团活动成功',
              type: 'success',
            });
          } else {
            this.$message.error('创建失败');
          }
        });
      this.reset('form');
    },
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
      this.form.sid = this.societies[0].sid;
      console.log(this.$store.state.activityType);
    },
    /**
     * 重置
     */
    reset(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
#ActivityCreate {
  .el-form {
    width: 99%;
  }

  .el-select {
    width: 100%;
  }
  .el-date-editor{
    width: 100%;
  }
}
</style>
