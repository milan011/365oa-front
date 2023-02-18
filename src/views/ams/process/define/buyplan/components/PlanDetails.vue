<template>
  <div class="app-container plan-details">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>采购列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button>
    </el-card>
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
      width="40%">
      <el-form ref="reimDetailsForm"
               :model="reimDetails"
               :rules="rules"
               label-width="150px" size="small">
        <el-form-item label="物资名称：" prop="goodsName">
          <el-date-picker
            v-model="reimDetails.goodsName"
            type="date"
            :picker-options="pickerOptions1"
            value-format="yyyy:MM:dd"
            placeholder="选择物资名称">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="费用科目：" prop="reimCourse">
          <!--<el-input v-model="reimDetails.reimCourse" style="width: 250px"></el-input>-->
          <el-cascader
            v-model="reimCourseValue"
            :options="reimCourseOptions">
          </el-cascader>
        </el-form-item>
        <el-form-item label="费用说明：" prop="reimExplain">
          <el-input v-model="reimDetails.reimExplain" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="报销金额：" prop="reimMoney">
          <!--<el-input v-model="reimDetails.reimMoney" style="width: 250px"></el-input>-->
          <el-input-number
            v-model="reimDetails.reimMoney"
            controls-position="right"
            @change="reimMoneyChange"
            :precision="2"
            :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="大写金额：">
          <el-input readonly v-model="reimDetails.uppercase" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="上传票据：">
          <!--<el-input v-model="reimDetails.buyList" style="width: 250px"></el-input>-->
          <multi-upload v-model="selectReimPics"></multi-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleDialogConfirm('reimDetailsForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { validatenull } from "@/utils/validate";
import { reimCourseOptions } from "@/common/dic"
import { changeToChinese } from "@/utils/common"
import MultiUpload  from '@/components/Upload/multiUpload'
import { mapGetters } from 'vuex'
let _this = null; //_this固定指向vue对象,避免多层this
const defaultReimDetails = {
  goodsName: null,
  reimCourse: '',
  reimExplain: '',
  // buyList: '',
  reimMoney: 1,
  uppercase: '壹元整',
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
    selectProductPics:{
        get:function () {
          /*let pics=[];
          if(this.value.pic===undefined||this.value.pic==null||this.value.pic===''){
            return pics;
          }
          pics.push(this.value.pic);
          if(this.value.albumPics===undefined||this.value.albumPics==null||this.value.albumPics===''){
            return pics;
          }
          let albumPics = this.value.albumPics.split(',');
          for(let i=0;i<albumPics.length;i++){
            pics.push(albumPics[i]);
          }
          return pics;*/
        },
        /*set:function (newValue) {
          if (newValue == null || newValue.length === 0) {
            this.value.pic = null;
            this.value.albumPics = null;
          } else {
            this.value.pic = newValue[0];
            this.value.albumPics = '';
            if (newValue.length > 1) {
              for (let i = 1; i < newValue.length; i++) {
                this.value.albumPics += newValue[i];
                if (i !== newValue.length - 1) {
                  this.value.albumPics += ',';
                }
              }
            }
          }
        }*/
      }
  },
  created() {
    _this = this //_this固定指向vue对象,避免多层this
    //created生命周期,在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
  },
  data() {
    return {
      buyList: [],
      isEdit: false,
      reimDetails: Object.assign({},defaultReimDetails),
      listLoading: false,
      dialogVisible: false,
      reimCourseValue: [],
      rules: {
        goodsName: [
          {required: true, message: '请选择物资名称', trigger: 'blur'},
        ],
        reimCourse: [
          {required: true, message: '请选择报销科目', trigger: 'blur'},
        ],
        reimExplain: [
          {required: true, message: '请输入费用说明', trigger: 'blur'},
        ],
        reimMoney: [
          {required: true, message: '请填写费用金额', trigger: 'blur'},
        ],
      },
      reimCourseOptions,
      selectReimPics: [],
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    }
  },
  mounted(){
    //mounted生命周期:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作
  },
  activated () {
    //<keep-alive>包裹的动态组件会被缓存,当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。
  },
  watch:{ //响应数据的变化
    //费用科目处理
    reimCourseValue: function (newValue) {
      if (newValue != null && newValue.length === 2) {
        let currentValue = newValue[1];
        this.reimDetails.reimCourse = this.getCateNameById(currentValue);
        // this.reimDetails.reimCourse = newValue[1];
        // this.reimDetails.reimCourseName= this.getCateNameById(this.reimDetails.reimCourse);
      } else {
        this.reimDetails.reimCourse = null;
        // this.reimDetails.reimCourseName=null;
      }
    }
  },
  methods: {
    handleAdd() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.reimDetails = Object.assign({}, defaultReimDetails);
      this.reimCourseValue = []
    },
    handleDelete(index, row) {
      this.$confirm('是否要删除该明细?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.buyList.splice(index, 1)
      });
    },
    handleDialogConfirm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(_this.isEdit){
            console.log('我编辑明细', _this.reimDetails)
            let needModify = _this.currentHandleIndex
            this.$set(_this.buyList, needModify, _this.reimDetails)
          }else{
            console.log('我添加明细', _this.reimDetails)
            _this.buyList.push(_this.reimDetails)
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
      this.reimDetails = Object.assign({},row);
      this.currentHandleIndex = index
    },
    handlePrev(){
      this.$emit('prevStep')
    },
    handleFinishCommit(){
      this.value.planDetailsList = this.buyList
      this.$emit('finishCommit');
    },
    reimMoneyChange(event){
      console.log('金额修改', this.reimDetails.reimMoney)
      this.reimDetails.uppercase  = changeToChinese(this.reimDetails.reimMoney)
    },
    getCateNameById(id){
      let name=null;
      for(let i=0;i<this.reimCourseOptions.length;i++){
        for(let j=0;j<this.reimCourseOptions[i].children.length;j++){
          if(this.reimCourseOptions[i].children[j].value===id){
            name=this.reimCourseOptions[i].children[j].label;
            return name;
          }
        }
      }
      return name;
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
