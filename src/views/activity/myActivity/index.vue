<template>
  <div id="MyActivity">
    <MyTable :table-prop="tableProp" :table-data="tableData">
      <el-table-column
        slot="operating"
        prop="operating"
        label="操作"
        align="center"
      >
        <template v-slot="scope">
          <el-button type="text" @click="quitActivity(scope.row)">退出活动</el-button>
          <el-button v-if="scope.row.principalId===$store.state.userInfo.id"
                     type="text"
                     @click="deleteActivity(scope.row)"
          >
            删除活动
          </el-button>
        </template>
      </el-table-column>
    </MyTable>
  </div>
</template>

<script>
import MyTable from '@/components/table/index.vue';
import { queryActivityByMy, deleteActivityPeople, deleteActivity } from '@/api/activity';

export default {
  name: 'myActivity',
  inject: ['reload'],
  components: {
    MyTable,
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
    };
  },
  created() {
    queryActivityByMy({
      uid: this.$store.state.userInfo.id,
    })
      .then((res) => {
        this.tableData = res.data.map((item) => {
          const data = {
            id: item.id,
            uid: item.uid,
            name: '',
            type: '',
            principal: '',
            principalId: '',
            location: '',
            introduction: '',
            starttime: '',
            endtime: '',
          };
          data.name = item.activity.name;
          // eslint-disable-next-line array-callback-return,consistent-return
          data.type = this.$store.state.activityType.filter((type) => {
            if (type.id === item.activity.type) {
              return type;
            }
          })[0].typename;

          data.principal = item.userinfo.name;
          data.principalId = item.userinfo.id;
          data.location = item.activity.location;
          data.introduction = item.activity.introduction;
          // eslint-disable-next-line prefer-destructuring
          data.starttime = item.activity.starttime.split(' ')[0];
          // eslint-disable-next-line prefer-destructuring
          data.endtime = item.activity.endtime.split(' ')[0];
          return data;
        });
      });
  },
  methods: {
    // 退出活动
    quitActivity(row) {
      deleteActivityPeople({
        id: row.id,
        uid: row.uid,
      })
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              message: '退出活动成功',
              type: 'success',
            });
            this.reload();
          } else {
            this.$message.error('退出失败');
          }
        });
    },

    // 删除活动
    deleteActivity(row) {
      deleteActivity({
        id: row.id,
      }).then((res) => {
        if (res.code === 200) {
          this.$message({
            message: '删除活动成功',
            type: 'success',
          });
          this.reload();
        } else {
          this.$message.error('删除失败');
        }
      });
    },
  },
};
</script>

<style scoped>

</style>
