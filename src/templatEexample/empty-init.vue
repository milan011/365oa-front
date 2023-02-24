<template>
  <div class="app-container example-temlate">
    <h1>空模板实例</h1>
  </div>
</template>
<script>
import { validatenull } from "@/utils/common";
import { mapGetters } from 'vuex'
let _this = null; //_this固定指向vue对象,避免多层this

export default {
  name: 'ExampleTemlate', //vue组件名称
  components: { //子组件
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
  filters: { //过滤器,建议使用计算属性或方法调用
    /*currencyUSD(value) {
      return '$' + value
    }*/
    // {{ accountBalance | currencyUSD }}
  },
  created() {
    _this = this //_this固定指向vue对象,避免多层this
    //created生命周期,在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
  },
  data() {
    return {
    }
  },
  mounted(){
    //mounted生命周期:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作
  },
  activated () {
    //<keep-alive>包裹的动态组件会被缓存,当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。
  },
  watch:{ //响应数据的变化
    //1.基础用法
    /*name (val) {
      _this.watchName = val;
    }
    <input type="text" v-model="name" />
    {{watchName}}*/
    //2.监听methods函数
    /*name: 'nameChange' 监听data定义的name变化,通过methods定义的nameChange方法来处理*/
    //3.1对象监听-基本使用
    /*'formItem.name'(val){
      _this.watchObjName = val;
    },*/
    //3.2对象监听-借助computed
    /*
      newName (val) { //watch中内容
        _this.watchObjName = val;
      }
      computed: { //computed内容
        newName () {
          return _this.formItem.name;
        }
      }
    */
    //3.3 immediate 和 handler
    /*watch 的用法有个特点，就是当值第一次绑定的时候，不会执行监听函数，只有值发生改变才会执行。如果我们需要在最初绑定值得时候也执行函数，就需要用到 immediate 属性。
      name: {
       handler (val) {
         _this.watchName = val;
       },
       immediate: true
     }*/
    //3.4 deep 深度监听
    /*person: {
      handler (val) {
        console.log('深度监听：', val);
      },
      deep: true
    }*/
  },
  methods: {
    /*async promiseFun(){ //同步-异步方法
      let p1 = await this.promise1()
      let p2 = await this.promise2()
      console.table('p1->', p1, 'p2->', p2)
    },
    promise1(){
      return new Promise((resolve, reject) => {
        setTimeout(()=>{
          console.log('promise1')
          resolve('promise1 返回')
        }, 12000)
      });
    },
    promise2(){
      return new Promise((resolve, reject) => {
        setTimeout(()=>{
          console.log('promise2')
          resolve('promise2 返回')
        }, 2000)
      });
    },*/
    /*exampleRefect(val){
      let returnObj = this.examplesMap.find(item=>item.value == val)
      return returnObj ? returnObj.label : ''
    },*/
  }
}
</script>
<style scoped>
</style>
<style lang="scss" scoped>
.example-temlate{
}
</style>
