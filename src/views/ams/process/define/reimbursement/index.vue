<template>
  <el-card class="form-container" shadow="never">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="填写基本信息"></el-step>
      <el-step title="填写报销明细"></el-step>
    </el-steps>
    <reim-base-info
      v-show="showStatus[0]"
      v-model="reimParam"
      @nextStep="nextStep">
    </reim-base-info>
    <reim-details
      v-show="showStatus[1]"
      v-model="reimParam"
      @nextStep="nextStep"
      @prevStep="prevStep"
      @finishCommit="finishCommit">
    </reim-details>
  </el-card>
</template>
<script>
import { validatenull } from "@/utils/validate";
import ReimBaseInfo from './components/ReimBaseInfo';
import ReimDetails from './components/ReimDetails';

import { createReimbursement } from "@/api/ams/process/process"

const defalutReimParam = {
  //流程表数据
  name: '',
  examineUserId: null,
  departmentId: null,
  applyTypeId: '1',
  priority: '1',
  applyTypeName: '报销单',
  stepsConcent: '',
  remark: '',
  //报销审核数据
  department: '',
  reimReason: '',
  reimMoney: 0,
  uppercase: '',
  payPeople: '',
  bankAccount: '',
  bankName: '',
  billNum: 0,
  //报销明细列表
  remiDetailsList: [],
}
export default {
  name: 'Reimbursement',
  components: { //子组件
    ReimDetails,
    ReimBaseInfo,
  },
  data() {
    return {
      active: 0,
      reimParam:  Object.assign({}, defalutReimParam),
      showStatus: [true, false]
    }
  },
  created() {
  },
  filters: {

  },
  methods: {
    hideAll() {
      for (let i = 0; i < this.showStatus.length; i++) {
        this.showStatus[i] = false;
      }
    },
    prevStep() {
      if (this.active > 0 && this.active < this.showStatus.length) {
        this.active--;
        this.hideAll();
        this.showStatus[this.active] = true;
      }
    },
    nextStep() {
      if (this.active < this.showStatus.length - 1) {
        this.active++;
        this.hideAll();
        this.showStatus[this.active] = true;
      }
    },
    finishCommit() {
      this.$confirm('是否要提交审核', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('提交审核', this.reimParam)
        createReimbursement(this.reimParam).then(response=>{
          this.$message({
            type: 'success',
            message: '提交成功',
            duration:1000
          });
          location.reload();
        });
      })
    }
  }
}

</script>
<style scoped>
.form-container {
  width: 960px;
}
.form-inner-container {
  width: 800px;
}
</style>
