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

// 使用路由中间件
Vue.use(VueRouter)
// 使用iview中间件
Vue.use(iView);

// 使用ui中间件
Vue.use(ElementUI);

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
    }
 ]
})

// 引入CSS
import './assets/statics/site/css/style.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')