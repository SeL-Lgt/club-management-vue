<template>
  <div id="allAffairs">
    <el-form class="selected">
      <el-form-item label="任务名字" prop="name">
        <el-input v-model="form.name" clearable/>
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
    <el-row>
      <el-button type="primary" @click="dialogVisible=true">发布任务</el-button>
    </el-row>
    <MyTable :table-prop="tableProp" :table-data="tableData"/>

    <!--  创建任务  -->
    <el-dialog title="发布任务" width="40%" :visible.sync="dialogVisible">
      <el-form class="taskForm" ref="taskForm" :model="taskForm" label-width="15%">
        <el-form-item label="任务名字" prop="name">
          <el-input v-model="taskForm.name" clearable/>
        </el-form-item>
        <el-form-item label="任务类型" prop="type">
          日常任务
        </el-form-item>
        <el-form-item label="归属社团" prop="sid">
          {{ $store.state.nowSocieties.association[0] }}-{{ $store.state.nowSocieties.sname }}
        </el-form-item>
        <el-form-item label="发布人姓名" prop="publisher">
          {{ $store.state.userInfo.name }}
        </el-form-item>
        <el-form-item label="接受人姓名" prop="number">
          <el-select v-model="taskForm.number" clearable>
            <el-option v-for="(item,index) in societiesPersonnel"
                       :key="index"
                       :label="item.userinfo.name"
                       :value="item.uid"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间" prop="dialogTime">
          <el-date-picker
            v-model="dialogTime"
            type="date"
            placeholder="选择日期"
            clearable
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="任务介绍">
          <el-input v-model="taskForm.introduction" type="textarea"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createTask()">发布任务</el-button>
          <el-button @click="resetForm('taskForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
import MyTable from '@/components/table/index.vue';
import { queryTask, createTask } from '@/api/task';
import * as DateUtil from '@/utils/DateUtil';
import { querySocietiesPersonnelAll } from '@/api/societies';

export default {
  name: 'allAffairs',
  components: {
    MyTable,
  },
  data() {
    return {
      form: {
        name: '',
        sid: this.$store.state.nowSocieties.sid,
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
        }],
      tableProp: [
        {
          prop: 'name',
          label: '任务名字',
        },
        {
          prop: 'type',
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
          prop: 'date',
          label: '发布时间',
        },
        {
          prop: 'statusName',
          label: '任务状态',
        },
      ],
      tableData: [],
      taskForm: {
        name: '', // 任务名字
        sid: this.$store.state.nowSocieties.sid, // 社团id
        date: '', // 发布日期
        publisher: this.$store.state.userInfo.id, // 发布人信息
        number: '', // 任务接受人
        status: '', // 任务状态
        type: this.$store.state.affairsType[3].id, // 任务类型
        introduction: '', // 简介
      },
      dialogVisible: false,
      dialogTime: null,
      societiesPersonnel: [],
    };
  },
  created() {
    this.getSelect();
    this.queryTask();
    this.querySocietiesPersonnel();
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

      queryTask(this.form)
        .then((res) => {
          this.tableData = res.data.map((item) => {
            const data = {
              ...item,
              sName: item.societies.sname,
              date: item.date.split(' ')[0],
              publisherName: item.publisherInfo.name,
              numberName: item.numberInfo.name,
              introduction: item.introduction,
              statusName: '',
              type: this.$store.state.affairsType[item.type - 1].typeName,
            };
            switch (item.status) {
              case 0:
                data.statusName = '未开始';
                break;
              case 1:
                data.statusName = '未完成';
                break;
              default:
                data.statusName = '已完成';
            }

            return data;
          });
        });
    },

    /**
     * 重置表单
     * @param formName
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /**
     * 查询社团成员
     */
    querySocietiesPersonnel() {
      querySocietiesPersonnelAll({
        sId: this.$store.state.nowSocieties.sid,
      })
        .then((res) => {
          this.societiesPersonnel = res.data;
        });
    },

    createTask() {
      this.taskForm.date = DateUtil.formatDate(this.dialogTime, 2);
      createTask(this.taskForm)
        .then((res) => {
          console.log(res);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "index";
</style>
