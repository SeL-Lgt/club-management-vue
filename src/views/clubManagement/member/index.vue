<template>
  <div id="Member">
    <el-row>
      <el-form>
        <el-form-item label="名字" prop="name">
          <el-input v-model="form.name" placeholder="请选择查询名字" clearable/>
        </el-form-item>
        <el-form-item label="所属职位" prop="job">
          <el-select v-model="form.job" placeholder="请选择查询的职位" clearable>
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
            end-placeholder="结束日期"
            clearable
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <MyTable :tableProp="tableProp" :tableData="tableData">
      <el-table-column
        v-if="$store.state.nowSocieties.job===3"
        slot="operating"
        prop="operating"
        label="操作"
        align="center"
      >
        <template v-slot="scope">
          <el-button type="danger"
                     :disabled
                       ="scope.row.number===$store.state.userInfo.number"
                     @click="deleteSocietiesPersonnel(scope.row)">
            移除成员
          </el-button>
        </template>
      </el-table-column>
    </MyTable>

  </div>
</template>

<script>
import MyTable from '@/components/table/index.vue';
import * as DateUtil from '@/utils/DateUtil';
import { querySocietiesPersonnelByExample, deleteSocietiesPersonnel } from '@/api/societies';

export default {
  name: 'Member',
  inject: ['reload'],
  components: {
    MyTable,
  },
  data() {
    return {
      form: {
        name: '',
        sid: this.$store.state.nowSocieties.sid,
        job: null,
        startTime: '',
        endTime: '',
        status: 1,
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
          prop: 'classname',
          label: '班级',
        },
        {
          prop: 'phone',
          label: '联系方式',
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
  mounted() {
    this.onSubmit();
  },
  methods: {
    /**
     * 查询社团信息
     */
    onSubmit() {
      if (this.time != null && this.time.length > 0) {
        this.form.startTime = DateUtil.formatDate(this.time[0], 3);
        this.form.endTime = DateUtil.formatDate(this.time[1], 4);
      } else {
        this.form.startTime = '';
        this.form.endTime = '';
      }
      console.log(this.form);
      querySocietiesPersonnelByExample(this.form)
        .then((res) => {
          this.tableData = res.data.filter((value) => value.societiesPersonnel.length > 0)
            .map((item) => {
              const data = {
                uid: item.id,
                name: item.name,
                number: item.number,
                job: '',
                classname: item.classname,
                phone: item.phone,
                time: item.societiesPersonnel[0].date.split(' ')[0],
              };
              const job = this.$store.state.societiesJobs
                .filter((value) => value.id === item.societiesPersonnel[0].job)
                .map((societiesJobs) => societiesJobs.typename);
              data.job = job;
              return data;
            });
        });
    },

    /**
     * 移除成员
     * @param row
     */
    deleteSocietiesPersonnel(row) {
      console.log(row);
      const data = {
        sid: this.$store.state.nowSocieties.sid,
        uid: row.uid,
      };
      deleteSocietiesPersonnel(data).then((res) => {
        if (res.code === 200) {
          this.$message({
            message: '移除成功',
            type: 'success',
          });
          this.reload();
        } else {
          this.$message.error('移除失败');
        }
      });
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
