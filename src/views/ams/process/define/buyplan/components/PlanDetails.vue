<template>
  <div class="app-container plan-details">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>采购列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button>
    </el-card>
    <el-tag style="margin-top: 10px;">费用总金额: {{ playMoneyTotal }} {{ uppercaseTotal }}</el-tag>
    <div class="table-container">
      <el-table ref="detailsTable"
                v-loading="listLoading"
                :data="buyList"
                border style="width: 100%;">
        <el-table-column align="center" label="物资名称">
          <template slot-scope="scope">{{scope.row.goodsName}}</template>
        </el-table-column>
        <el-table-column align="center" label="使用部门/人">
          <template slot-scope="scope">{{scope.row.depPerson}}</template>
        </el-table-column>
        <el-table-column align="center" label="商品单位" width="160">
          <template slot-scope="scope">{{scope.row.goodsUnit}}</template>
        </el-table-column>
        <el-table-column align="center" label="商品数量">
          <template slot-scope="scope">{{scope.row.goodsNums}}</template>
        </el-table-column>
        <el-table-column align="center" label="预计单价">
          <template slot-scope="scope">{{scope.row.onesMoney}}</template>
        </el-table-column>
        <el-table-column align="center" label="计划金额">
          <template slot-scope="scope">{{scope.row.goodsMoney}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="140">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="submit-button">
      <el-button size="medium" @click="handlePrev">上一步，填写基本信息</el-button>
      <el-button type="primary" size="medium" @click="handleFinishCommit">完成，提交审核</el-button>
    </div>
    <el-dialog
      :title="isEdit?'编辑细则':'添加细则'"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="40%">
      <el-form ref="planDetailsForm"
               :model="planDetails"
               :rules="rules"
               label-width="150px" size="small">
        <el-form-item label="物资名称：" prop="goodsName">
          <el-input v-model="planDetails.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="使用部门/人：" prop="depPerson">
          <el-input v-model="planDetails.depPerson"></el-input>
        </el-form-item>
        <el-form-item label="商品单位：" prop="goodsUnit">
          <el-select
            v-model="planDetails.goodsUnit"
            placeholder="请选商品单位">
            <el-option
              v-for="item in goodsUnitMap"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品数量：" prop="goodsNums">
          <el-input-number
            v-model="planDetails.goodsNums"
            @change="numsOrMoneyChange"
            controls-position="right"
            :step="1"
            :precision="0"
            step-strictly
            :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="预计单价：" prop="onesMoney">
          <el-input-number
            v-model="planDetails.onesMoney"
            @change="numsOrMoneyChange"
            controls-position="right"
            :precision="2"
            :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="计划金额：">
          <el-input readonly v-model="planDetails.goodsMoney" style="width: 250px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleDialogConfirm('planDetailsForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { validatenull } from "@/utils/validate";
import { goodsUnitMap } from "@/common/dic"
import { changeToChinese } from "@/utils/common"
import MultiUpload  from '@/components/Upload/multiUpload'
import { mapGetters } from 'vuex'
let _this = null; //_this固定指向vue对象,避免多层this
const defaultReimDetails = {
  proId: null,
  department: '',
  goodsName: '',
  depPerson: '',
  goodsUnit: '',
  goodsNums: undefined,
  onesMoney: undefined,
  goodsMoney: undefined,
}
export default {
  name: 'PlayDetails', //vue组件名称
  props: {
    value: Object,
  },
  components: { //子组件
    MultiUpload
  },
  computed: {
    ...mapGetters([
      'routers'
    ]),
    routes() {
      // return this.$router.options.routes
      return this.routers
    },
  },
  created() {
    _this = this //_this固定指向vue对象,避免多层this
    //created生命周期,在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
  },
  data() {
    return {
      buyList: [],
      isEdit: false,
      planDetails: Object.assign({},defaultReimDetails),
      listLoading: false,
      dialogVisible: false,
      playMoneyTotal: 0,
      uppercaseTotal: '',
      rules: {
        goodsName: [
          {required: true, message: '请输入物资名称', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        ],
        depPerson: [
          {required: true, message: '请输入使用部门/人', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        ],
        goodsUnit: [
          {required: true, message: '请选择商品单位', trigger: 'blur'},
        ],
        goodsNums: [
          {required: true, message: '请输入商品数量', trigger: 'blur'},
        ],
        onesMoney: [
          {required: true, message: '请输入预计单价', trigger: 'blur'},
        ],
      },
      goodsUnitMap,
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
    handleAdd() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.planDetails = Object.assign({}, defaultReimDetails);
    },
    handleDelete(index, row) {
      this.$confirm('是否要删除该物资?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.buyList.splice(index, 1)
      });
    },
    totalManeyDel(){
      this.playMoneyTotal = 0
      this.uppercaseTotal = ''
      if(this.buyList.length > 0){
        for (let item of this.buyList){
          this.playMoneyTotal += item.goodsMoney
        }
        this.uppercaseTotal = changeToChinese(this.playMoneyTotal)
      }
    },
    handleDialogConfirm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(_this.isEdit){
            console.log('我编辑物资', _this.planDetails)
            let needModify = _this.currentHandleIndex
            this.$set(_this.buyList, needModify, _this.planDetails)
            this.totalManeyDel()
          }else{
            console.log('我添加物资', _this.planDetails)
            _this.buyList.push(_this.planDetails)
            this.totalManeyDel()
          }
          _this.dialogVisible = false
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
    handleUpdate(index, row) {
      /*console.log('我编辑', index)
      return false*/
      this.dialogVisible = true;
      this.isEdit = true;
      this.planDetails = Object.assign({},row);
      this.currentHandleIndex = index
    },
    handlePrev(){
      this.$emit('prevStep')
    },
    handleFinishCommit(){
      if(this.buyList.length == 0){
        this.$message({
          message: '请至少添加一条数据',
          type: 'warning',
          duration:1000
        });
        return false
      }
      this.value.planDetailsList = this.buyList
      this.$emit('finishCommit');
    },
    numsOrMoneyChange(event){
      console.log('金额修改', this.planDetails.goodsNums, this.planDetails.onesMoney)
      let money = this.planDetails.onesMoney
      let nums = this.planDetails.goodsNums
      if(!validatenull(money) && !validatenull(nums)){
        this.$nextTick(()=>{
          this.planDetails.goodsNums   = Math.trunc(nums)
          this.planDetails.goodsMoney  = money * Math.trunc(nums)
        })
      }else{
        this.planDetails.goodsMoney = ''
      }
    },
  }
}
</script>
<style scoped>
.submit-button{
  margin-top: 15px;
  text-align: center;
}
</style>
<style lang="scss" scoped>
.plan-details{
}
</style>
