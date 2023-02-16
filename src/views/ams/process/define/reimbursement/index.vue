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
  </el-card>
</template>
<script>
import { validatenull } from "@/utils/validate";
import ReimBaseInfo from './components/ReimBaseInfo';
// import ReimDetails from './ReimDetails';

const defalutReimParam = {
  //流程表数据
  name: '',
  examineUserId: null,
  applyTypeId: '1',
  priority: '1',
  applyTypeName: '报销单',
  stepsConcent: '',
  remark: '',
  //保修审核数据
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
    ReimBaseInfo,
    // ReimDetails
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
