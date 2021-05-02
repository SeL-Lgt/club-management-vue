<template>
  <div id="ActivityQuery">
    <el-form>
      <el-form-item label="活动名字" prop="name">
        <el-input v-model="form.name" clearable/>
      </el-form-item>
      <el-form-item label="活动类型">
        <el-select v-model="form.type" placeholder="请选择活动类型">
          <el-option v-for="(item,index) in activityType"
                     :key="index"
                     :label="item.typename"
                     :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="活动日期" prop="date">
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
        <el-button type="primary" @click="queryActivity">查询</el-button>
      </el-form-item>
    </el-form>

    <MyTable :table-height="tableHeight" :table-prop="tableProp" :table-data="tableData">
      <el-table-column
        slot="operating"
        prop="operating"
        label="操作"
        align="center"
      >
        <template v-slot="scope">
          <el-button type="text" @click="addActivityPeople(scope.row)">参加活动</el-button>
        </template>
      </el-table-column>

    </MyTable>

  </div>
</template>

<script>
import MyTable from '@/components/table/index.vue';
import { queryActivityByAll, addActivityPeople } from '@/api/activity';
import * as DateUtil from '@/utils/DateUtil';

export default {
  name: 'activityQuery',
  components: {
    MyTable,
  },
  props: {
    tableHeight: {
      type: String,
      default: '70vh',
    },
  },
  data() {
    return {
      tableProp: [
        {
          prop: 'name',
          label: '活动名字',
        },
        {
          prop: 'type',
          label: '活动类型',
        },
        {
          prop: 'sName',
          label: '归属社团',
        },
        {
          prop: 'principal',
          label: '负责人',
        },
        {
          prop: 'location',
          label: '活动地点',
        },
        {
          prop: 'introduction',
          label: '活动简介',
        },
        {
          prop: 'starttime',
          label: '开始时间',
        },
        {
          prop: 'endtime',
          label: '结束时间',
        },
      ],
      tableData: [],
      form: {
        name: '', // 活动名字
        type: '', // 活动类型
        location: '', // 活动地址
        starttime: '',
        endtime: '',
      },
      time: [],
      activityType: this.$store.state.activityType,
    };
  },
  created() {
    this.queryActivity();
  },
  methods: {
    /**
     * 查询活动列表
     */
    queryActivity() {
      if (this.time != null && this.time.length > 0) {
        this.form.starttime = DateUtil.formatDate(this.time[0], 3);
        this.form.endtime = DateUtil.formatDate(this.time[1], 4);
      } else {
        this.form.starttime = '';
        this.form.endtime = '';
      }
      queryActivityByAll(this.form)
        .then((res) => {
          this.tableData = res.data.map((item) => {
            const data = {
              id: item.id,
              sName: item.societies.sname,
              name: '',
              type: '',
              principal: '',
              location: '',
              introduction: '',
              starttime: '',
              endtime: '',
            };
            data.name = item.name;
            // eslint-disable-next-line array-callback-return,consistent-return
            data.type = this.$store.state.activityType.filter((type) => {
              if (type.id === item.type) {
                return type;
              }
            })[0].typename;
            data.principal = item.userinfo.name;
            data.location = item.location;
            data.introduction = item.introduction;
            // eslint-disable-next-line prefer-destructuring
            data.starttime = item.starttime.split(' ')[0];
            // eslint-disable-next-line prefer-destructuring
            data.endtime = item.endtime.split(' ')[0];
            return data;
          });
        });
    },

    /**
     * 参加活动
     */
    addActivityPeople(row) {
      if (this.$store.state.userInfo.id == null) {
        this.$message({
          message: '请先登录',
          type: 'warning',
        });
      } else {
        const data = {
          id: row.id,
          uid: this.$store.state.userInfo.id,
          name: this.$store.state.userInfo.name,
        };
        addActivityPeople(data)
          .then((res) => {
            if (res.code === 200) {
              this.$message({
                message: '报名参加活动成功',
                type: 'success',
              });
            } else {
              this.$message({
                message: '已报名参加活动',
                type: 'warning',
              });
            }
          });
      }
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
