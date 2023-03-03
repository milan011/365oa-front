<template>
  <div class="app-container process-details-temlate">
    <el-card shadow="never" style="margin-top: 15px">
      <div class="operate-container">
        <span style="margin-left: 20px">{{ processData.baseInfo.name }}</span>
        <el-tag>{{ processData.baseInfo.apply_type_name }}</el-tag>
        <div v-show="handleButtonShow()" class="operate-button-container">
          <el-button @click="processReslove" size="mini">审批通过</el-button>
          <el-button @click="processReject" size="mini">审批驳回</el-button>
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
          <el-col :span="5" class="table-cell">{{ processData.baseInfo.applyUser }}</el-col>
          <el-col :span="5" class="table-cell">{{ processData.baseInfo.depname }}</el-col>
          <el-col :span="5" class="table-cell">{{ priorityRefect(processData.baseInfo.priority) }}</el-col>
          <el-col :span="5" class="table-cell">{{ processData.baseInfo.create_time | formatDateTime }}</el-col>
          <el-col :span="4" class="table-cell">{{ processStatusRefect(processData.baseInfo.status) }}</el-col>
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
        <el-timeline-item v-for="(item, index) in timeLineArr" :key="index" :timestamp="item.examineTime" placement="top">
          <el-card>
            <el-tag v-if="item.examineHandle == '审核通过'" type="success">{{ item.examineHandle }}</el-tag>
            <el-tag v-if="item.examineHandle == '审核驳回'" type="danger">{{ item.examineHandle }}</el-tag>
            <h4>{{ item.description }}</h4>
            <p>{{ item.examineUserRole }} {{ item.examineUser }} {{ item.examineTime }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form ref="examineForm"
               :model="examineForm"
               label-width="150px" size="small">
        <el-form-item label="审批意见：">
          <el-input v-model="examineForm.description"
                    :rows="5"
                    style="width: 250px"
                    type="textarea"></el-input>
        </el-form-item>
        <el-form-item v-if="handleNextShow()" label="下一步审核人：" prop="examineUserId">
          <el-select
            v-model="examineForm.examineUserId"
            placeholder="请选择审核人">
            <el-option
              v-for="item in examineUserList"
              :key="item.id"
              :label="item.nickName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleDialogConfirm()">{{ confirmText }}</el-button>
      </span>
    </el-dialog>
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
import {applyTypesMap, prioritysMap, processStatusMap} from "@/common/dic";
import { processDetailFetch, processExamine } from "@/api/ams/process/process"
import { mapGetters } from 'vuex'
import {createDepartment, updateDepartment} from "@/api/department";
import {fetchExamineUserList} from "@/api/login";
import {formatDate} from "@/utils/date";
let _this = null; //_this固定指向vue对象,避免多层this

const defalutExamineForm = {
  id:null,
  examineUserId: null,
  description: '',
  examineUser: '',
  examineUserRole: '',
  examineHandle: '',
}
export default {
  name: 'ProcessDetailsTemlate', //vue组件名称
  components: { //子组件
    ReimbursementDetail, PayApply, AdvancePayDetail, BuyPlanDetail, ProjectDetail, ContractDetail
  },
  computed: {
    ...mapGetters([
      'routers', 'roles', 'nickName', 'departments', "roleIds", "userId"
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
    this.currentProcessid = this.$route.query.id;
    this.getProcessDetail()
    this.getExamineUserList()
  },
  data() {
    return {
      processType: null,
      processData: {
        baseInfo: {},
        concreteInfo: {}
      },
      examineUserList: [],
      dialogVisible: false,
      handleNext: false,
      timeLineArr: [],
      title: '',
      confirmText: '',
      applyTypesMap,
      prioritysMap,
      processStatusMap,
      examineForm: Object.assign({}, defalutExamineForm)
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
        if(data.baseInfo.steps_concent){
          console.log('审核流', JSON.parse(data.baseInfo.steps_concent))
          this.timeLineArr = JSON.parse(data.baseInfo.steps_concent)
          for(let item of this.timeLineArr){
            item.examineTime = this.$moment(item.examineTime).format('YYYY-MM-DD HH:mm:ss')
          }
        }
        console.log('审核详情', data)
       })
    },
    processReslove(){
      console.log('审核通过', this.currentProcessid)
      this.title = "审核通过"
      this.handleNext = true
      this.confirmText = "通 过"
      this.examineForm.id = this.currentProcessid
      this.examineForm.description = ''
      this.examineForm.examineHandle = '审核通过'
      this.examineForm.examineUser = this.nickName
      this.examineForm.examineUserRole = this.roles[0]
      this.examineForm.status = this.roleIds.includes(9) ? 2 : 1
      this.dialogVisible =true
    },
    processReject(){
      console.log('审核驳回', this.currentProcessid)
      this.title = "审核驳回"
      this.handleNext = false
      this.confirmText = "驳 回"
      this.examineForm.id = this.currentProcessid
      this.examineForm.description = ''
      this.examineForm.examineHandle = '审核驳回'
      this.examineForm.status = 3
      this.examineForm.examineUser = this.nickName
      this.examineForm.examineUserRole = this.roles[0]
      this.dialogVisible =true
    },
    handleNextShow(){
      return this.handleNext && (!this.roleIds.includes(9))
    },
    handleDialogConfirm() {
      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('审核动作', this.examineForm)
        processExamine(this.examineForm).then((res)=>{
          this.$message({
            message: '修改成功！',
            type: 'success'
          });
          this.dialogVisible =false;
          this.$router.push({path:'/ams/processRecord'})
        })
        /*if (this.isEdit) {
          updateDepartment(this.department.id,this.department).then(response => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            this.dialogVisible =false;
            this.getList();
          })
        } else {
          createDepartment(this.department).then(response => {
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            this.dialogVisible =false;
            this.getList();
          })
        }*/
      })
    },
    getExamineUserList(){
      const params = {
        roleIds: this.roleIds,
        departments: this.departments
      }
      fetchExamineUserList(params).then(response =>{
        console.log('审核人员列表', response)
        const { data } = response
        this.examineUserList = data
      })
    },
    handleButtonShow(){
      let statusAllow = this.processData.baseInfo.status == 1
      let userAllow = this.processData.baseInfo.examine_user_id == this.userId
      return statusAllow && userAllow
    },
    priorityRefect(val){
      let returnObj = this.prioritysMap.find(item=>item.value == val)
      return returnObj ? returnObj.label : ''
    },
    processStatusRefect(val){
      let returnObj = this.processStatusMap.find(item=>item.value == val)
      return returnObj ? returnObj.label : ''
    },
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
