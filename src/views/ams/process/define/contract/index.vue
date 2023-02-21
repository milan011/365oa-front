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
      <el-form-item label="审核人：" prop="examineUserId">
        <el-select
          v-model="formData.examineUserId"
          placeholder="请选择审核人">
          <el-option
            v-for="item in prioritysMap"
            :key="item.value"
            :label="item.label"
            :value="item.value">
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
import {prioritysMap} from "@/common/dic";
import {createContract} from "@/api/ams/process/process"
const defaultFormData = {
  name: '',
  examineUserId: null,
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
  data() {
    return {
      sendLoading: false,
      formData: Object.assign({}, defaultFormData),
      rules: {
        name: [
          {required: true, message: '请输入审批标题', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        ],
        examineUserId: [
          {required: true, message: '请选择审核人', trigger: 'blur'}
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
    handleCancle(){
      this.$router.back();
    },
  }
}

</script>
<style scoped>
</style>
