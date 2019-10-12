import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const loginpage = r => require.ensure([], () => r(require('@/pages/loginPageDD')), 'loginpage')
const AppView = r => require.ensure([], () => r(require('@/pages/AppView')), 'AppView')
const applicationManage = r => require.ensure([], () => r(require('@/pages/applicationManage/applicationManage2')), 'applicationManage')
const dataDynamics = r => require.ensure([], () => r(require('@/pages/dataDynamics/dataDynamics')), 'dataDynamics')
const dataSharing = r => require.ensure([], () => r(require('@/pages/dataSharing/dataSharing')), 'dataSharing')
const personalManage = r => require.ensure([], () => r(require('@/pages/personalManage/personalManage')), 'personalManage')
const serviceSharing = r => require.ensure([], () => r(require('@/pages/serviceSharing/serviceSharing')), 'serviceSharing')
const monitor = r => require.ensure([], () => r(require('@/pages/monitor/index')), 'monitor')
const pipelineQuery = r => require.ensure([], () => r(require('@/pages/pipelineQuery/index')), 'pipelineQuery')
export default new Router({
  routes: [
    {
      path: '/',
      name: 'serviceSharing',
      component: serviceSharing,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/loginpage',
      name: 'loginpage',
      component: loginpage,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '*',
      redirect: '/',
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/applicationManage',
      name: 'applicationManage',
      component: applicationManage,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/dataDynamics',
      name: 'dataDynamics',
      component: dataDynamics,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/dataSharing',
      name: 'dataSharing',
      component: dataSharing,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/personalManage',
      name: 'personalManage',
      component: personalManage,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/serviceSharing',
      name: 'serviceSharing',
      component: serviceSharing,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/monitor',
      name: 'monitor',
      component: monitor,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/pipelineQuery',
      name: 'pipelineQuery',
      component: pipelineQuery,
      meta: {
        keepAlive: true
      }
    },
  ]
})
