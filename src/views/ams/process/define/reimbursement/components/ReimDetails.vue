<template>
  <div class="app-container remi-details">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>明细列表</span>
      <el-tag>单个审批单明细不超过{{ detailsLimit}}条</el-tag>
      <el-button v-show="billList.length < detailsLimit" size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button>
    </el-card>
    <el-tag style="margin-top: 10px;">费用总金额: {{ reimMoneyTotal }} {{ uppercaseTotal }}</el-tag>
    <div class="table-container">
      <el-table ref="detailsTable"
                v-loading="listLoading"
                :data="billList"
                border style="width: 100%;">
        <el-table-column align="center" label="费用日期">
          <template slot-scope="scope">{{scope.row.happenTime}}</template>
        </el-table-column>
        <el-table-column align="center" label="费用科目">
          <template slot-scope="scope">{{scope.row.reimCourse}}</template>
        </el-table-column>
        <el-table-column align="center" label="费用说明" width="160">
          <template slot-scope="scope">{{scope.row.reimExplain}}</template>
        </el-table-column>
        <el-table-column align="center" label="报销金额">
          <template slot-scope="scope">{{scope.row.reimMoney}}</template>
        </el-table-column>
        <el-table-column align="center" label="大写金额">
          <template slot-scope="scope">{{scope.row.uppercase}}</template>
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
        <el-form-item label="费用日期：" prop="happenTime">
          <el-date-picker
            v-model="reimDetails.happenTime"
            type="date"
            :picker-options="pickerOptions1"
            value-format="yyyy-MM-dd"
            placeholder="选择费用日期">
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
          <!--<el-input v-model="reimDetails.billList" style="width: 250px"></el-input>-->
          <multi-upload v-model="selectReimPics" :maxCount="3"></multi-upload>
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
  happenTime: null,
  reimCourse: '',
  reimExplain: '',
  billList: '',
  reimMoney: 1,
  uppercase: '壹元整',
}
export default {
  name: 'RemiDetails', //vue组件名称
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
    selectReimPics:{
        get:function () {
          console.log('getImg', this.reimDetails.billList)
          let pics=[];
          /*if(this.value.pic===undefined||this.value.pic==null||this.value.pic===''){
            return pics;
          }
          pics.push(this.value.pic);
          if(this.value.albumPics===undefined||this.value.albumPics==null||this.value.albumPics===''){
            return pics;
          }
          let albumPics = this.value.albumPics.split(',');
          for(let i=0;i<albumPics.length;i++){
            pics.push(albumPics[i]);
          }*/

          if(this.reimDetails.billList===undefined||this.reimDetails.billList==null||this.reimDetails.billList===''){
            return pics;
          }
          let albumPics = this.reimDetails.billList.split(',');
          for(let i=0;i<albumPics.length;i++){
            pics.push(albumPics[i]);
          }
          return pics;
        },
        set:function (newValue) {
          console.log('setImg', newValue)
          console.log('setImg', newValue.length)
          if (newValue.length === 0) {
            /*this.value.pic = null;
            this.value.albumPics = null;*/
            this.reimDetails.billList = ''
          } else {
            /*this.value.pic = newValue[0];
            this.value.albumPics = '';
            if (newValue.length > 1) {
              for (let i = 1; i < newValue.length; i++) {
                this.value.albumPics += newValue[i];
                if (i !== newValue.length - 1) {
                  this.value.albumPics += ',';
                }
              }
            }*/
            this.reimDetails.billList = ''
            if (newValue.length > 0) {
              for (let i = 0; i < newValue.length; i++) {
                this.reimDetails.billList += newValue[i];
                if (i !== newValue.length - 1) {
                  this.reimDetails.billList += ',';
                }
              }
            }
            console.log('setbillList', this.reimDetails.billList)
          }
        }
      }
  },
  created() {
    _this = this //_this固定指向vue对象,避免多层this
    //created生命周期,在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
  },
  data() {
    return {
      billList: [],
      detailsLimit: 5,
      isEdit: false,
      reimDetails: Object.assign({},defaultReimDetails),
      listLoading: false,
      dialogVisible: false,
      reimCourseValue: [],
      reimMoneyTotal: 0,
      uppercaseTotal: '',
      rules: {
        happenTime: [
          {required: true, message: '请选择费用日期', trigger: 'blur'},
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
      // selectReimPics: [],
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
        _this.billList.splice(index, 1)
        _this.totalManeyDel()
      });
    },
    handleDialogConfirm(formName){
      console.log('上传图片', this.selectReimPics)
      console.log('明细', this.reimDetails)
      // return false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(_this.isEdit){
            console.log('我编辑明细', _this.reimDetails)
            let needModify = _this.currentHandleIndex
            this.$set(_this.billList, needModify, _this.reimDetails)
          }else{
            console.log('我添加明细', _this.reimDetails)
            _this.billList.push(_this.reimDetails)
            _this.totalManeyDel()
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
    totalManeyDel(){
      this.reimMoneyTotal = 0
      this.uppercaseTotal = ''
      if(this.billList.length > 0){
        for (let item of this.billList){
          this.reimMoneyTotal += item.reimMoney
        }
        this.uppercaseTotal = changeToChinese(this.reimMoneyTotal)
      }
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
      if(this.billList.length == 0){
        this.$message({
          message: '请至少添加一条明细',
          type: 'warning',
          duration:1000
        });
        return false
      }
      this.value.remiDetailsList = this.billList
      this.value.reimMoney = this.reimMoneyTotal
      this.value.uppercase = this.uppercaseTotal
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
.remi-details{
}
</style>
