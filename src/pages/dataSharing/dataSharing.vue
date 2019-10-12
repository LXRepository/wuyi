{C}<!--  -->
<template>
  <div class="dataShar"
  v-loading.fullscreen.lock="fullscreenLoading" 
  element-loading-text="wait..."
  element-loading-spinner="el-icon-loading"
  element-loading-background="rgba(0, 0, 0, 0.5)">
    <div class="treeYuan">
      <div class="bt">
        <button class="addBC" v-if="isChange == false">
          <i class="el-icon-folder-add" @click="saveYSJ" >保存新增</i>
        </button>
        <button class="addBC" v-else>
          <i class="el-icon-folder-checked" @click="saveChange" >保存修改</i>
        </button>
      </div>
      <div class="tree" > 
        <el-tree 
          accordion
          :style="isChange==false?'display:block':'display:none'"
          :check-strictly = true
          :props="props"
          :load="loadNode"
          lazy
          :indent=0
          node-key='id'
          ref="tree"
          :show-checkbox = 'showCheck'
          @check = 'handleCurrentChange'
          >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span class="title">
              <input type="text" :value=" node.label " disabled  @blur="save()" v-focus="focusState">
              <i v-if="isWaitIcon == 'wait'" class="el-icon-loading" style="display:none"></i>
              <i v-else-if="isWaitIcon == 'error'" class="el-icon-close" style="color:red;display:none"></i>
              <i v-else-if="isWaitIcon == 'success'" class="el-icon-check" style="color:#67c23a;display:none"></i>
              <i v-else style="display:none"></i>
            </span>
            <!-- <span class="treetotle">
              <el-button
                :class="isWaitIcon == 'normol'?' button change':'button disabledChange'"
                type="text"
                size="mini"
                @click="change(node,$event)">
                    <i class="el-icon-edit"></i>
              </el-button>
              <el-button
                class="button delete"
                type="text"
                size="mini"
                @click="remove(node,$event)">
                    <i class="el-icon-delete"></i>
              </el-button>
            </span> -->
          </span>
        </el-tree>
         <el-tree 
          accordion
          v-for="item in DZData"
          :key="item.id"
          v-if="changeId == item.id"
          :check-strictly = true
          :props="props"
          :load="loadNodeChange"
          lazy
          :indent=0
          node-key="id"
          ref="trees"
          @check-change='checkedChange'
          :default-checked-keys="checkedArr"
          :show-checkbox = 'showCheck'
          >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <i class="el-icon-star-on starChoose" v-if="data.zt == true"></i>
            <span class="title">
              <input type="text" :value=" node.label " disabled  @blur="save()" v-focus="focusState">
              <i v-if="isWaitIcon == 'wait'" class="el-icon-loading" style="display:none"></i>
              <i v-else-if="isWaitIcon == 'error'" class="el-icon-close" style="color:red;display:none"></i>
              <i v-else-if="isWaitIcon == 'success'" class="el-icon-check" style="color:#67c23a;display:none"></i>
              <i v-else style="display:none"></i>
            </span>
            <!-- <span class="treetotle">
              <el-button
                :class="isWaitIcon == 'normol'?' button change':'button disabledChange'"
                type="text"
                size="mini"
                @click="change(node,$event)">
                    <i class="el-icon-edit"></i>
              </el-button>
              <el-button
                class="button delete"
                type="text"
                size="mini"
                @click="remove(node,$event)">
                    <i class="el-icon-delete"></i>
              </el-button>
            </span> -->
          </span>
        </el-tree>
        
      </div>
    </div>
    <div class="DZhi">
      <div class="bt">
        <button class="addBCS">
          <i class="el-icon-document" @click="shenQbox">申请</i>
        </button>
      </div>
      <div class="main_left"> 
        <el-table
          highlight-current-row
          @current-change = 'getFwId'
          @expand-change='showTree'
          :show-header=false
          :data="DZData"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item>
                  <el-tree
                     v-if="showId != ''"
                    :props="propsDZ"
                    :load="loadNodeDZ"
                    lazy>
                  </el-tree>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
          show-overflow-tooltip
            label="定制名称"
            prop="name">
          </el-table-column>
          <el-table-column
          show-overflow-tooltip
            label="保存时间"
            prop="time">
          </el-table-column>
          <el-table-column label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button
              style="color:#88A0E9;"
                size="mini"
                type="text"
                @click="handleEdit(scope.$index, scope.row)">修改数据项</el-button>
              <el-button
              style="color:#EF753B;"
                size="mini"
                type="text"
                @click="handleDelete(scope.$index, scope.row)">删除数据项</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="CurrentChange"
          class="DZpag"
          v-if="total>=10"
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <div class="shenForm" :style="shenSTY" >
      <p class="message">定制化申请
        <i class="close el-icon-close" @click="closeShen"> </i>
      </p>
      <el-form  ref="form" :model="form" :rules="rules"  label-width="110px"  style="padding:20px;height:93%;overflow:scroll;">
        <el-form-item label="申请服务" prop="cName">
          <el-input v-model="form.cName"></el-input>
        </el-form-item>
        <el-form-item label="接入系统" prop="cSysName">
          <el-input v-model="form.cSysName"></el-input>
        </el-form-item>
        <el-form-item label="申请部门" prop="cDept">
          <el-input v-model="form.cDept"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="cLeadName">
          <el-input v-model="form.cLeadName"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="cTelNum">
          <el-input v-model="form.cTelNum"></el-input>
        </el-form-item>
        <el-form-item label="截止日期" prop="cEndDate">
          <el-date-picker
            :picker-options="expireTimeOption"
            v-model="form.cEndDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="平均每日调用次数" prop="cCallTimes">
          <el-input v-model="form.cCallTimes"></el-input>
        </el-form-item>
        <el-form-item label="使用范围" prop="cScope">
          <el-input v-model="form.cScope"></el-input>
        </el-form-item>
        <el-form-item label="使用场景" prop="cSpectacle">
          <el-input v-model="form.cSpectacle"></el-input>
        </el-form-item>
         <el-form-item label="请求IP" prop="cQeqip">
            <el-input   
                resize='none'
                placeholder="IP可填写多个，请以逗号分隔！"
                type="textarea"
                :rows="2" 
                v-model="form.cQeqip"/>
        </el-form-item>
        <el-form-item :label="'上传文档'+'pdf.jpg.png'"  prop="bDocument">
          <el-input  type="file" 
          placeholder="ddd" 
          autocomplete="off" 
          accept="image/png, 
          image/jpeg, 
          application/pdf" ref='input' class="input" v-model="form.bDocument"></el-input>
        </el-form-item>
        <el-form-item label="服务描述" prop="cDesc">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容..."
            v-model="form.cDesc">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button 
          v-loading.fullscreen.lock="fullscreenLoadingSQ" 
          element-loading-text="wait..."
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.5)"
          type="primary" @click="submitForm('form')">申请</el-button>
          <el-button @click="closeShen()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Vue from 'vue'
