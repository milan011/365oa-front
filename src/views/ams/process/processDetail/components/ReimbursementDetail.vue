<template>
  <div class="reimbursement-detail">
    <div style="margin-top: 20px">
      <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
      <span class="font-small">报销审批单详情</span>
    </div>
    <div class="table-layout">
      <el-row>
        <el-col :span="5" class="table-cell-title">收款方户名</el-col>
        <el-col :span="5" class="table-cell-title">开户行</el-col>
        <el-col :span="5" class="table-cell-title">银行账号</el-col>
        <el-col :span="5" class="table-cell-title">金额</el-col>
        <el-col :span="4" class="table-cell-title">金额大写</el-col>
      </el-row>
      <el-row>
        <el-col :span="5" class="table-cell">张三丰</el-col>
        <el-col :span="5" class="table-cell">中国银行</el-col>
        <el-col :span="5" class="table-cell">12342523</el-col>
        <el-col :span="5" class="table-cell">23.00</el-col>
        <el-col :span="4" class="table-cell">贰拾叁元整</el-col>
      </el-row>
      <el-row>
        <el-col :span="10" class="table-cell-title">报销事由</el-col>
      </el-row>
      <el-row>
        <el-col :span="10" class="table-cell">因为买东西需要报销</el-col>
      </el-row>
    </div>
    <div style="margin-top: 20px">
      <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
      <span class="font-small">报销款项明细</span>
    </div>
    <div class="table-container">
      <el-table ref="detailsTable"
                :data="detailsList"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="费用日期" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="费用科目" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="费用说明" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="报销金额" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="金额大写" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="操作" width="140" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="showBillInfo(scope.row)">
              查看票据
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
  name: 'ReimbursementDetail', //vue组件名称
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
      detailsList: [
        {name: '管理费'}
      ],
      listLoading: false,
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
    showBillInfo(){
      console.log('查看票据')
    }
  }
}
</script>
<style scoped>
.table-layout {
  margin-top: 20px;
  border-left: 1px solid #DCDFE6;
  border-top: 1px solid #DCDFE6;
}

.table-cell {
  height: 60px;
  line-height: 40px;
  border-right: 1px solid #DCDFE6;
  border-bottom: 1px solid #DCDFE6;
  padding: 10px;
  font-size: 14px;
  color: #606266;
  text-align: center;
  overflow: hidden;
}

.table-cell-title {
  border-right: 1px solid #DCDFE6;
  border-bottom: 1px solid #DCDFE6;
  padding: 10px;
  background: #F2F6FC;
  text-align: center;
  font-size: 14px;
  color: #303133;
}
</style>
<style lang="scss" scoped>
.reimbursement-detail{
}
</style>
