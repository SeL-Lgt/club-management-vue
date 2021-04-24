<template>
  <div id="affairs">
    <el-row>
      <el-button type="primary">发布任务</el-button>
    </el-row>
    <MyTable :table-prop="tableProp" :table-data="tableData"/>
  </div>

</template>

<script>
import MyTable from '@/components/table/index.vue';

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
          prop: 'publisher',
          label: '发布人姓名',
        },
        {
          prop: 'number',
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
          prop: 'status',
          label: '任务状态',
        },
      ],
      tableData: [],
    };
  },
};
</script>

<style scoped>

</style>
