<template>
  <div id="MyAffairs">
    <el-form>
      <el-form-item label="任务名字" prop="name">
        <el-input v-model="form.name" clearable/>
      </el-form-item>
      <el-form-item label="归属社团" prop="sid">
        <el-select v-model="form.sid" placeholder="所属社团" clearable>
          <el-option v-for="(item,index) in societies"
                     :key="index"
                     :label="item.association+item.sname"
                     :value="item.sid"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="任务状态" prop="status">
        <el-select v-model="form.status" clearable>
          <el-option v-for="(item,index) in status"
                     :key="index"
                     :label="item.label"
                     :value="item.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布时间">
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
        <el-button type="primary" @click="queryTask">查询</el-button>
      </el-form-item>
    </el-form>
    <MyTable :table-prop="tableProp" :table-data="tableData">
      <el-table-column
        slot="operating"
        prop="operating"
        label="操作"
        align="center"
      >
        <template v-slot="scope">
          <el-button type="primary"
                     :disabled
                       ="scope.row.status==2||scope.row.number!=$store.state.userInfo.id"
                     @click="updateTask(scope.row,2)">
            允许
          </el-button>
          <el-button type="danger"
                     :disabled
                       ="scope.row.status==3||scope.row.number!=$store.state.userInfo.id"
                     @click="updateTask(scope.row,3)">
            拒绝
          </el-button>
          <el-button type="info"
                     :disabled
                       ="scope.row.status>1||scope.row.number!=$store.state.userInfo.id"
                     @click="updateTask(scope.row,1)">
            忽略
          </el-button>
        </template>
      </el-table-column>
    </MyTable>
  </div>

</template>

<script>
import MyTable from '@/components/table/index.vue';
import { queryMyTask, updateTask } from '@/api/task';
import * as DateUtil from '@/utils/DateUtil';

export default {
  name: 'MyAffairs',
  components: {
    MyTable,
  },
  data() {
    return {
      form: {
        id: this.$store.state.userInfo.id,
        name: '',
        sid: '',
        status: null,
        startTime: '',
        endTime: '',
      },
      societies: [],
      time: [],
      status: [
        {
          label: '未开始',
          type: 0,
        }, {
          label: '未完成',
          type: 1,
        }, {
          label: '已完成',
          type: 2,
        }, {
          label: '已拒绝',
          type: 3,
        }],
      tableProp: [
        {
          prop: 'name',
          label: '任务名字',
        },
        {
          prop: 'typeName',
          label: '任务类型',
        },
        {
          prop: 'sName',
          label: '归属社团名字',
        },
        {
          prop: 'publisherName',
          label: '发布人姓名',
        },
        {
          prop: 'numberName',
          label: '接受人姓名',
        },
        {
          prop: 'introduction',
          label: '任务介绍',
        },
        {
          prop: 'time',
          label: '发布时间',
        },
        {
          prop: 'statusName',
          label: '任务状态',
        },
      ],
      tableData: [],
    };
  },
  created() {
    this.getSelect();
    this.queryTask();
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
    },

    /**
     * 获取任务信息
     */
    queryTask() {
      if (this.time != null && this.time.length > 0) {
        this.form.startTime = DateUtil.formatDate(this.time[0], 3);
        this.form.endTime = DateUtil.formatDate(this.time[1], 4);
      } else {
        this.form.startTime = '';
        this.form.endTime = '';
      }

      queryMyTask(this.form)
        .then((res) => {
          this.tableData = res.data.map((item) => {
            const data = {
              ...item,
              sName: item.societies.sname,
              time: item.date.split(' ')[0],
              publisherName: item.publisherInfo.name,
              numberName: item.numberInfo.name,
              introduction: item.introduction,
              statusName: '',
              typeName: this.$store.state.affairsType[item.type - 1].typeName,
            };
            switch (item.status) {
              case 0:
                data.statusName = '未开始';
                break;
              case 1:
                data.statusName = '未完成';
                break;
              case 3:
                data.statusName = '已拒绝';
                break;
              default:
                data.statusName = '已完成';
            }

            return data;
          });
        });
    },

    /**
     * 更新社团信息状态
     */
    updateTask(rows, type) {
      const params = {
        date: rows.date,
        id: rows.id,
        introduction: rows.introduction,
        name: rows.name,
        number: rows.number,
        publisher: rows.publisher,
        sid: rows.sid,
        type: rows.type,
        status: type,
      };
      updateTask(params)
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              message: '更新成功',
              type: 'success',
            });
            this.queryTask();
          } else {
            this.$message.error('更新失败');
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

.el-button + .el-button {
  margin: 5px 0 0;
}
</style>
