<template>
  <div class="app-container reim-base-ifno">
    <el-form :model="value" :rules="rules" ref="reimInfoForm" label-width="120px" class="form-inner-container" size="small">
    </el-form>
  </div>
</template>
<script>
import { validatenull } from "@/utils/common";
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
      rules: {},
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
  }
}
</script>
<style scoped>
</style>
<style lang="scss" scoped>
.reim-base-ifno{
}
</style>
