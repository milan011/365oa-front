<template>
  <div class="app-container remi-details">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>明细列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="detailsTable"
                v-loading="listLoading"
                :data="list"
                border style="width: 100%;">
        <el-table-column align="center" label="费用日期">
          <template slot-scope="scope">{{scope.row.happenTime}}</template>
        </el-table-column>
        <el-table-column align="center" label="费用科目">
          <template slot-scope="scope">{{scope.row.reimCourse}}</template>
        </el-table-column>
        <el-table-column align="center" label="费用说明" width="160">
          <template slot-scope="scope">{{scope.row.reimExplain}}</template>
        </el-table-column>
        <el-table-column align="center" label="报销金额">
          <template slot-scope="scope">{{scope.row.reimMoney}}</template>
        </el-table-column>
        <el-table-column align="center" label="大写金额">
          <template slot-scope="scope">{{scope.row.reimMoney}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="140">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { validatenull } from "@/utils/validate";
import { mapGetters } from 'vuex'
let _this = null; //_this固定指向vue对象,避免多层this

export default {
  name: 'RemiDetails', //vue组件名称
  components: { //子组件
  },
  computed: {
    ...mapGetters([
      'routers'
    ]),
    routes() {
      // return this.$router.options.routes
      return this.routers
    },
  },
  created() {
    _this = this //_this固定指向vue对象,避免多层this
    //created生命周期,在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
  },
  data() {
    return {
      list: [],
      listLoading: false,
      dialogVisible: false,
    }
  },
  mounted(){
    //mounted生命周期:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作
  },
  activated () {
    //<keep-alive>包裹的动态组件会被缓存,当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。
  },
  watch:{ //响应数据的变化
  },
  methods: {
    handleAdd() {
      /*this.dialogVisible = true;
      this.isEdit = false;
      this.department = Object.assign({},defaultDepartment);*/
    },
    handleDelete(index, row) {
      this.$confirm('是否要删除该明细?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        /*let ids = [];
        ids.push(row.id);
        let params=new URLSearchParams();
        params.append("ids",ids);
        deleteDepartment(params).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList();
        });*/
      });
    },
    handleUpdate(index, row) {
      /*this.dialogVisible = true;
      this.isEdit = true;
      this.department = Object.assign({},row);*/
    },
  }
}
</script>
<style scoped>
</style>
<style lang="scss" scoped>
.remi-details{
}
</style>
