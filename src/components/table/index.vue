<template id="table">
  <el-table
    v-if="tableHeight!==''"
    :data="tableData"
    stripe
    :height="tableHeight"
  >
    <el-table-column
      v-for="(item,index) in tableProp"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
      align="center"
    />
    <slot name="operating"/>
  </el-table>
  <el-table
    v-else
    :data="tableData"
    stripe
  >
    <el-table-column
      v-for="(item,index) in tableProp"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
      align="center"
    />
    <slot name="operating"/>
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
    tableHeight: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
