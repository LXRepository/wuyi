import axios from 'axios'
import qs from 'qs'
import router from '@/router'
import { Notification, MessageBox, Message } from 'element-ui'
import store from '@/store'
import {startLoading, endLoading} from '@/components/common/loading.js'
// 创建axios实例
let service = axios.create({})
// 开发环境
if (process.env.NODE_ENV === 'development') {
  service = axios.create({
    baseURL: '/cemapi',
    timeout: 120000
  })
}
// 生产环境
if (process.env.NODE_ENV === 'production') {
  service = axios.create({
    baseURL: location.protocol + '//' + location.hostname+':9329' + '/',
    timeout: 120000
  })
}
//刷新请求
let verification = function () {
  let formData = new FormData();
  formData.append("id", localStorage.getItem('USERID'));
  formData.append("refresh", store.state.refresh);
  return service({
    url:'auth/refreshToken',
    method: 'post',
    data:formData,
    headers: {
      'Authorization': '',
    }
  })
}
//请求挂起
async function doRequest (error) {
  let tokenn =await verification().then((res)=>{
    return res.headers.authorization
  })
  localStorage.setItem('token', tokenn)
  let config = error.response.config
  config.baseURL = ''
  config.headers.Authorization = 'Bearer ' + tokenn
  let ress =  await axios.request(config)
  return ress
} 
// token加载函数
let getToken = function () {
  var token =localStorage.getItem('token')
  return token
}
// request拦截器
service.interceptors.request.use(
  config => {
    if (store.state.needloading === true) {
      startLoading()
    }
    if (getToken()) {
      if (config.url.split('/').indexOf('refreshToken') == -1) {
        config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      }
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const code = response.status
    if (code < 200 || code > 300) {
      if (store.state.needloading === true) {
        endLoading()
      }
      Message({
        showClose: true,
        message: 'response.data.message',
        type: 'error',
        duration: 2000
      })
      return Promise.reject('error')
    } else {
      if (store.state.needloading === true) {
        endLoading()
      }
      store.dispatch("FRESH_TOKEN",false)//请求成功则token标识清空
      return response
    }
  },
  error => {
    if (store.state.needloading === true) {
      endLoading()
    }
    let code = 0
    try {
      var els = document.getElementsByClassName('el-message')
      var gqtc = document.getElementsByClassName('el-message-box')
      code = error.response.data.status
    } catch (e) {
      if (error.toString().indexOf('Error: timeout') !== -1) {
        if (els.length === 0) {
          Message({
            showClose: true,
            message: '网络请求超时',
            type: 'error',
            duration: 2000
          })
        }
        return Promise.reject(error)
      }
      if (error.toString().indexOf('Error: Network Error') !== -1) {
        if (els.length === 0) {
          Message({
            showClose: true,
            message: '网络请求错误',
            type: 'error',
            duration: 2000
          })
        }
        return Promise.reject(error)
      }
    }
    if (code === 401) {
      if (error.response.config.url.split('/').indexOf('refreshToken') == -1) {
        return doRequest(error)
      } else {
        if (gqtc.length === 0 || gqtc.length === 1) {
          sessionStorage.setItem('tokenout', 'tokenout')
          MessageBox.confirm(
            '登录状态已过期，请退出重新登录！',
            '系统提示',
            {
              type: 'warning',
              showClose:false,
              showCancelButton:false,
              closeOnClickModal:false
            }
          ).then(() => {
            let data = 1
            store.dispatch('SET_LOGINSTATUS', data).then(() => {
              localStorage.clear()
              sessionStorage.clear()
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          })
        }
        if(store.state.isLogin === 0){
          setTimeout(() => {
            localStorage.clear()
            sessionStorage.clear()
            location.reload()
          }, 10000);
        }
      }
    } else if (code === 403) {
      if (gqtc.length === 0 || gqtc.length === 1) {
        MessageBox.confirm(
          '您暂无该权限，您可以继续留在该页面，或者进入首页',
          '系统提示',
          {
            confirmButtonText: '进入首页',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          router.push({ path: '/' })
        })
      }
    } else {
      const errorMsg = error.response.data.message
      if (error.response.config.url.split('/').indexOf('refreshToken') == -1) {
        if (errorMsg !== undefined) {
          if (els.length === 0) {
            Message({
              showClose: true,
              message: errorMsg,
              type: 'error',
              duration: 2000
            })
          }
        } else {
          if (els.length === 0) {
            Message({
              showClose: true,
              message: '服务已关闭',
              type: 'error',
              duration: 2000
            })
          }
        }
      }
    }
    return Promise.reject(error)
  }
)
export default service
