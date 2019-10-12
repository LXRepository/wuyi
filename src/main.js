// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import $ from 'jquery'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import global_ from './global/global'
import { HappyScroll } from 'vue-happy-scroll'//自定义组件名
Vue.component('happy-scroll', HappyScroll)// 引入css
import 'vue-happy-scroll/docs/happy-scroll.css'
import './assets/iconfont/iconfont.css'
Vue.prototype.GLOBAL = global_
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.use(VueResource)
Vue.config.productionTip = false
router.afterEach((to, from, next) => { // 路由跳转页面同时跳到顶部
  window.scrollTo(0, 0)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
