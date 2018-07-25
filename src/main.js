import Vue from 'vue'
import App from './App.vue'
// 引入路由模块
// import VueRouter from 'vue-router'

// 引入路由
// import index from './components/index.vue'

// 使用路由中间件
// Vue.use(VueRouter)

// 定义路由规则
// const router = new VueRouter({
//   routes : [
//    { path: '/index', component: index },
//  ]
// })


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // router
}).$mount('#app')
