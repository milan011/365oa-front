<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="formData" :rules="rules" ref="projectForm" label-width="160px">
      <el-form-item label="标题：" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="优先级：" prop="priority">
        <el-select
          v-model="formData.priority"
          placeholder="请选择优先级">
          <el-option
            v-for="item in prioritysMap"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属部门：" prop="departmentId">
        <el-select
          v-model="formData.departmentId"
          @change="handleChangeDep"
          placeholder="请选择所属部门">
          <el-option
            v-for="item in allDepartmentList"
            :key="item.id"
            :label="item.depname"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审核人：" prop="examineUserId">
        <el-select
          v-model="formData.examineUserId"
          placeholder="请选择审核人">
          <el-option
            v-for="item in examineUserList"
            :key="item.id"
            :label="item.nickName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收款单位：" prop="collectionCompnay">
        <el-input v-model="formData.collectionCompnay"></el-input>
      </el-form-item>
      <el-form-item label="开户行：" prop="bankName">
        <el-input v-model="formData.bankName"></el-input>
      </el-form-item>
      <el-form-item label="银行账号：" prop="bankAccount">
        <el-input v-model="formData.bankAccount"></el-input>
      </el-form-item>
      <el-form-item label="合同编号：" prop="contractCode">
        <el-input v-model="formData.contractCode"></el-input>
      </el-form-item>
      <el-form-item label="合同名称：" prop="contractName">
        <el-input v-model="formData.contractName"></el-input>
      </el-form-item>
      <el-form-item label="合同金额：" prop="contractMoney">
        <el-input-number
          v-model="formData.contractMoney"
          controls-position="right"
          :precision="2"
          :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="实际结算金额：" prop="actualMoney">
        <el-input-number
          v-model="formData.actualMoney"
          controls-position="right"
          :precision="2"
          :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="付款事由：" prop="payReason">
        <el-input v-model="formData.payReason"></el-input>
      </el-form-item>
      <el-form-item label="累计已开发票金额：" prop="cumulInvoice">
        <el-input-number
          v-model="formData.cumulInvoice"
          controls-position="right"
          :precision="2"
          :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="累计已付款金额：" prop="cumulPay">
        <el-input-number
          v-model="formData.cumulPay"
          controls-position="right"
          :precision="2"
          :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="应付款金额：" prop="shuldPay">
        <el-input-number
          v-model="formData.shuldPay"
          controls-position="right"
          :precision="2"
          :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="本次开票金额：" prop="thsTime">
        <el-input-number
          v-model="formData.thsTime"
          controls-position="right"
          :precision="2"
          :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="本次申请付款金额：" prop="thsTimeWant">
        <el-input-number
          v-model="formData.thsTimeWant"
          controls-position="right"
          @change="payMoneyChange"
          :precision="2"
          :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="大写金额：">
        <el-input readonly v-model="formData.uppercase" style="width: 250px"></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input
          :autoSize="true"
          v-model="formData.remark"
          type="textarea"
          placeholder="请输入基本内容"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handleCancle">取消</el-button>
        <el-button :loading="sendLoading" type="primary" size="medium" @click="finishCommit('projectForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import {formatDate} from "@/utils/date";
import {fetchAllDepartmentList} from "@/api/department";
import {fetchExamineUserList} from "@/api/login"
import { departmentFilter } from "@/common/commonFun"
import {changeToChinese} from "@/utils/common";
import {prioritysMap} from "@/common/dic";
import {createProject} from "@/api/ams/process/process"
import {mapGetters} from "vuex";
const defaultFormData = {
  name: '',
  examineUserId: null,
  departmentId: null,
  applyTypeId: '6',
  department: null,
  applyTypeName: '工程项目付款审批单',
  priority: '1',
  stepsConcent: '',
  collectionCompnay: '',
  bankName: '',
  bankAccount: '',
  contractCode: '',
  contractName: '',
  payReason: '',
  remark: '',
  contractMoney: undefined,
  actualMoney: undefined,
  cumulInvoice: undefined,
  cumulPay: undefined,
  shuldPay: undefined,
  thsTime: undefined,
  thsTimeWant: undefined,
  uppercase: '',

}
export default {
  name: 'PayApply',
  computed: {
    ...mapGetters(['departments', "roleIds"]),
  },
  data() {
    return {
      sendLoading: false,
      allDepartmentList: [],
      examineUserList: [],
      formData: Object.assign({}, defaultFormData),
      rules: {
        name: [
          {required: true, message: '请输入审批标题', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        ],
        examineUserId: [
          {required: true, message: '请选择审核人', trigger: 'blur'}
        ],
        departmentId: [
          {required: true, message: '请选择所属部门', trigger: 'blur'},
        ],
        collectionCompnay: [
          {required: true, message: '请确认收款单位', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'},
        ],
        contractCode: [
          {required: true, message: '请输入合同编号', trigger: 'blur'},
        ],
        contractName: [
          {required: true, message: '请输入合同名称', trigger: 'blur'},
        ],
        bankName: [
          {required: true, message: '请输入开户行', trigger: 'blur'},
        ],
        bankAccount: [
          {required: true, message: '请输入银行账号', trigger: 'blur'},
        ],
        contractMoney: [
          {required: true, message: '请填写合同金额', trigger: 'blur'},
        ],
        actualMoney: [
          {required: true, message: '请填写实际结算金额', trigger: 'blur'},
        ],
        payReason: [
          {required: true, message: '请填写付款事由说明', trigger: 'blur'},
        ],
        cumulInvoice: [
          {required: true, message: '请填写累计已开发票金额', trigger: 'blur'},
        ],
        cumulPay: [
          {required: true, message: '请填写累计已付款金额', trigger: 'blur'},
        ],
        shuldPay: [
          {required: true, message: '请填写应付款金额', trigger: 'blur'},
        ],
        thsTime: [
          {required: true, message: '请填写本次开票金额', trigger: 'blur'},
        ],
        thsTimeWant: [
          {required: true, message: '请填写本次申请付款金额', trigger: 'blur'},
        ],
        remark: [
          {required: true, message: '请填写备注', trigger: 'blur'},
        ],
      },
      prioritysMap,
    }
  },
  created() {
    this.getAllDepartmentList()
    this.getExamineUserList()
  },
  filters: {

  },
  methods: {
    finishCommit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否提交数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            console.log('提交合同', this.formData)
            this.sendLoading = true
            createProject(this.formData).then(response=>{
              this.$message({
                type: 'success',
                message: '提交成功',
                duration:1000
              });
              location.reload();
              this.sendLoading = false
            }).catch(()=>{
              this.sendLoading = false
            });
          });
        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration: 1000
          });
          this.sendLoading = false
          return false;
        }
      });
    },
    handleChangeDep(val){
      let departmentName = '';
      for (let i = 0; i < this.allDepartmentList.length; i++) {
        if (this.allDepartmentList[i].id === val) {
          departmentName = this.allDepartmentList[i].depname;
          break;
        }
      }
      this.value.department = departmentName;
    },
    handleCancle(){
      this.$router.back();
    },
    payMoneyChange(event){
      console.log('金额修改', this.formData.thsTimeWant)
      this.formData.uppercase  = changeToChinese(this.formData.thsTimeWant)
    },
    getAllDepartmentList() {
      fetchAllDepartmentList().then(response => {
        const { data } = response
        this.allDepartmentList = departmentFilter(data, this.departments)
      });
    },
    getExamineUserList(){
      /*let params = new URLSearchParams();
      params.append("roles", this.roles);
      params.append("departments", this.departments);*/
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
  }
}

</script>
<style scoped>
</style>
