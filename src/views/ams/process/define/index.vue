<template>
  <div class="app-container">
    <div class="type-content">
      <el-row :gutter="20">
        <el-col :span="6">
          <div @click="toReimbursement" class="total-frame">
            <img :src="img_home_order" class="total-icon">
            <div class="total-title">报销审批单</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div @click="toPayApply" class="total-frame">
            <img :src="img_home_order" class="total-icon">
            <div class="total-title">付款审批单</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div @click="toAdvancepay" class="total-frame">
            <img :src="img_home_order" class="total-icon">
            <div class="total-title">预付款审批单</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div @click="toContract" class="total-frame">
            <img :src="img_home_order" class="total-icon">
            <div class="total-title">合同审批单</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="type-content">
      <el-row :gutter="20">
        <el-col :span="6">
          <div @click="toBuyplan" class="total-frame">
            <img :src="img_home_order" class="total-icon">
            <div class="total-title">物资采购审批单</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div @click="toProject" class="total-frame">
            <img :src="img_home_order" class="total-icon">
            <div class="total-title">工程项目付款审批单</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import {formatDate} from "@/utils/date";
import {createDepartment, deleteDepartment, fetchList, updateDepartment, updateStatus} from "@/api/department";
import img_home_order from '@/assets/images/home_order.png';

export default {
  name: 'departmentList',
  data() {
    return {
      img_home_order,
    }
  },
  created() {
  },
  filters: {

  },
  methods: {
    toReimbursement(){
      console.log('去报销审批单')
      this.$router.push({path:'/ams/processReimbursement'});
    },
    toPayApply(){
      console.log('去付款审批单')
      this.$router.push({path:'/ams/processPayApply'});
    },
    toAdvancepay(){
      console.log('去预付款审批单')
      this.$router.push({path:'/ams/processAdvancepay'});
    },
    toContract(){
      console.log('去合同审批单')
      this.$router.push({path:'/ams/processContract'});
    },
    toBuyplan(){
      console.log('去物资采购审批单')
      this.$router.push({path:'/ams/processBuyplan'});
    },
    toProject(){
      console.log('去工程项目审批单')
      this.$router.push({path:'/ams/processProject'});
    },
  }
}

</script>
<style scoped>
.app-container {
  margin-top: 40px;
  margin-left: 120px;
  margin-right: 120px;
}
.total-frame {
  border: 1px solid #DCDFE6;
  padding: 20px;
  height: 100px;
  cursor: pointer;
}
.total-icon {
  color: #409EFF;
  width: 60px;
  height: 60px;
}
.total-title {
  position: relative;
  font-size: 16px;
  color: #909399;
  left: 70px;
  top: -45px;
}
.type-content{
  margin: 10px 0;
}
</style>