import ewTree from '@/components/dataSharing/ewtree' 
import {getInitMetaDataMeun,getMetaDataMeun,upTabMeta,delTabMeta,insertCatalog,getYjml,delTols,getTols,upSave,getMetaMeun,submitCatalog,getTreeMeun} from '@/api/getdata'
import {Loading,Message,Table,TableColumn,pagination,Form,FormItem,Input,Button,Tree,MessageBox,Select,Option,DatePicker,TimePicker,Col } from 'element-ui'
import Router from 'vue-router'
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(pagination)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Tree)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Col)
Vue.use(Select)
export default {
  components: {
    ewTree,
  },
  data () {
    const validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入电话号码'))
      } else if (!this.isvalidPhone(value)) {
        callback(new Error('请输入正确的11位手机号码'))
      } else {
        callback()
      }
    }
    
    const validfile = (rule, value, callback) => {
      let type = value.slice(value.lastIndexOf('.')+1)
      if (!value) {
        callback(new Error('请上传文件！'))
      } else if (type === 'png'|| type === 'jpg' || type === 'pdf') {
        callback()
      } else {
        callback(new Error('文件格式有误！'))
      }
    }
    return {
        fullscreenLoading:false,//初始loading
        props: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        },
        propsDZ: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        },
        propsChange: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        },
        isChange:false,//是否是修改
        checkedArr:[],//修改获取自动勾选节点
        changeId:'',//被修改的id
        deleteArr:[],//修改时被删掉的字段
        addArr:[],//修改时加上的字段
        addArrIDS:[],//单存修改添加的id
        deleteArrIDS:[],//单存修改删除的id
        firstData:[],//一层数据
        childrenList:[],//其他层级数据
        showCheck:true,//是否显示选择框
        e:'',//修改的当前dom数据（为了拿到父级input的dom)
        node:'',//修改的当前node（为了获取id，fid）
        eValue:'',//修改点击保存当前title
        focusState:false,//input自动获焦
        isWaitIcon:'normol',//修改icon
        saveArr:[], //保存数据
        page:1,
        rows:10,
        total:1,
        showId:'',//展开的服务Id
        DZData:[],//定制化数据
        id:'',//详情树上级Id
        cj:'',//详情树层级
        starArr:[],//修改星星标红数组
        shenSTY:{},//申请form样式
        shenQid:'',//申请Id
        fullscreenLoadingSQ:false,
        expireTimeOption: {
          disabledDate(date) { 
            return date.getTime() <= Date.now() - 8.64e7
          }
        },
        form: {//申请表单
          cTreeid:'',                 //服务id	
          cName:'',                   //服务名
          cDesc:'',                   //服务描述
          cSysName:'',                // 接入系统名字
          cDept:'',                   //申请部门
          cLeadName:'',               //负责人
          cTelNum:'',                 //联系电话
          cEndDate:'',                //使用截止日期
          cCallTimes:'',              //平均每日调用次数
          cScope:'',                  //适用范围
          cSpectacle:'',              //使用场景
          cQeqip:'',                  //ip
          bDocument:''                // 文件证明  文件格式只支持pdf、jpg、png
        },
        rules: {
          cName: [
            { required: true, message: '请填写服务名称！', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
          ],
          cSysName: [
            { required: true, message: '请输入接入系统名称！', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
          ],
          cDept: [
            { required: true, message: '请输入申请部门！', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
          ],
          cLeadName: [
            { required: true, message: '请输入负责人！', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
          ],
          cTelNum: [
            { required: true, trigger: 'blur', validator: validPhone }
          ],
          cEndDate: [
            { required: true, message: '请选择截止日期！', trigger: 'blur' },
          ],
          cCallTimes: [
            { required: true, message: '请输入平均每日调用次数!', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          cScope: [
            { required: true, message: '请输入适用范围！', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
          ],
          cSpectacle: [
            { required: true, message: '请输入使用场景！', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
          ],
          bDocument: [
            { required: true,  trigger: 'blur',validator: validfile },
          ],
          cDesc: [
            { required: true, message: '请输入该服务描述！', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
          ],
          cQeqip: [
            { required: true, message: "请输入请求IP！", trigger: "blur" },
              { min: 2, max: 160, message: '长度在 2 到 160 个字符', trigger: 'blur' }
          ],
        },
    };
  },
    created () {
      this.getDataMaint()
        
    },
    //自定义获焦指令
    directives: {
      focus: {
        update: function (el, {value}) {
          if (value) {
            el.focus()
          }
        }
      }
    },
    methods: {
        //电话正则
        isvalidPhone(str) {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          return reg.test(str)
        },
        //懒加载事件
        loadNode(node, resolve) {
            if (node.level === 0) {//层级一
                this.getFirstLev(node ,resolve)
            } 
            else if (node.level >= 1 && node.level <= 5   ) { // 二级节点
                this.getOtherLv(node,resolve)
            }
             else if  (node.level > 5)  return resolve([])
        },
        //定制懒加载
        loadNodeDZ(node, resolve ){
            if (node.level === 0) {//层级一
                this.cj = ''
                this.id = ''
                this.getDzMess(node,resolve)
            } 
            if (node.level >= 1 && node.level <= 5 ) { // 二级节点
                if (node.data.zcj === undefined) {
                  return resolve([])
                } else {
                  this.id = node.data.id
                  this.cj = node.data.zcj
                  this.getDzMess(node,resolve)
                }
            }
             if (node.level > 5)  return resolve([])
        },
        //修改懒加载
        loadNodeChange(node, resolve) {
            if (node.level === 0) {//层级一
                this.getFirstLevChange(node ,resolve)
            } 
            if (node.level >= 1 && node.level <= 5 ) { // 二级节点
                this.checkedArr = []
                this.getOtherLvChange(node,resolve)
            }
             if (node.level > 5)  return resolve([])
            //  if(this.$refs.trees!=undefined){
            //     this.$refs.trees.setCheckedKeys([12])
            //  }
        },
        //一层数据
        getFirstLev(node,resolve){
            getInitMetaDataMeun().then(response => {
               response.data.msg.push({id: "999999", fid: "999999", zcj: "999999", name: "其他", zid: null, zt: false,type:'menu'})
               this.firstData = response.data.msg
               return resolve(this.firstData)
            })
            .catch((response) => {
                this.fullscreenLoading = false
                Message.error('服务异常')
            })
            .then(() => {
            })
        },
        //下层数据
        getOtherLv(node,resolve){
          if (node.key == '999999') {
            getMetaDataMeun().then(response => {
              let data = response.data.msg
              return resolve(data)
            })
            .catch((response) => {
                Message.error('服务异常')
            })
            .then(() => {
            })
          }
          else if (node.data.type === 'tab') {
             return resolve([])
          } else  if (node.data.type === 'menu'){
              getMetaDataMeun(node.key,node.data.zcj).then(response => {
                let data = response.data.msg
                if (node.data.zcj == null) {
                  data.forEach(item => {
                    item.leaf= true
                  })
                  return resolve(data)
                } else {
                  return resolve(data)
                }
                })
                .catch((response) => {
                    Message.error('服务异常')
                })
                .then(() => {
                })
          }
        },
        //修改
        change(node,e){
          if (this.isWaitIcon == 'normol') {
            this.node = node
            this.e = e
            this.focusState = true//自动获焦
            e.path[4].childNodes[0].children[0].disabled = false
            e.path[4].childNodes[0].children[0].style.background = '#fff'
          } else {
            return
          }
        },
        //修改提交
        save(){
          let changeTitle = this.e.path[4].childNodes[0].children[0].value//修改的数据用于渲染成功
          this.eValue = this.e.path[4].childNodes[0].children[0]._value //原本渲染出来的数据用于渲染失败
          this.e.path[4].childNodes[0].children[0].disabled = true 
          this.e.path[4].childNodes[0].children[0].style.background = '#b0d0eb'
          this.isWaitIcon = 'wait'
          this.e.path[4].childNodes[0].children[1].style.display = 'inline-block'
          upTabMeta(this.node.data.id, this.node.data.fid, changeTitle).then(response => {
              if (response.data.status == 'error') {
                Message({
                  showClose: true,
                  message: response.data.msg,
                  type: 'error',
                  duration:0
                })
                this.isWaitIcon = 'error'
                this.e.path[4].childNodes[0].children[1].style.display = 'inline-block'
                this.e.path[4].childNodes[0].children[0].value =  this.eValue
                setTimeout(() => {
                  this.e.path[4].childNodes[0].children[1].style.display = 'none'
                  this.isWaitIcon = 'normol'
                }, 3000)
              } else {
                Message.success(response.data.msg)
                this.isWaitIcon = 'success'
                this.e.path[4].childNodes[0].children[1].style.display = 'inline-block'
                this.e.path[4].childNodes[0].children[0]._value =  changeTitle
                this.e.path[4].childNodes[0].children[0].value =  changeTitle
                setTimeout(() => {
                  this.e.path[4].childNodes[0].children[1].style.display = 'none'
                  this.isWaitIcon = 'normol'
                }, 3000)
              }
          })
          .catch((response) => {
              Message.error('服务异常')
              this.e.path[4].childNodes[0].children[1].style.display = 'none'
              this.isWaitIcon = 'normol'
          })
          .then(() => {
          })
         
        },
        //删除
        remove(node, e) {
          delTabMeta(node.data.id, node.data.fid,).then(response => {
              if (response.data.status == 'success') {
                e.path[6].style.display = 'none'
              } else {
                 Message({
                  showClose: true,
                  message: response.data.msg,
                  type: 'error',
                  duration:0
                })
              }
          })
          .catch((response) => {
              this.fullscreenLoading = false
              Message.error('服务异常')
          })
          .then(() => {
          })
        },
        //获取选中元数据
        handleCurrentChange(data, node) {
          this.saveArr = node.checkedNodes.concat()
        },
        //保存元数据
        saveYSJ(){
          if (this.saveArr.length == 0) {
            Message.error('请至少勾选一项才可保存！')
          } else {
            MessageBox.prompt('名称', '提示', {
              confirmButtonText: '保存',
              cancelButtonText: '取消',
              inputType:'text',
              inputPlaceholder:'名称可由字母数字中文下划线10个字符以内组成',
              inputPattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_]{1,10}$/,
              inputErrorMessage: '名称格式不正确'
            }).then(({ value }) => {
              let saveArr = []
              this.saveArr.forEach(function (value, index, array) {
                saveArr.push({cTableid:value.fid,nColsn:value.id,cCtbname:value.fname,cColname:value.name})
              })
              insertCatalog(value,'csd', saveArr).then(response => {
                  if (response.data.status == 'success') {
                    this.$refs.tree.setCheckedKeys([])
                    this.saveArr = []
                    this.getDataMaint()
                    Message.success(response.data.msg)
                  } else {
                    Message({
                      showClose: true,
                      message: response.data.msg,
                      type: 'error',
                      duration:0
                    })
                  }
              })
              .catch((response) => {
                  this.fullscreenLoading = false
                  Message.error('服务异常')
              })
              .then(() => {
              })
            }).catch(() => {
              //取消保存     
            })
          }
        },
        //定制化数据展示
        getDataMaint(){
          this.shenQid = ''
          getYjml(this.page, this.rows).then(response => {
            this.DZData = response.data.msg.rows
            this.total = response.data.msg.total
          })
          .catch((response) => {
              this.fullscreenLoading = false
              Message.error('服务异常')
          })
          .then(() => {
          })
        },
        //获取定制化详情Id
        showTree(row, expandedRows){
          this.showId = row.id
        },
        //定制化详情接口
        getDzMess(node,resolve){
          getTreeMeun(this.showId,this.cj,this.id).then(response => {
            let data = response.data.msg
            if (node.level > 0 && node.data.zcj == null) {
              data.forEach(item => {
                item.leaf= true
              })
              return resolve(data)
            }else  if (node.level  ==  0 && response.data.qt == true){
              response.data.msg.push({id: "", fid: "", zcj: "4", name: "其他", zid: null, zt: false})
              return resolve(data)
            } else {
              return resolve(data)
            }
          })
          .catch((response) => {
              this.fullscreenLoading = false
              Message.error('服务异常')
          })
          .then(() => {
          })
        },
        //分页
        CurrentChange(val) {
          this.page = val
          this.getDataMaint()
        },
        //修改改变展示树
        handleEdit(index, row) {
          this.isChange = true
          this.changeId = row.id
        },
        //修改获取第一层树
        getFirstLevChange(node,resolve){
          this.checkedArr = []
            getTols(this.changeId).then(response => {
              if (response.data.qt == true) {
                 response.data.msg.push({id: "999999", fid: "999999", zcj: "999999", name: "其他", zid: null, zt: true})
              } else {
                 response.data.msg.push({id: "999999", fid: "999999", zcj: "999999", name: "其他", zid: null, zt: false})
              }
               this.firstData = response.data.msg
               return resolve(this.firstData)
            })
            .catch((response) => {
                this.fullscreenLoading = false
                Message.error('服务异常')
            })
            .then(() => {
            })
        },
        //修改获取下层树
        getOtherLvChange(node,resolve){
          if (node.key == '999999') {
            getMetaMeun(this.changeId).then(response => {
              let data = response.data.msg
              return resolve(data)
            })
            .catch((response) => {
                Message.error('服务异常')
            })
            .then(() => {
            })
          }
          else if (node.data.zcj === undefined) {
            this.checkedArr = []
            return resolve([])
          } else {
             getMetaMeun(this.changeId,node.key,node.data.zcj).then(response => {
              let data = response.data.msg
              if (node.data.zcj == null) {
                this.checkedArr = []
                let checkedArr = []
                data.forEach(item => {
                  item.leaf= true
                  if (item.zt == true) {
                    checkedArr.push(item.id)
                    this.checkedArr = checkedArr
                  }
                })
                return resolve(data)
              } else {
                return resolve(data)
              }
              })
              .catch((response) => {
                  Message.error('服务异常')
              })
              .then(() => {
              })
          }
        },
        //修改时操作的节点
        checkedChange(a,b){
          let that =this
          if (b == true) {
            if (this.checkedArr.indexOf(a.id) == -1) {
              this.addArrIDS.push(a.id)
              this.addArr.push({fwId: this.changeId,fId:a.fid,fName:a.fname,id:a.id,name:a.name})
            } else {
              if (this.deleteArrIDS.indexOf(a.id) == -1) {
                return
              } else {
                this.deleteArr.forEach(function (value, index, array) {
                  if (value.id == a.id) {
                     that.deleteArr.splice(index,1)
                  }
                })
              }
            }
          } else {
            if (this.checkedArr.indexOf(a.id) == -1) {
              if (this.addArrIDS.indexOf(a.id) == -1) {
                return
              } else {
                this.addArr.forEach(function (value, index, array) {
                  if (value.id == a.id) {
                     that.addArr.splice(index,1)
                  }
                })
              }
            } else {
              this.deleteArrIDS.push(a.id)
              this.deleteArr.push({fwId: this.changeId,fId:a.fid,fName:a.fname,id:a.id,name:a.name})
            }
          }
        },
        //保存修改
        saveChange(){
          upSave(this.addArr,this.deleteArr).then(response => {
            this.addArr = []
            this.deleteArr = []
            if (response.data.status == 'success') {
              Message.success(response.data.msg)
              this.isChange = false
              this.changeId = ''
            } else {
              Message({
                showClose: true,
                message: response.data.msg,
                type: 'error',
                duration:0
              })
            }
          })
          .catch((response) => {
              this.fullscreenLoading = false
              Message.error('服务异常')
          })
          .then(() => {
          })
        },
        //获取申请服务id
        getFwId(a,b){
          this.shenQid = a.id
        },
        //定制化删除
        handleDelete(index, row) {
           MessageBox.confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              delTols(row.id).then(response => {
                if (response.data.status == 'success') {
                  Message.success(response.data.msg)
                  this.getDataMaint()
                } else {
                   Message({
                      showClose: true,
                      message: response.data.msg,
                      type: 'error',
                      duration:0
                    })
                }
              })
              .catch((response) => {
                  this.fullscreenLoading = false
                  Message.error('服务异常')
              })
              .then(() => {
              })
          }).catch(() => {

          })
        },
        //申请表单展开
        shenQbox(e){
          if (this.shenQid == '') {
            Message.error('请选择需要申请的数据！')
          } else {
            let wd = 'block'
            let top = e.clientY
            let right = e.clientX
            let BTsty = {
              right: '40%',
              top:0+ 'px',
              display:wd,
            }
            this.shenSTY = BTsty
          }
        },
        //定制化申请关闭
        closeShen(){
          let BTsty = {
            display:'none',
          }
          this.shenSTY = BTsty
          this.$refs['form'].resetFields()
          this.form={//申请表单清空
            cTreeid:'',                 //服务id	
            cName:'',                   //服务名
            cDesc:'',                   //服务描述
            cSysName:'',                // 接入系统名字
            cDept:'',                   //申请部门
            cLeadName:'',               //负责人
            cTelNum:'',                 //联系电话
            cEndDate:'',                //使用截止日期
            cCallTimes:'',              //平均每日调用次数
            cScope:'',                  //适用范围
            cSpectacle:'',              //使用场景
            cQeqip:'',                  //ip
            bDocument:''                // 文件证明  文件格式只支持pdf、jpg、png
          }
        },
        // 验证表单内容是否可以提交
        submitForm (form) {
          this.$refs[form].validate((valid) => {
            if (valid) {
              this.addForm()
            } else {
              Message.error('请修改申请信息！')
              return false
            }
          })
        },
        //提交表单
        addForm(){
            this.fullscreenLoadingSQ = true
            let date = this.form.cEndDate.getFullYear() + 
            '-' +( (this.form.cEndDate.getMonth() + 1)<10?'0'+(this.form.cEndDate.getMonth() + 1):(this.form.cEndDate.getMonth() + 1) )+ 
            '-' +( (this.form.cEndDate.getDate())<10?'0'+(this.form.cEndDate.getDate()):(this.form.cEndDate.getDate()) )
            let ip = this.$refs.input.$refs.input
            let formdata = new FormData()
            formdata.append("bDocument", ip.files[0])
            formdata.append("cTreeid", this.shenQid)
            formdata.append("cSysName",  this.form.cSysName)
            formdata.append("cDept",  this.form.cDept)
            formdata.append("cLeadName",  this.form.cLeadName)
            formdata.append("cTelNum",  this.form.cTelNum)
            formdata.append("cEndDate",  date)
            formdata.append("cCallTimes",  this.form.cCallTimes)
            formdata.append("cScope",  this.form.cScope)
            formdata.append("cSpectacle",  this.form.cSpectacle)
            formdata.append("cDesc",  this.form.cDesc)
            formdata.append("cName",  this.form.cName)
            formdata.append("cQeqip",  this.form.cQeqip)
            let that = this
              this.$axios
                .post(submitCatalog(), formdata, {
                      headers: { "Content-Type": "multipart/form-data" }
                })
                .then(res => {
                      that.fullscreenLoadingSQ = false
                      if (res.data.status == 'success') {
                          Message.success(res.data.msg)
                          that.closeShen()
                          that.getDataMaint()
                      } else {
                        Message({
                            showClose: true,
                            message: res.data.msg,
                            type: 'error',
                            duration:0
                          })
                      }
                })
                .catch(res =>  {
                    that.fullscreenLoadingSQ = false
                    Message.error('服务异常')
                })
        },
    },
    
}

</script>
<style lang="scss" scoped>

</style>

<style lang="scss">
.dataShar{
  width: 100%;
  height: 100%;
  background: #ffffff00;
  border-radius: 5px;
  //padding:0px 10px 10px 10px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  .shenForm{
    padding: 0px;
    box-sizing: border-box;
    display: none;
    position: absolute;
    background: #fff;
    overflow: hidden;
    border: 10px double #93a2bf;
    width: 45%;
    height: 82%;
    z-index: 99;
    .message{
      width: 100%;
      height: 7%;
      text-align: center;
      line-height: 30px;
      color: #fff;
      background: #93a2bf;
      margin: 0px;
      position: relative;
    }
    .close{
      position: absolute;
      right: 0px;
      cursor: pointer;
      &:hover{
        color:black;
      }
    }
  }
}
.addBCS{
  width: 100px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid #93a2bf!important;
  background: #93a2bf!important;
  color: #fff;
  outline: 0px;
  cursor: pointer;
  z-index:9999;
}
.treeYuan{
  float: left;
  width: 35%;
  height: 100%;
  position: relative;
  overflow: hidden;
  input:disabled{
    background:#fff !important;
    border:0px;
    width: 200px !important;
  }
  .bt{
    position: absolute;
    top:0px;
    width:100%;
    z-index: 99;
    padding:0px;
    box-sizing:border-box;
    .addBC{
      width: 100px;
      height: 30px;
      border-radius: 4px;
      border: 1px solid #93a2bf!important;
      background: #93a2bf!important;
      color: #fff;
      outline: 0px;
      cursor: pointer;
      z-index:9999;
    }
  }
  .tree{
    padding: 0 0 0 7px;
    position: absolute;
    top:37px;
    width:100%;
    height: 95%;
    overflow: scroll;
    box-sizing:border-box;
    background:#fff;
  }
}
.DZhi{
  float: left;
  width: 65%;
  height: 100%;
  position: relative;
  .bt{
    position: absolute;
    top:0px;
    width:100%;
    z-index: 99;
    padding:0px 7px;
    box-sizing:border-box;
    .addBCS{
      width: 100px;
      height: 30px;
      border-radius: 4px;
      border: 1px solid #93a2bf!important;
      background: #93a2bf!important;
      color: #fff;
      outline: 0px;
      cursor: pointer;
      z-index:9999;
    }
  }
  .main_left{
    float: left;
    width: 100%;
    margin-top:37px;
    height:95% ;
    overflow: scroll;
    box-sizing:border-box;
    padding: 0 0 0 7px;
  }
  .DZpag{
    position: absolute;
    bottom: 0px;
    width: 100%;
    text-align: center;
  }
}
.dataShar .el-pager li{
  background:#fff0;
}
.dataShar .el-pagination button:disabled{
    background-color: #FFF0 !important;
}
.dataShar .el-pagination .btn-next, .el-pagination .btn-prev {
    background: center center no-repeat #fff0 !important;
}
.dataShar .el-tree {
    float: left !important;
    overflow: hidden;
}
.dataShar .el-table td, .el-table th {
    padding:0px !important;
}
.dataShar .el-tree-node__content{
    background-color: #fff;
    transition:all .4s;
}
.dataShar .el-tree-node__content:hover {
    background-color: #fff;
    border-radius:5px;
}
.dataShar .el-tree-node:focus>.el-tree-node__content{
    background-color: #fff;
}
// .el-tree{
//     background: #fff0 !important;
//     height: auto;
//     position: relative;
// }
.dataShar .custom-tree-node{
   // width: 100% !important;
    box-sizing: border-box;
    height: 100%;
    position: relative;
}
.dataShar .starChoose{
    position: absolute;
    right:-20px;
    top:4px;
    color:red;
}
// .dataShar .custom-tree-node .title{
//         float: left;
//         display: inline-block;
//         width: 250px !important;
//         font-size: 14px !important;
//         height: 100% !important;
//         line-height: 33px !important;
//         text-align: center !important;
//         padding: 0 10px !important;
//         color: #4c597d !important;
//         //overflow: hidden;
//         background: #70a9da8c !important;
//         border-radius: 4px !important;
//         input{
//           cursor: pointer;
//           text-align:center;
//           border:0px;
//           background:#b0d0eb;
//           color:#394a77;
//           font-size:15px;
//         }
//     }
.dataShar .treetotle{
    float: left;
    height: 100%;
    padding:0 50px;
    button{
      width:50px;
      height: 100%;
      line-height:21px;
      i{
        font-size:20px;
      }
    }
    .change{
      i{
        color:#1c88e4;
      }
    }
    .disabledChange{
      cursor: wait;
    }
    .delete{
      i{
        color:red;
      }
    }
}
// .dataShar .el-tree-node__content{
//     margin: 10px 17px !important;
//     height: 35px!important;
//     width:532px;
//     // overflow: hidden;
// }
</style>
<style>
.dataShar  .el-form-item__label{
  line-height: 20px !important;
}
/*多选框选择性出现*/
.dataShar .el-tree-node   .is-leaf + .el-checkbox .el-checkbox__inner{
    display: inline-block;
}
.treetotle{
  display: none;
}
/*操作按钮选择性出现*/
.dataShar .el-tree-node   .is-leaf ~ .custom-tree-node .treetotle{
    display: inline-block;

}
.dataShar .el-tree-node .el-checkbox__input>.el-checkbox__inner{
    display: none
}
.el-tree-node__expand-icon.is-leaf{
  background: #ffffff00 !important;
}
.dataShar .el-tree-node .is-leaf  ~ .custom-tree-node .starChoose{
    display: none;
    
}
/*等待icon叶子非叶子节点不展示*/
/* .dataShar .closeIcon{
    display: none;
}
.dataShar .showIcon{
    display: inline-block;
} */
/* .dataShar .el-tree-node   .is-leaf ~ .custom-tree-node .showIcon{
    display: inline-block;
} */
/* 虚线样式 */
.dataShar .el-tree-node{
  position: relative;
  padding-left: 16px;
  float: left;
  width: 100%;
}
.dataShar .el-tree-node__children{
  padding-left: 24px;
}
.dataShar .el-tree-node :last-child:before {
  height: 38px;
}
.dataShar .el-tree>.el-tree-node:before{
  border-left: none;
}
.dataShar .el-tree>.el-tree-node:after{
  border-top: none;
}
.dataShar .el-tree-node:before,.el-tree-node:after{
  content: "";
  left: -12px;
  position: absolute;
  right: auto;
  border-width: 1px;
}
/* .tree :first-child .el-tree-node:before{
  border-left: none;
} */
.dataShar .el-tree-node:before {
  border-left: 1px dashed #4386c6;
  bottom: 0px;
  height: 100%;
  top: -10px;
  width: 1px;
}
.dataShar .el-tree-node:after {
  border-top: 1px dashed #4386c6;
  height: 20px;
  top: 12px;
  width: 24px;
}
.DZhi .el-tree-node {
    width: 100% !important;
}
.DZhi .el-tree-node__content {
    margin: 0px !important;
    height: 30px !important;
    width: 100%;
    padding-left: 5px !important;
}
.DZhi .el-tree-node:before {
    border-left: 1px dashed #4386c6 !important;
    bottom: 0px !important;
    height: 30px !important;
    top: -15px !important;
    width: 1px !important;
}
.DZhi .el-tree-node:after {
    border-top: 1px dashed #4386c6 !important;
    height: 20px !important;
    top: 15px !important;
    width: 40px !important;
}
.DZhi .el-tree {
    padding: 0 0 0 20px !important;
    width: 100%  !important;
}
.DZhi .el-form-item__content {
    width: 100%  !important;
}
.DZhi .el-form-item {
    width: 100%  !important;
}
</style>