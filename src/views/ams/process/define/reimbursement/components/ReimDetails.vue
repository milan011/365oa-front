<template>
  <div class="app-container remi-details">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>明细列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="detailsTable"
                v-loading="listLoading"
                :data="list"
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
          <template slot-scope="scope">{{scope.row.reimMoney}}</template>
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
               label-width="150px" size="small">
        <el-form-item label="费用日期：">
          <el-date-picker
            v-model="reimDetails.happenTime"
            type="date"
            :picker-options="pickerOptions1"
            placeholder="选择费用日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="费用科目：">
          <!--<el-input v-model="reimDetails.reimCourse" style="width: 250px"></el-input>-->
          <el-cascader
            v-model="reimCourseValue"
            :options="reimCourseOptions">
          </el-cascader>
        </el-form-item>
        <el-form-item label="费用说明：">
          <el-input v-model="reimDetails.reimExplain" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="报销金额：">
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
          <multi-upload v-model="selectReimPics"></multi-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleDialogConfirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { validatenull } from "@/utils/validate";
import { reimCourseOptions } from "@/common/dic"
import { changeToChinese } from "@/utils/common"
import MultiUpload from '@/components/Upload/multiUpload'
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
      list: [],
      isEdit: false,
      reimDetails: Object.assign({},defaultReimDetails),
      listLoading: false,
      dialogVisible: false,
      reimCourseValue: [],
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
  },
  methods: {
    handleAdd() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.reimDetails = Object.assign({}, defaultReimDetails);
    },
    handleDelete(index, row) {
      this.$confirm('是否要删除该明细?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        /*let ids = [];
        ids.push(row.id);
        let params=new URLSearchParams();
        params.append("ids",ids);
        deleteDepartment(params).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList();
        });*/
      });
    },
    handleDialogConfirm(){
      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('添加明细')
        /*if (this.isEdit) {
          updateDepartment(this.department.id,this.department).then(response => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            this.dialogVisible =false;
            this.getList();
          })
        } else {
          createDepartment(this.department).then(response => {
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            this.dialogVisible =false;
            this.getList();
          })
        }*/
      })
    },
    handleUpdate(index, row) {
      /*this.dialogVisible = true;
      this.isEdit = true;
      this.reimDetails = Object.assign({},row);*/
    },
    handlePrev(){
      this.$emit('prevStep')
    },
    handleFinishCommit(){
      this.$emit('finishCommit');
    },
    reimMoneyChange(event){
      console.log('金额修改', this.reimDetails.reimMoney)
      this.reimDetails.uppercase  = changeToChinese(this.reimDetails.reimMoney)
    }
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
