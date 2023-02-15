<template>
  <div class="app-container">
    <h1>审批处理</h1>
  </div>
</template>
<script>
import {formatDate} from "@/utils/date";
import {createDepartment, deleteDepartment, fetchList, updateDepartment, updateStatus} from "@/api/department";

export default {
  name: 'departmentList',
  data() {
    return {

    }
  },
  created() {
  },
  filters: {

  },
  methods: {

  }
}

</script>
<style scoped>

</style>
