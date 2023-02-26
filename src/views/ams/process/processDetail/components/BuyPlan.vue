<template>
  <div class="buy-plan-detail">
    <div style="margin-top: 20px">
      <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
      <span class="font-small">采购计划单详情</span>
    </div>
    <!--<div class="table-layout">
      <el-row>
        <el-col :span="5" class="table-cell-title">收款方户名</el-col>
        <el-col :span="5" class="table-cell-title">开户行</el-col>
        <el-col :span="5" class="table-cell-title">银行账号</el-col>
        <el-col :span="5" class="table-cell-title">金额</el-col>
        <el-col :span="4" class="table-cell-title">金额大写</el-col>
      </el-row>
      <el-row>
        <el-col :span="5" class="table-cell">{{ value.concreteInfo.payPeople }}</el-col>
        <el-col :span="5" class="table-cell">{{ value.concreteInfo.bankName }}</el-col>
        <el-col :span="5" class="table-cell">{{ value.concreteInfo.bankAccount }}</el-col>
        <el-col :span="5" class="table-cell">{{ value.concreteInfo.reimMoney }}</el-col>
        <el-col :span="4" class="table-cell">{{ value.concreteInfo.uppercase }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="10" class="table-cell-title">报销事由</el-col>
      </el-row>
      <el-row>
        <el-col :span="10" class="table-cell">{{ value.concreteInfo.reimReason }}</el-col>
      </el-row>
    </div>
    <div style="margin-top: 20px">
      <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
      <span class="font-small">报销款项明细</span>
    </div>-->





    <div class="table-container">
      <el-table ref="detailsTable"
                :data="value.planList"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="物资名称" align="center">
          <template slot-scope="scope">{{scope.row.goodsName}}</template>
        </el-table-column>
        <el-table-column label="使用部门/人" align="center">
          <template slot-scope="scope">{{scope.row.department}}</template>
        </el-table-column>
        <el-table-column label="商品单位" align="center">
          <template slot-scope="scope">{{scope.row.goodsUnit}}</template>
        </el-table-column>
        <el-table-column label="商品数量" align="center">
          <template slot-scope="scope">{{scope.row.goodsNums}}</template>
        </el-table-column>
        <el-table-column label="预计单价" align="center">
          <template slot-scope="scope">{{scope.row.onesMoney}}</template>
        </el-table-column>
        <el-table-column label="计划金额" align="center">
          <template slot-scope="scope">{{scope.row.goodsMoney}}</template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { validatenull } from "@/utils/validate";
import { mapGetters } from 'vuex'
import {formatDate} from "@/utils/date";
let _this = null; //_this固定指向vue对象,避免多层this

export default {
  name: 'BuyPlanDetail', //vue组件名称
  components: { //子组件
  },
  props: {
    value: {
      type: Object,
      default: function () {
        return {
          concreteInfo: []
        }
      }
    },
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
  filters: {
    formatDateTime(time) {
      if (time == null || time === '') {
        return 'N/A';
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  created() {
    _this = this //_this固定指向vue对象,避免多层this
    //created生命周期,在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
    console.log('报销信息', this.value)
  },
  data() {
    return {
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
.buy-plan-detail{
}
</style>
