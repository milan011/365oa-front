<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="formData" :rules="rules" ref="advancepayForm" label-width="120px">
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
      <el-form-item label="开票单位：" prop="invoiceCompnay">
        <el-input v-model="formData.invoiceCompnay"></el-input>
      </el-form-item>
      <el-form-item label="金额：" prop="payMoney">
        <el-input-number
          v-model="formData.payMoney"
          controls-position="right"
          :precision="2"
          :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="预付款金额：" prop="advancepayMoney">
        <el-input-number
          v-model="formData.advancepayMoney"
          controls-position="right"
          @change="advancepayChange"
          :precision="2"
          :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="大写金额：">
        <el-input readonly v-model="formData.uppercase" style="width: 250px"></el-input>
      </el-form-item>
      <el-form-item label="报账类型：" prop="typeId">
        <el-select
          v-model="formData.typeId"
          placeholder="请选择报账类型">
          <el-option
            v-for="item in reimburseTypeMap"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用途：" prop="usefull">
        <el-input v-model="formData.usefull"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handleCancle">取消</el-button>
        <el-button :loading="sendLoading" type="primary" size="medium" @click="finishCommit('advancepayForm')">
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import {formatDate} from "@/utils/date";
import {prioritysMap, reimburseTypeMap} from "@/common/dic"
import {changeToChinese} from "@/utils/common";
import {createAdvance} from "@/api/ams/process/process"
import {fetchAllDepartmentList} from "@/api/department";
import {fetchExamineUserList} from "@/api/login"
import { departmentFilter } from "@/common/commonFun"
import {mapGetters} from "vuex";
const defaultFormData = {
  name: '',
  examineUserId: null,
  departmentId: null,
  department: null,
  applyTypeId: '3',
  applyTypeName: '预付款项报账单',
  priority: '1',
  stepsConcent: '',
  remark: '',
  collectionCompnay: '',
  invoiceCompnay: '',
  payMoney: 1,
  advancepayMoney: 1,
  payType: null,
  uppercase: '壹元整',
  usefull: '',
  typeId: null,
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
          {required: true, message: '请输入收款单位', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'},
        ],
        invoiceCompnay: [
          {required: true, message: '请输入开票单位', trigger: 'blur'},
        ],
        usefull: [
          {required: true, message: '请输入用途', trigger: 'blur'},
        ],
        payMoney: [
          {required: true, message: '请填写金额', trigger: 'blur'},
        ],
        advancepayMoney: [
          {required: true, message: '请填写预付款金额', trigger: 'blur'},
        ],
        typeId: [
          {required: true, message: '请选择报账类型', trigger: 'blur'},
        ],
      },
      reimburseTypeMap,
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
            console.log('提交预付付款审批单', this.formData)
            this.sendLoading = true
            createAdvance(this.formData).then(response=>{
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
    advancepayChange(event){
      console.log('金额修改', this.formData.advancepayMoney)
      this.formData.uppercase  = changeToChinese(this.formData.advancepayMoney)
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
