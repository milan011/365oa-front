<template>
	<!-- <el-form :model="formData" :rules="rules" ref="exampleForm" label-width="120px">
	</el-form> -->
	<el-form :model="formData" :rules="rules" ref="exampleForm" label-width="120px">
		<!-- input框 -->
		<el-form-item label="名称：" prop="name">
       <el-input v-model="formData.name"></el-input>
    </el-form-item>
    <!-- select框 -->
    <el-form-item label="分类：" prop="typeId">
      <el-select
        v-model="formData.typeId"
        @change="handleChange"
        placeholder="请选择分类">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <!-- 级联选择器 -->
    <el-form-item label="级联分类：" prop="cascaderId">
      <el-cascader
        v-model="selectCascaderValue"
        :options="cascaderOptions">
      </el-cascader>
    </el-form-item>
    <!-- textarea-->
    <el-form-item label="介绍：" prop="description">
       <el-input
         :autoSize="true"
         v-model="formData.description"
         type="textarea"
         placeholder="请输入内容"></el-input>
    </el-form-item>
    <!-- 数字输入框 -->
    <el-form-item label="金额：" prop="number">
      <el-input-number
        v-model="formData.number"
        controls-position="right"
        :precision="2"
        :min="1"></el-input-number>
    </el-form-item>
    <!-- 多选框 -->
    <el-form-item label="活动性质" prop="multiple">
  	  <el-checkbox-group v-model="formData.multiple">
  	    <el-checkbox  
  	    	v-for="item in options" 
  	    	:key="item.value"
  	    	:label="item.label" 
  	    	:name="item.value"></el-checkbox>
  	  </el-checkbox-group>
  	</el-form-item>
  	<!-- switch开关 -->
  	<el-form-item label="开关">
    	<el-switch v-model="formData.openOrClose"></el-switch>
  	</el-form-item>
  	<!-- 单选框 -->
  	<el-form-item label="单选框" prop="selectOne">
		   <el-radio-group v-model="formData.selectOne">
		     <el-radio :label="1">是</el-radio>
		     <el-radio :label="2">否</el-radio>
		   </el-radio-group>
		</el-form-item>
		<!-- 日期 -->
		<el-form-item label="选择日期：" prop="chooseDate">
      <el-date-picker
        v-model="formData.chooseDate"
        type="date"
        :picker-options="pickerOptions"
        value-format="yyyy:MM:dd"
        placeholder="选择费用日期">
      </el-date-picker>
    </el-form-item>
    <!-- 单文件/图片上传 -->
    <el-form-item label="单张图片：">
      <single-upload 
      	v-model="formData.pic"
        style="width: 300px;display: inline-block;margin-left: 10px">
      </single-upload>
    </el-form-item>
    <!-- 多文件/图片上传 -->
    <el-form-item label="多张图片：">
        <multi-upload v-model="selectManyPics"></multi-upload>
    </el-form-item>
    <!-- 富文本 -->
    <el-form-item label="富文本：">
     	<tinymce :width="595" :height="300" v-model="formData.detailHtml"></tinymce>
    </el-form-item>
    <el-form-item style="text-align: center">
      <el-button size="medium" @click="handleCancle">取消</el-button>
      <el-button :loading="sendLoading" type="primary" size="medium" @click="finishCommit">提交</el-button>
    </el-form-item>
	</el-form>
</template>
<script>
	import { isPhone } from "@/utils/validate";
	import SingleUpload from '@/components/Upload/singleUpload'
  import MultiUpload from '@/components/Upload/multiUpload'
  import Tinymce from '@/components/Tinymce'

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
	//自定义校验规则
	/*const validatorDefinition = (rule, value, callback)=>{
	  if (isPhone(value)) {
	    callback();
	  } else {
	    callback(new Error("电话格式不正确"));
	  }
	}*/
	export default {
		components: {SingleUpload, MultiUpload, Tinymce},
		computed: {
			selectManyPics:{
        /*get:function () {
          let pics=[];
          if(this.formData.pic===undefined||this.formData.pic==null||this.formData.pic===''){
            return pics;
          }
          pics.push(this.formData.pic);
          if(this.formData.albumPics===undefined||this.formData.albumPics==null||this.formData.albumPics===''){
            return pics;
          }
          let albumPics = this.formData.albumPics.split(',');
          for(let i=0;i<albumPics.length;i++){
            pics.push(albumPics[i]);
          }
          return pics;
        },
        set:function (newValue) {
          if (newValue == null || newValue.length === 0) {
            this.formData.pic = null;
            this.formData.albumPics = null;
          } else {
            this.formData.pic = newValue[0];
            this.formData.albumPics = '';
            if (newValue.length > 1) {
              for (let i = 1; i < newValue.length; i++) {
                this.formData.albumPics += newValue[i];
                if (i !== newValue.length - 1) {
                  this.formData.albumPics += ',';
                }
              }
            }
          }
        }
      }*/
		},
		data() {
    	return {
    		sendLoading: false,
    		formData: Object.assign({}, defaultFormData),
    		options: [],
    		selectCascaderValue: [],
				cascaderOptions: [],
				isEdit: false,
    		rules: {
    			name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'},
            // { validator: validatorDefinition, trigger: 'blur' }
          ],
          typeId: [
          	{required: true, message: '请选择分类', trigger: 'blur'}
          ],
          cascaderId:[
          	{required: true, message: '请选择级联分类', trigger: 'blur'}
          ],
          description: [{required: true, message: '请输入介绍', trigger: 'blur'}],
          number: [{required: true, message: '请输入数字', trigger: 'blur'}],
          chooseDate: [{required: true, message: '请选择日期', trigger: 'blur'}],
          multiple: [
            { type: 'array', required: true, message: '请至少选择一个', trigger: 'change' }
          ],
    		},
    		pickerOptions: {
        	disabledDate(time) {
          	return time.getTime() < Date.now();
        	}
      	}
    	}
  	},
  	watch:{ //响应数据的变化
  		/*级联选择处理*/
  		selectCascaderValue: function (newValue) {
        if (newValue != null && newValue.length === 2) {
          this.formData.cascaderId = newValue[1];
          this.formData.cascaderName= this.getCascaderNameById(this.formData.cascaderId);
        } else {
          this.formData.cascaderId = null;
          this.formData.cascaderName=null;
        }
      }
  	},
  	methods: {
  		handleChange(val){
  			let typeName = '';
        for (let i = 0; i < this.options.length; i++) {
          if (this.options[i].value === val) {
            typeName = this.options[i].label;
            break;
          }
        }
        this.formData.typeName = typeName;
  		},
  		getCascaderNameById(){
  			let name=null;
        for(let i=0;i<this.cascaderOptions.length;i++){
          for(let j=0;j<this.cascaderOptions[i].children.length;j++){
            if(this.cascaderOptions[i].children[j].value===id){
              name=this.cascaderOptions[i].children[j].label;
              return name;
            }
          }
        }
        return name;
  		},
  		handleCancle(){
      	this.$router.back();
    	}
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
  		}
  	}
	}
</script>