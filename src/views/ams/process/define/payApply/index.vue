<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="formData" :rules="rules" ref="payApplyForm" label-width="120px">
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
      <el-form-item label="收款单位：" prop="collectionCompnay">
        <el-input v-model="formData.collectionCompnay"></el-input>
      </el-form-item>
      <el-form-item label="开户行：" prop="bankName">
        <el-input v-model="formData.bankName"></el-input>
      </el-form-item>
      <el-form-item label="银行账号：" prop="bankAccount">
        <el-input v-model="formData.bankAccount"></el-input>
      </el-form-item>
      <el-form-item label="报销金额：" prop="payMoney">
        <el-input-number
          v-model="formData.payMoney"
          controls-position="right"
          @change="payMoneyChange"
          :precision="2"
          :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="大写金额：">
        <el-input readonly v-model="formData.uppercase" style="width: 250px"></el-input>
      </el-form-item>
      <el-form-item label="付款方式：" prop="payType">
        <el-select
          v-model="formData.payType"
          placeholder="请选择付款方式">
          <el-option
            v-for="item in payTypeMap"
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
        <el-button :loading="sendLoading" type="primary" size="medium" @click="finishCommit('payApplyForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import {formatDate} from "@/utils/date";
import {payTypeMap, prioritysMap} from "@/common/dic"
import {changeToChinese} from "@/utils/common";
import {createPayApply} from "@/api/ams/process/process"
const defaultFormData = {
  name: '',
  examineUserId: null,
  applyTypeId: '2',
  applyTypeName: '付款申请单',
  priority: '1',
  stepsConcent: '',
  remark: '',
  collectionCompnay: '',
  bankName: '',
  bankAccount: '',
  payMoney: 1,
  payType: null,
  uppercase: '壹元整',
  usefull: '',
  typeId: null,
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
        collectionCompnay: [
          {required: true, message: '请输入付款单位', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'},
        ],
        bankName: [
          {required: true, message: '请输入开户行', trigger: 'blur'},
        ],
        bankAccount: [
          {required: true, message: '请输入银行账号', trigger: 'blur'},
        ],
        usefull: [
          {required: true, message: '请输入用途', trigger: 'blur'},
        ],
        payMoney: [
          {required: true, message: '请填写费用金额', trigger: 'blur'},
        ],
        payType: [
          {required: true, message: '请选择付款方式', trigger: 'blur'},
        ],
      },
      payTypeMap,
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
            console.log('提交付款单', this.formData)
            this.sendLoading = true
            createPayApply(this.formData).then(response=>{
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
    payMoneyChange(event){
      console.log('金额修改', this.formData.payMoney)
      this.formData.uppercase  = changeToChinese(this.formData.payMoney)
    },
  }
}

</script>
<style scoped>
</style>
