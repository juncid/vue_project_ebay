import Vue from 'vue'
import App from './App.vue'
import path  from "path"
// 引入路由模块
import VueRouter from 'vue-router'
// 引入ui模块
import ElementUI from 'element-ui';
// 引入iview模块
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// 引入moment模块
import moment from 'moment';
// 引入vuex
import Vuex from 'vuex'


// 注册全局过滤器
Vue.filter('cutTime', function (value) {
    return moment(value).format('YYYY-MM-DD')
})

// 抽取公共模块
// 引入ajax模块
import axios from 'axios';
// 在Vue的原型上添加axios方法，让所有组件都能共用
Vue.prototype.axios = axios;
// 定义默认的根地址，组件共用
axios.defaults.baseURL = 'http://47.106.148.205:8899'


// 引入CSS
import 'element-ui/lib/theme-chalk/index.css';
// 引入懒加载模块
import VueLazyload from 'vue-lazyload'

// 使用懒加载路由
Vue.use(VueLazyload,{
  preLoad: 1.3,
  error: 'assets/img/01.gif',
  loading:require('./assets/img/01.gif'),
  attempt: 1 
})


// 引入路由
import index from './components/index.vue'
import goodInfo from './components/goodsInfo.vue'
import buyCar from './components/buyCar.vue'
import payOrder from './components/payOrder.vue'

// 使用路由中间件
Vue.use(VueRouter)
// 使用iview中间件
Vue.use(iView);

// 使用ui中间件
Vue.use(ElementUI);

// 使用vuex
Vue.use(Vuex)

// 从本地取出数据
let buyList = JSON.parse(window.localStorage.getItem('buyList'))

// 实例化一个vuex的仓库
const store = new Vuex.Store({
  state: {
    // 因为要添加到购物车的商品不止一种，所以需要修改vuex仓库结构
    buyList
  },
  // 显示总数到购物车标签上
  // 有一个类似于computed的属性
  getters:{
    totalCount(state){
      let num = 0
      // buyList是个对象 所有forin遍历
      for (const key in state.buyList) {
        // 累加总数
        num+=parseInt(state.buyList[key])
      }
      return num;
    }
  },
  // 变更vuex的数据，必须通过mutations里面的方法
  mutations: {
    // info -> {goodId:xx,goodNum:xx}
    // 
    buyGood (state,info) {
      if(state.buyList[info.goodId]){
        // 如果有商品
        let oldNum = parseInt(state.buyList[info.goodId])
        oldNum += parseInt(info.goodNum);
        state.buyList[info.goodId] = oldNum;
      }else{
        // 没有就直接赋值
        // 直接赋值的方式vue不会跟踪属性
        // state.buyList[info.goodId] = info.goodNum
        Vue.set(state.buyList,info.goodId,parseInt(info.goodNum));
      }
    },
    // 当购物车修改数量时，同步修改购物车标签中的数据
    // info -> {goodId:xx,goodNum:xx}
    changeCount(state,info){
      state.buyList[info.goodId] = info.goodNum
    },
    // 删除某一条数据
    delGood(state,id){
      Vue.delete(state.buyList,id)
    }
  }
})

// 定义路由规则
const router = new VueRouter({
  routes: [
    // 访问根目录，去首页
    { path:'/',redirect:'/index' },
    {
      path: '/index',
      component: index
    },
    {
      path:'/goodsInfo/:id',
      component:goodInfo
    },
    {
      path:'/buyCar',
      component:buyCar
    },
    {
      path:'/payOrder',
      component:payOrder
    }
 ]
})

// 引入CSS
import './assets/statics/site/css/style.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 挂载路由
  router,
  // 挂载vuex仓库
  store
}).$mount('#app')

// 数据常驻  关闭或刷新浏览器保存数据在本地
window.onbeforeunload = function(){
  window.localStorage.setItem('buyList',JSON.stringify(store.state.buyList));
}