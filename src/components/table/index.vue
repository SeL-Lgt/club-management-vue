<template>
  <el-table
    id="table"
    :data="tableData"
    stripe
    style="width: 100%"
  >
    <el-table-column
      v-for="(item,index) in tableProp"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
      align="center"
    />
  </el-table>
</template>

<script>
export default {
  name: 'Table',
  props: {
    tableData: {
      type: Array,
      default() {
        return [];
      },
    },
    tableProp: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>

</style>
