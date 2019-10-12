import axios from 'axios'
import qs from 'qs'
let Base64 = require('js-base64').Base64
let  config 
let  api
let  mcapi 
// 开发环境
if (process.env.NODE_ENV === 'development') {
  config = '/cemapi/'
  api = '/cemapi/'
  mcapi = '/cemapi/'
}
// 生产环境
if (process.env.NODE_ENV === 'production') {
  config = location.protocol + '//' + location.hostname+':9329' + '/'
  api = location.protocol + '//' + location.hostname+':9329' + '/'
  mcapi = location.protocol + '//' + location.hostname+':9329' + '/'
}
// const config = location.protocol + '//' + location.host + '/cemapi' // 部署api
// const api = location.protocol + '//' + location.host + '/cemapi' 
// const mcapi = location.protocol + '//' + location.host + '/cemapi' 
//  const config = '/cemapi/' // 生产config
//  const api = '/wyapi/' // 生产api
//  const mcapi = '/mcapi/' // 生产api
export let getapi = function () {
  let data = api
  return data
}
// token加载函数
let getToken = function () {
  var token = ' '
  token = sessionStorage.getItem('token')
 // let token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOlsiYWRtaW51c2VycyJdLCJ1c2VySWQiOjEsInRlcm1pbmFsVHlwZSI6IjIwMTgxMSIsImlhdCI6MTU0MjYxODc0MywiZXhwIjoxNTQzMjIzNTQzfQ.rbZjmwQPOS3b_CxI0EAex6HahxwduL8FBbqMmaZNGGc'
  return token
}
//----------------------------------------登录----------------------------------------------------------
//获取用户登录名
export let getUserName = function ( page, rows) {
  let data = axios({
    url: config + 'User/getUserName',
    method: 'get',
  })
  return data
}
//用户登录
export let Login = function ( pwd,name) {
  let data = axios({
    url: config + 'User/Login',
    method: 'post',
    params: {
      pwd:Base64.encode(pwd),
      username:name
    }
  })
  return data
}
//用户修改密码
export let updatePwd = function (form) {
  var postDatas = {}
  postDatas.pwd = Base64.encode(form.pwd)
  postDatas.newpwd = Base64.encode(form.newpwd)
  let postData = qs.stringify(postDatas)
  let data = axios({
    url: config + 'User/updatePwd',
    method: 'post',
    data: postData,
  })
  return data
}
//----------------------------------------服务共享----------------------------------------------------------
//中院分页获取已发布服务列表
export let getCatalogList = function ( page, rows) {
  let data = axios({
    url: config + 'Catalog/getCatalogList',
    method: 'get',
    params: {
      page:page,
      rows:rows,
    }
  })
  return data
}
//已发布查询详情
export let getCatalogInfo = function ( cTreeid) {
  let data = axios({
    url: config + 'Catalog/getCatalogInfo',
    method: 'get',
    params: {
      cTreeid:cTreeid
    }
  })
  return data
}
//下载详情
export let getInstructions = function ( cTreeid) {
  let data = config + 'Catalog/getInstructions?cTreeid='+cTreeid
  return data
}
// 申请已发布服务
export let applicationCatalog = function () {
  let url = config + 'Catalog/applicationCatalog'
  return url
}
// 搜索服务
export let queryCatalog = function (page, rows,cName) {
  let data = axios({
    url: config + 'Catalog/queryCatalog',
    method: 'get',
    params: {
      cName:cName,
      page:page,
      rows:rows
    }
  })
  return data
}

