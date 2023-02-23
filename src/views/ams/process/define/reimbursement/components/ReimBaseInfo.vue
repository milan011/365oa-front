<template>
  <div class="app-container reim-base-ifno">
    <el-form :model="value" :rules="rules" ref="reimInfoForm" label-width="120px" class="form-inner-container" size="small">
      <el-form-item label="标题：" prop="name">
        <el-input v-model="value.name"></el-input>
      </el-form-item>
      <el-form-item label="优先级：" prop="priority">
        <el-select
          v-model="value.priority"
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
          v-model="value.departmentId"
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
          v-model="value.examineUserId"
          placeholder="请选择审核人">
          <el-option
            v-for="item in examineUserList"
            :key="item.id"
            :label="item.nickName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收款方户名：" prop="payPeople">
        <el-input v-model="value.payPeople"></el-input>
      </el-form-item>
      <el-form-item label="开户行：" prop="bankName">
        <el-input v-model="value.bankName"></el-input>
      </el-form-item>
      <el-form-item label="银行账号：" prop="bankAccount">
        <el-input v-model="value.bankAccount"></el-input>
      </el-form-item>
      <el-form-item label="报销事由：" prop="reimReason">
        <el-input
          maxlength="100"
          v-model="value.reimReason"
          type="textarea"
          :autoSize="true"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleNext('reimInfoForm')">下一步，填写报销明细</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { validatenull } from "@/utils/validate";
import { prioritysMap } from "@/common/dic"
import {fetchAllDepartmentList} from "@/api/department";
import {fetchExamineUserList} from "@/api/login"
import { departmentFilter } from "@/common/commonFun"
import { mapGetters } from 'vuex'
let _this = null; //_this固定指向vue对象,避免多层this

export default {
  name: 'ReimBaseInfo', //vue组件名称
  components: { //子组件
  },
  props: {
    value: Object,
  },
  computed: {
    ...mapGetters([
      'routers', 'departments', "roleIds"
    ]),
    routes() {
      // return this.$router.options.routes
      return this.routers
    },
  },
  created() {
    _this = this //_this固定指向vue对象,避免多层this
    //created生命周期,在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
    this.getAllDepartmentList()
    this.getExamineUserList()
    console.log('当前表单数据', _this.value)
  },
  data() {
    return {
      allDepartmentList: [],
      examineUserList: [],
      rules: {
        name: [
          {required: true, message: '请输入审批标题', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        ],
        departmentId: [
          {required: true, message: '请选择所属部门', trigger: 'blur'},
        ],
        examineUserId: [
          {required: true, message: '请选择审核人', trigger: 'blur'}
        ],
        payPeople: [
          {required: true, message: '请输入收款方户名', trigger: 'blur'}
        ],
        bankName: [
          {required: true, message: '请输入开户行', trigger: 'blur'}
        ],
        bankAccount: [
          {required: true, message: '请输入银行账号', trigger: 'blur'}
        ],
        reimReason: [
          {required: true, message: '请输入报销事由', trigger: 'blur'}
        ]
      },
      prioritysMap,
    }
  },
  mounted(){
    //mounted生命周期:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作
  },
  activated () {
    //<keep-alive>包裹的动态组件会被缓存,当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。
  },
  watch:{ //响应数据的变化
  },
  methods: {
    handleNext(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('nextStep');
        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration:1000
          });
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
<style lang="scss" scoped>
.reim-base-ifno{
}
</style>
