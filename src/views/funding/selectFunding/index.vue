<template>
  <div id="selectFunding">
    <el-row class="selected">
      <el-form>
        <el-form-item label="金额范围">
          <el-select v-model="moneyCheck" placeholder="请选择范围">
            <el-option v-for="(item,index) in moneyList"
                       :key="index"
                       :label="item.label"
                       :value="item.type"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="申请状态">
          <el-select v-model="form.status">
            <el-option v-for="(item,index) in statusList"
                       :key="index"
                       :label="item.label"
                       :value="item.type"/>
          </el-select>
        </el-form-item>
        <el-form-item label="申请时间">
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
          <el-button type="primary" @click="queryFundingByAll">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-button type="primary" @click="dialogVisible=true">申请经费</el-button>
    </el-row>
    <MyTable :table-prop="tableProp" :table-data="tableData"/>

    <el-dialog title="申请经费"
               :visible.sync="dialogVisible"
               width="50%"
    >
      <el-form ref="dialogForm" :model="dialogForm" label-width="15%">
        <el-form-item label="申请人" prop="name">
          {{ $store.state.userInfo.name }}
        </el-form-item>
        <el-form-item label="申请社团" prop="sname">
          {{ $store.state.nowSocieties.sname }}
        </el-form-item>
        <el-form-item label="申请金额" prop="money">
          <el-input v-model="dialogForm.money" placeholder="请输入金额" clearable/>
        </el-form-item>
        <el-form-item label="分配人" prop="dNumber">
          <el-select v-model="dialogForm.dnumber" placeholder="请选择分配人" clearable>
            <el-option v-for="(item,index) in dNumberList"
                       :key="index"
                       :label="item.name"
                       :value="item.number"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="申请信息" prop="introduction">
          <el-input type="textarea" v-model="dialogForm.introduction" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createFunding">申请经费</el-button>
          <el-button @click="resetForm('dialogForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import MyTable from '@/components/table/index.vue';
import { getTeacher } from '@/api/user';
import { getPresident } from '@/api/societies';
import { createFunding, queryFundingByAll } from '@/api/funding';
import * as DateUtil from '@/utils/DateUtil';

export default {
  name: 'SelectFunding',
  inject: ['reload'],
  components: {
    MyTable,
  },
  data() {
    return {
      form: {
        sid: this.$store.state.nowSocieties.sid,
        startTime: '',
        endTime: '',
        min: null,
        max: null,
        status: null,
      },
      time: [],
      dialogVisible: false,
      dialogForm: {
        sid: this.$store.state.nowSocieties.sid,
        unumber: this.$store.state.userInfo.number,
        dnumber: '',
        introduction: '',
        money: '',
      },
      tableProp: [
        {
          prop: 'unumber',
          label: '申请人号码',
        }, {
          prop: 'dnumber',
          label: '分配人号码',
        }, {
          prop: 'time',
          label: '申请时间',
        }, {
          prop: 'introduction',
          label: '申请信息',
        }, {
          prop: 'money',
          label: '申请金额',
        }, {
          prop: 'statusName',
          label: '申请状态',
        },
      ],
      tableData: [],
      dNumberList: [],
      moneyList: [
        {
          label: '100以下',
          type: 1,
        }, {
          label: '100-500',
          type: 2,
        }, {
          label: '500以上',
          type: 3,
        }],
      moneyCheck: null,
      statusList: [{
        label: '未完成',
        type: '0',
      }, {
        label: '已拒绝',
        type: '1',
      }, {
        label: '已同意',
        type: '2',
      }],
    };
  },
  created() {
    this.getDNumber();
  },
  mounted() {
    this.queryFundingByAll();
  },
  methods: {
    getDNumber() {
      this.dNumberList = [];
      getPresident({
        sId: this.$store.state.nowSocieties.sid,
      })
        .then((res) => {
          this.dNumberList.push(res.data);
        });
      getTeacher()
        .then((res) => {
          res.data.forEach((item) => {
            this.dNumberList.push(item);
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
     * 申请经费
     */
    createFunding() {
      createFunding(this.dialogForm)
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              message: '申请信息发布成功',
              type: 'success',
            });
            this.reload();
          } else {
            this.$message.error('申请失败');
          }
        });
    },

    /**
     * 查询经费
     */
    queryFundingByAll() {
      if (this.time != null && this.time.length > 0) {
        this.form.startTime = DateUtil.formatDate(this.time[0], 3);
        this.form.endTime = DateUtil.formatDate(this.time[1], 4);
      } else {
        this.form.startTime = '';
        this.form.endTime = '';
      }

      switch (this.moneyCheck) {
        case 1: {
          this.form.min = 0.0;
          this.form.max = 100.0;
          break;
        }
        case 2: {
          this.form.min = 100.0;
          this.form.max = 500.0;
          break;
        }
        case 3: {
          this.form.min = 500.0;
          this.form.max = null;
          break;
        }
        default: {
          this.form.min = null;
          this.form.max = null;
        }
      }

      queryFundingByAll(this.form)
        .then((res) => {
          this.tableData = res.data.map((item) => {
            if (item.status === '0') {
              return {
                ...item,
                time: item.udate.split(' ')[0],
                statusName: '未完成',
              };
            }
            if (item.status === '1') {
              return {
                ...item,
                time: item.udate.split(' ')[0],
                statusName: '已拒绝',
              };
            }
            return {
              ...item,
              time: item.udate.split(' ')[0],
              statusName: '已同意',
            };
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "index";
</style>
