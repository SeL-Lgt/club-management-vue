<template>
  <div id="selectFunding">
    <el-row class="selected">
      <el-form>
        <el-form-item label="金额范围">
          <!--          <el-select></el-select>-->
        </el-form-item>
        <el-form-item label="申请状态">
          <!--          <el-select></el-select>-->
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
          <el-button type="primary">查询</el-button>
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
          label: '申请人',
        }, {
          prop: 'dnumber',
          label: '分配人',
        }, {
          prop: 'udate',
          label: '申请时间',
        }, {
          prop: 'introduction',
          label: '申请信息',
        }, {
          prop: 'money',
          label: '申请金额',
        }, {
          prop: 'status',
          label: '申请状态',
        },
      ],
      tableData: [],
      dNumberList: [],
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
      queryFundingByAll(this.form).then((res) => {
        this.tableData = res.data;

      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "index";
</style>
