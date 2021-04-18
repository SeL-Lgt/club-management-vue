<template>
  <div id="Member">
    <el-row>
      <el-form>
        <el-form-item label="当前社团" prop="sId">
          <el-select v-model="form.sId" placeholder="所属社团">
            <el-option v-for="(item,index) in societies"
                       :key="index"
                       :label="item.association+item.sname"
                       :value="item.sid"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="名字" prop="name">
          <el-input v-model="form.name" placeholder="请选择查询名字" clearable/>
        </el-form-item>
        <el-form-item label="所属职位" prop="job">
          <el-select v-model="form.job" placeholder="请选择查询的职位">
            <el-option v-for="(item,index) in societiesJobs"
                       :key="index"
                       :label="item.typename"
                       :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="加入日期" prop="date">
          <el-date-picker
            v-model="time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <MyTable :tableProp="tableProp" :tableData="tableData"/>

  </div>
</template>

<script>
import MyTable from '@/components/table/index.vue';

export default {
  name: 'Member',
  components: {
    MyTable,
  },
  data() {
    return {
      form: {
        name: '',
        sId: null,
        job: null,
        date: '',
      },
      time: [],
      tableProp: [
        {
          prop: 'name',
          label: '姓名',
        },
        {
          prop: 'number',
          label: '学号',
        },
        {
          prop: 'class',
          label: '班级',
        },
        {
          prop: 'job',
          label: '职位',
        },
        {
          prop: 'time',
          label: '加入时间',
        },
      ],
      tableData: [],
      societies: [],
      societiesJobs: this.$store.state.societiesJobs,
    };
  },
  created() {
    this.getSelect();
  },
  methods: {
    onSubmit() {
      console.log('test');
    },
    /**
     * 获取所属社团
     */
    getSelect() {
      this.$store.state.societiesPersonnel.map((item) => {
        const temp = {
          job: '',
          sid: '',
          association: '',
          sname: '',
        };
        temp.job = item.job;
        temp.sid = item.sid;
        temp.sname = item.societies.sname;
        temp.association = this.$store.state.societiesType
          // eslint-disable-next-line no-shadow
          .filter((value) => value.id === item.societies.association).map((item) => item.typename);
        console.log(temp.association);
        return this.societies.push(temp);
      });
      this.form.sId = this.societies[0].sid;
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
