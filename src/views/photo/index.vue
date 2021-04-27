<template>
  <el-row id="photo">
    <el-form>
      <el-form-item label="当前社团" prop="sId">
        <el-select v-model="form.sid" placeholder="所属社团">
          <el-option v-for="(item,index) in societies"
                     :key="index"
                     :label="item.association+item.sname"
                     :value="item.sid"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="照片名字" prop="name">
        <el-input v-model="form.name" clearable/>
      </el-form-item>
      <el-form-item label="照片日期" prop="date">
        <el-date-picker
          v-model="time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary">上传相册</el-button>
  </el-row>
</template>

<script>
export default {
  name: 'Photo',
  data() {
    return {
      form: {
        sid: '',
        name: '',
        starttime: '',
        endtime: '',
      },
      societies: [],
      time: [],
    };
  },
  created() {
    this.getSelect();
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
      this.form.sid = this.societies[0].sid;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-form {
  display: flex;

  ::v-deep .el-form-item {
    display: flex;
    white-space: nowrap;
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }

    .el-range-editor.el-input__inner {
      width: 100%;
    }
  }
}
</style>
