<template>
  <div id="processFunding">
    <MyTable :table-prop="tableProp" :table-data="tableData">
      <el-table-column
        slot="operating"
        prop="operating"
        label="操作"
        align="center"
      >
        <template v-slot="scope">
          <el-button type="primary"
                     :disabled="scope.row.status!=='0'"
                     @click="updateFunding(scope.row,'2')">
            允许
          </el-button>
          <el-button type="danger"
                     :disabled="scope.row.status!=='0'"
                     @click="updateFunding(scope.row,'1')">
            拒绝
          </el-button>
        </template>
      </el-table-column>
    </MyTable>
  </div>
</template>

<script>
import MyTable from '@/components/table/index.vue';
import { queryFundingByMy, updateFunding } from '@/api/funding';

export default {
  name: 'ProcessFunding',
  components: {
    MyTable,
  },
  data() {
    return {
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
          prop: 'sname',
          label: '社团名字',
        }, {
          prop: 'introduction',
          label: '申请信息',
        }, {
          prop: 'money',
          label: '申请金额',
        },
        {
          prop: 'nowMoney',
          label: '社团当前经费',
        }, {
          prop: 'statusName',
          label: '申请状态',
        },
      ],
      tableData: [],
    };
  },
  mounted() {
    this.queryFundingByMy();
  },
  methods: {
    queryFundingByMy() {
      queryFundingByMy({ dNumber: this.$store.state.userInfo.number })
        .then((res) => {
          this.tableData = res.data.map((item) => {
            if (item.status === '0') {
              return {
                ...item,
                sname: this.$store.state.societiesType[item.societies.association - 1].typename
                  + item.societies.sname,
                nowMoney: item.societies.money,
                time: item.udate.split(' ')[0],
                statusName: '未完成',
              };
            }
            if (item.status === '1') {
              return {
                ...item,
                sname: this.$store.state.societiesType[item.societies.association - 1].typename
                  + item.societies.sname,
                nowMoney: item.societies.money,
                time: item.udate.split(' ')[0],
                statusName: '已拒绝',
              };
            }
            return {
              ...item,
              sname: this.$store.state.societiesType[item.societies.association - 1].typename
                + item.societies.sname,
              nowMoney: item.societies.money,
              time: item.udate.split(' ')[0],
              statusName: '已同意',
            };
          });
        });
    },
    updateFunding(row, type) {
      const params = {
        dnumber: row.dnumber,
        id: row.id,
        introduction: row.introduction,
        money: row.money,
        sid: row.sid,
        status: type,
        udate: row.udate,
        unumber: row.unumber,

        type: this.$store.state.userInfo.type,
      };

      updateFunding(params)
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              message: '更新成功',
              type: 'success',
            });
            this.queryFundingByMy();
          } else {
            this.$message.error(res.msg);
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-button + .el-button {
  margin: 5px 0 0;
}
</style>
