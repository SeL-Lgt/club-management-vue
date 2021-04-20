<template>
  <div id="affairs">
    <el-row>
      <el-button type="primary">发布任务</el-button>
    </el-row>
    <MyTable/>
  </div>

</template>

<script>
import MyTable from '@/components/table/index';

export default {
  name: 'Affairs',
  components: {
    MyTable,
  },
  data() {
    return {
      tableProp: [
        {
          prop: 'name',
          label: '任务名字',
        },
        {
          prop: 'sName',
          label: '归属社团名字',
        },
        {
          prop: 'name',
          label: '任务名字',
        },
        {
          prop: 'name',
          label: '任务名字',
        },
        {
          prop: 'name',
          label: '任务名字',
        },
        {
          prop: 'name',
          label: '任务名字',
        },
        {
          prop: 'name',
          label: '任务名字',
        },

      ],
    };
  },
};
</script>

<style scoped>

</style>
