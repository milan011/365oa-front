<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="formData" :rules="rules" ref="contractForm" label-width="120px">
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
      <el-form-item label="发起依据：" prop="launchBasis">
        <el-input v-model="formData.launchBasis"></el-input>
      </el-form-item>
      <el-form-item label="合同编号：" prop="contractCode">
        <el-input v-model="formData.contractCode"></el-input>
      </el-form-item>
      <el-form-item label="合同名称：" prop="contractName">
        <el-input v-model="formData.contractName"></el-input>
      </el-form-item>
      <el-form-item label="甲方名称：" prop="firstPart">
        <el-input v-model="formData.firstPart"></el-input>
      </el-form-item>
      <el-form-item label="乙方名称：" prop="secondPart">
        <el-input v-model="formData.secondPart"></el-input>
      </el-form-item>
      <el-form-item label="合同金额：" prop="contractMoney">
        <el-input-number
          v-model="formData.contractMoney"
          controls-position="right"
          :precision="2"
          :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="基本内容：" prop="contractContent">
        <el-input
          :autoSize="true"
          v-model="formData.contractContent"
          type="textarea"
          placeholder="请输入基本内容"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handleCancle">取消</el-button>
        <el-button :loading="sendLoading" type="primary" size="medium" @click="finishCommit('contractForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import {formatDate} from "@/utils/date";
import {changeToChinese} from "@/utils/common";
import {fetchAllDepartmentList} from "@/api/department";
import {fetchExamineUserList} from "@/api/login"
import { departmentFilter } from "@/common/commonFun"
import {prioritysMap} from "@/common/dic";
import {createContract} from "@/api/ams/process/process"
import {mapGetters} from "vuex";
const defaultFormData = {
  name: '',
  examineUserId: null,
  departmentId: null,
  department: null,
  applyTypeId: '5',
  applyTypeName: '合同会签',
  stepsConcent: '',
  remark: '',
  priority: '1',
  launchBasis: '',
  contractCode: '',
  contractName: '',
  firstPart: '',
  secondPart: '',
  contractMoney: undefined,
  contractContent: ''
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
        launchBasis: [
          {required: true, message: '请输入发起依据', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'},
        ],
        contractCode: [
          {required: true, message: '请输入合同编号', trigger: 'blur'},
        ],
        contractName: [
          {required: true, message: '请输入合同名称', trigger: 'blur'},
        ],
        firstPart: [
          {required: true, message: '请输入甲方名称', trigger: 'blur'},
        ],
        secondPart: [
          {required: true, message: '请输入乙方名称', trigger: 'blur'},
        ],
        contractMoney: [
          {required: true, message: '请填写合同金额', trigger: 'blur'},
        ],
        contractContent: [
          {required: true, message: '请填写合同基本内容', trigger: 'blur'},
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
            createContract(this.formData).then(response=>{
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
