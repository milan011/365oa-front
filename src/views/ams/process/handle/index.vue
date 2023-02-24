<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="名称：">
            <el-input v-model="listQuery.nameKeyword" class="input-width" placeholder="资源名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="分类：">
            <el-select v-model="listQuery.applyTypeId" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in applyTypesMap"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="processTable"
                :data="processList"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="审批类型" align="center">
          <template slot-scope="scope">{{scope.row.apply_type_name}}</template>
        </el-table-column>
        <el-table-column label="所属部门" align="center">
          <template slot-scope="scope">{{scope.row.depname}}</template>
        </el-table-column>
        <el-table-column label="优先级" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.priority == 1">
              {{priorityRefect(scope.row.priority)}}
            </el-tag>
            <el-tag type="success" v-if="scope.row.priority == 2">
              {{priorityRefect(scope.row.priority)}}
            </el-tag>
            <el-tag type="warning" v-if="scope.row.priority == 3">
              {{priorityRefect(scope.row.priority)}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="申请人" align="center">
          <template slot-scope="scope">{{scope.row.applyUser}}</template>
        </el-table-column>
        <el-table-column label="申请时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.create_time | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="操作" width="140" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleExame(scope.$index, scope.row)">
              查看并审核
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes,prev, pager, next,jumper"
          :current-page.sync="listQuery.pageNum"
          :page-size="listQuery.pageSize"
          :page-sizes="[10,15,20]"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import {formatDate} from "@/utils/date";
import { fetchList } from "@/api/ams/process/handle";
import { applyTypesMap, prioritysMap } from "@/common/dic"
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  nameKeyword: null,
  applyTypeId:null
};
export default {
  name: 'ProcessHandle',
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      processList: [],
      total: null,
      listLoading: false,
      applyTypesMap,
      prioritysMap,
    }
  },
  created() {
    this.getList();
  },
  filters: {
    formatDateTime(time) {
      if (time == null || time === '') {
        return 'N/A';
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        const { data } = response
        this.listLoading = false;
        this.processList = data.records;
        this.total = data.total;
      });
    },
    handleExame(){

    },
    priorityRefect(val){
      let returnObj = this.prioritysMap.find(item=>item.value == val)
      return returnObj ? returnObj.label : ''
    },
  }
}

</script>
<style scoped>

</style>
