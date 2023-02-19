<template>
  <el-card class="form-container" shadow="never">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="填写基本信息"></el-step>
      <el-step title="填写采购明细"></el-step>
    </el-steps>
    <plan-base-info
      v-show="showStatus[0]"
      v-model="planParam"
      @nextStep="nextStep">
    </plan-base-info>
    <plan-details
      v-show="showStatus[1]"
      v-model="planParam"
      @nextStep="nextStep"
      @prevStep="prevStep"
      @finishCommit="finishCommit">
    </plan-details>
  </el-card>
</template>
<script>
import { validatenull } from "@/utils/validate";
import PlanBaseInfo from './components/PlanBaseInfo';
import PlanDetails from './components/PlanDetails';

const defalutPlanParam = {
  //流程表数据
  name: '',
  examineUserId: null,
  applyTypeId: '1',
  priority: '1',
  applyTypeName: '报销单',
  //采购明细列表
  planDetailsList: [],
}
export default {
  name: 'BuyPlan',
  components: { //子组件
    PlanDetails,
    PlanBaseInfo,
  },
  data() {
    return {
      active: 0,
      planParam:  Object.assign({}, defalutPlanParam),
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
        console.log('提交审核', this.planParam)
        /*if(isEdit){
           updateProduct(this.$route.query.id,this.productParam).then(response=>{
             this.$message({
               type: 'success',
               message: '提交成功',
               duration:1000
             });
             this.$router.back();
           });
         }else{
           createProduct(this.productParam).then(response=>{
             this.$message({
               type: 'success',
               message: '提交成功',
               duration:1000
             });
             location.reload();
           });
         }*/
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
