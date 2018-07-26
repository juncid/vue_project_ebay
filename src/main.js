import Vue from 'vue'
import App from './App.vue'
// 引入路由模块
import VueRouter from 'vue-router'
// 引入ui模块
import ElementUI from 'element-ui';
// 引入CSS
import 'element-ui/lib/theme-chalk/index.css';

// 引入路由
import index from './components/index.vue'

// 使用路由中间件
Vue.use(VueRouter)

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
 ]
})

// 引入CSS
import './assets/statics/site/css/style.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')