//----------------------------------------数据共享----------------------------------------------------------
//一级目录
export let getInitMetaDataMeun = function () {
  let data = axios({
    url: api + 'MetaData/getInitMetaDataMeun',
    method: 'get',
  })
  return data
}
//下层目录
export let getMetaDataMeun = function (id,cj) {
  let data = axios({
    url: api + 'MetaData/getMetaDataMeun',
    method: 'get',
    params: {
      id:id === undefined ? '':id,
      cj:cj === null ? 5:cj === undefined ? '':cj,
    }
  })
  return data
}
//修改目录
export let upTabMeta = function (id, fid, name) {
  var postDatas = {}
  postDatas.id = id
  postDatas.fid = fid
  postDatas.name = name
  let postData = qs.stringify(postDatas)
  let data = axios({
    url: api + 'MetaData/upTabMeta',
    method: 'put',
    data: postData,
  })
  return data
}
//删除目录
export let delTabMeta = function (id,fid) {
  let data = axios({
    url: api + 'MetaData/delTabMeta',
    method: 'delete',
    params: {
      id:id,
      fid:fid
    }
  })
  return data
}
//保存目录
export let insertCatalog = function (cName, cDesc, tableInfo) {
  var postDatas = {}
  postDatas.cTestName = cName
  postDatas.cDesc = cDesc
  postDatas.tableInfo =JSON.stringify( tableInfo)
  let postData = qs.stringify(postDatas)
  let data = axios({
    url: config + 'Catalog/insertCatalog',
    method: 'post',
    data: postData,
  })
  return data
}
//定制化展示
export let getYjml = function (page, rows) {
  let data = axios({
    url: api + 'DataMaint/getYjml',
    method: 'get',
    params: {
      page:page,
      rows:rows
    }
  })
  return data
}
//定制化删除
export let delTols = function (id) {
  let data = axios({
    url: api + 'DataMaint/delTols',
    method: 'delete',
    params: {
      ids:id,
    }
  })
  return data
}
//获取定制化详情树
export let getTreeMeun  = function (fid, cj,id) {
  let data = axios({
    url: api + 'DataMaint/getTreeMeun',
    method: 'get',
    params: {
      fwid:fid,
      fid:id,
      cj:cj === null ? '5':cj
    }
  })
  return data
}
//定制化申请
export let submitCatalog = function () {
  let url = config + 'Catalog/submitCatalog'
  return url
}
//定制化修改一级目录
export let getTols = function (fwId) {
  let data = axios({
    url: api + 'DataMaint/getTols',
    method: 'put',
    params: {
      fwId:fwId,
    }
  })
  return data
}
//定制化修改其他目录
export let getMetaMeun = function (fwId,id,cj) {
  let data = axios({
    url: api + 'DataMaint/getDataMaintMeun',
    method: 'get',
    params: {
      fwId:fwId === undefined ? '':fwId,
      id:id === undefined ? '':id,
      cj:cj === null ? 5:cj === undefined ? '':cj,
    }
  })
  return data
}
//定制化修改保存
export let upSave = function (add,del) {
  var postDatas = {}
  postDatas.add = JSON.stringify(add)
  postDatas.del = JSON.stringify(del)
  let postData = qs.stringify(postDatas)
  let data = axios({
    url: api + 'DataMaint/upSave',
    method: 'put',
    data: postData,
  })
  return data
}
//----------------------------------------申请管理----------------------------------------------------------
//申请展示
export let getSelfCatalogList  = function (page, rows,form) {
  let data = axios({
    url: config + 'Catalog/getSelfCatalogList',
    method: 'get',
    params: {
      page:page,
      rows:rows,
      cName:form.cName,
      cDept:form.cDept,
      cLeadName:form.cLeadName,
    }
  })
  return data
}
//申请状态获取
export let getSelfCatalogListByStatus  = function (page, rows, nStatus) {
  let data = axios({
    url: config + 'Catalog/getSelfCatalogListByStatus',
    method: 'get',
    params: {
      page:page,
      rows:rows,
      nStatus: nStatus
    }
  })
  return data
}

//----------------------------------------数据动态----------------------------------------------------------
//数据动态获取
export let getChangeRecord = function (currentPage, pageSize,form) {
  let data = axios({
    url: mcapi + 'ChangeRecord/getChangeRecordsByTabName',
    method: 'get',
    params: {
      currentPage:currentPage,
      pageSize: pageSize,
      cTabName:form.cTabName,
      eTabName :form.eTabName,
      stime :form.timevalue.start ? form.timevalue.start+' 00:00:00' :'',
      etime :form.timevalue.end ? form.timevalue.end+' 00:00:00':'',
    }
  })
  return data
}