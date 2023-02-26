<template>
  <div class="app-container process-details-temlate">
    <el-card shadow="never" style="margin-top: 15px">
      <div class="operate-container">
        <span style="margin-left: 20px">{{ processData.baseInfo.name }}</span>
        <el-tag>{{ processData.baseInfo.apply_type_name }}</el-tag>
        <div class="operate-button-container">
          <el-button size="mini">审批通过</el-button>
          <el-button size="mini">审批驳回</el-button>
        </div>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">基本信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="5" class="table-cell-title">申请人</el-col>
          <el-col :span="5" class="table-cell-title">申请部门</el-col>
          <el-col :span="5" class="table-cell-title">申请优先级</el-col>
          <el-col :span="5" class="table-cell-title">申请时间</el-col>
          <el-col :span="4" class="table-cell-title">审批状态</el-col>
        </el-row>
        <el-row>
          <el-col :span="5" class="table-cell">技术部员工</el-col>
          <el-col :span="5" class="table-cell">技术部</el-col>
          <el-col :span="5" class="table-cell">正常</el-col>
          <el-col :span="5" class="table-cell">2023-02-22</el-col>
          <el-col :span="4" class="table-cell">审批中</el-col>
        </el-row>
      </div>
      <reimbursement-detail v-show="processType == '1'" v-model="processData" ref="ReimbursementDetail"></reimbursement-detail>
      <pay-apply v-show="processType == '2'" v-model="processData" ref="PayApply"></pay-apply>
      <advance-pay-detail v-show="processType == '3'" v-model="processData" ref="AdvancePayDetail"></advance-pay-detail>
      <buy-plan-detail v-show="processType == '4'" v-model="processData" ref="BuyPlanDetail"></buy-plan-detail>
      <contract-detail v-show="processType == '5'" v-model="processData" ref="ContractDetail"></contract-detail>
      <project-detail v-show="processType == '6'" v-model="processData" ref="ProjectDetail"></project-detail>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">流程信息</span>
      </div>
      <el-timeline class="process-timeline">
        <el-timeline-item timestamp="2018/4/12" placement="top">
          <el-card>
            <h4>同意审批</h4>
            <p>财务负责人 王小虎 审批通过 2018/4/2 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/3" placement="top">
          <el-card>
            <h4>同意审批</h4>
            <p>会计 王小虎 审批通过 2018/4/2 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/2" placement="top">
          <el-card>
            <h4>同意审批</h4>
            <p>技术部经理 王小虎 审批通过 2018/4/2 20:46</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>
<script>
import { validatenull } from "@/utils/validate";
import  ReimbursementDetail  from "./components/ReimbursementDetail"
import  PayApply  from "./components/PayApply"
import AdvancePayDetail from "./components/AdvancePay"
import BuyPlanDetail from "./components/BuyPlan"
import ProjectDetail from "./components/Project"
import ContractDetail from "./components/Contract"
import { processDetailFetch } from "@/api/ams/process/process"
import { mapGetters } from 'vuex'
let _this = null; //_this固定指向vue对象,避免多层this

export default {
  name: 'ProcessDetailsTemlate', //vue组件名称
  components: { //子组件
    ReimbursementDetail, PayApply, AdvancePayDetail, BuyPlanDetail, ProjectDetail, ContractDetail
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
    this.currentProcessid = this.$route.query.id;
    this.getProcessDetail()
  },
  data() {
    return {
      processType: null,
      processData: {
        baseInfo: {},
        concreteInfo: {}
      },
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
    getProcessDetail(){
      processDetailFetch(this.currentProcessid).then((res)=>{
        const { data } = res
        this.processType = data.baseInfo.apply_type_id;
        this.processData = data
        console.log('审核详情', data)
       })
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
.process-details-temlate{
  width: 80%;
  padding: 20px 20px 20px 20px;
  margin: 20px auto;
  .operate-container {
    background: #F2F6FC;
    height: 80px;
    margin: -20px -20px 0;
    line-height: 80px;
  }
  .operate-button-container {
    float: right;
    margin-right: 20px
  }
  .process-timeline{
    padding-left: 10px;
    margin-top: 10px;
  }
}
</style>
