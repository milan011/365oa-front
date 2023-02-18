<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="formData" :rules="rules" ref="exampleForm" label-width="120px">
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handleCancle">取消</el-button>
        <el-button :loading="sendLoading" type="primary" size="medium" @click="finishCommit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import {formatDate} from "@/utils/date";
const defaultFormData = {
  albumPics: '',//多图片
  pic: '', //单图片
  name: '',
  typeId: null,
  typeName: '',
  cascaderId: null,
  cascaderName: '',
  description: '',
  number: 0,
  multiple: [],
  openOrClose: false,
  selectOne: 1,
  chooseDate: '',
  detailHtml: '',
}
export default {
  name: 'PayApply',
  data() {
    return {
    }
  },
  created() {
  },
  filters: {

  },
  methods: {
    finishCommit(){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否提交数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.sendLoading = true
            /*if (this.isEdit) {
              updateMenu(this.$route.query.id, this.menu).then(response => {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 1000
                });
                this.$router.back();
              });
            } else {
              createMenu(this.menu).then(response => {
                this.$refs[formName].resetFields();
                this.resetForm(formName);
                this.$message({
                  message: '提交成功',
                  type: 'success',
                  duration: 1000
                });
                this.$router.back();
              });
            }*/
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
    }
  }
}

</script>
<style scoped>
</style>
