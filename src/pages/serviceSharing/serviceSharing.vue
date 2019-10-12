{C}<!--  -->
<template>
  <div class="serviceShar"
  v-loading.fullscreen.lock="fullscreenLoading" 
  element-loading-text="wait..."
  element-loading-spinner="el-icon-loading"
  element-loading-background="rgba(0, 0, 0, 0.5)">
  <div class="shenForm" :style="shenSTY" >
    <p class="message">{{formTitle}}
      <i class="close el-icon-close" @click="closeShen"> </i>
    </p>
    <el-table
      v-if="formTitle == '详细信息'"
      :show-header='false'
      :data="tableData"
      border
      style="width: 100%;height:93%;overflow:scroll;">
      <el-table-column
        align="center"
        prop="date"
        width="150">
      </el-table-column>
       <el-table-column align="center">
        <template slot-scope="scope">
          <el-button 
          v-if="scope.row.name == '点击下载'"
          @click="handleClick(scope.row)" type="text" size="small">
            <a  :href="url" download="filename">点击下载</a>
          </el-button>
          <a v-else> {{scope.row.name}}</a>
        </template>
      </el-table-column>
    </el-table>
    <el-form  v-else ref="form" :model="form" :rules="rules"  label-width="110px"  style="padding:20px;height:93%;overflow:scroll;">
      <el-form-item label="申请服务">
        <p style="margin:0px;line-height:20px;color: #1772B5;">{{serverName}}</p>
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
       <el-form-item label="请求时间段">
          <el-time-picker
            is-range
            value-format="HH:mm:ss"
            v-model="form.cQeqdate"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择服务请求时间范围">
          </el-time-picker>
      </el-form-item>
      <el-form-item label="请求IP" prop="cQeqip">
          <el-input   
          resize='none'
          placeholder="IP可填写多个，请以逗号分隔！"
          type="textarea"
          :rows="2" 
          v-model="form.cQeqip"/>
      </el-form-item>
      <el-form-item  :label="'上传文档'+'pdf.doc.docx'"  prop="bDocument">
        <el-input  
          placeholder="上传服务文档！"
          accept="application/msword, 
          application/vnd.openxmlformats-officedocument.wordprocessingml.document, 
          application/pdf" 
          type="file" autocomplete="off" ref='input' class="input" v-model="form.bDocument"></el-input>
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
    <div class="totls">
      <input 
      type="search" placeholder="输入服务名称搜索服务" v-model="searchvalue">
      <button class="search" @click="search"><i class="el-icon-search"></i>搜索</button>
      <!-- <button :style="indentSTY"><i  :class="searchClick == true ? 'iconfont icon-xiala':'iconfont icon-sousuo'"></i></button>
      <input type="text" 
      @keyup.enter="search()"
      v-model="searchvalue"
      @focus="searchClick = true" 
      @blur="searchClick = false"
      placeholder="输入服务名称搜索服务..."> -->
    </div>
    <div class="main">
      <ul>
        <li v-for="(item,index) in serviceData" :key="item.cTreeid">
          <div class="mess">
            <div class="mess_top">
                <div 
                    :title="item.cTreeid"
                    class="left" 
                    :id="index+1" 
                    @click="shenBox">
                      详情
                </div>
                <div 
                    v-if="item.nApplicationStatus== '0'"
                    :title="item.cTreeid"
                    class="left_2" 
                    :id="index+1" 
                    @click="shenQbox">
                    申请
                </div>
                <div class="right">
                  <p :title="item.cName" class="title">{{item.cName}}</p>
                  <p class="UpdateTime"><i class="iconfont icon-shijian"></i>{{item.dUpdate}}</p>
                </div>
            </div>
            <div class="mess_down">
              <p class="company">发布单位: {{item.cPublishDept}}</p>
              <p class="desc" :title="item.cDesc">服务说明: {{item.cDesc}}</p>
              <p class="fanwei" :title="item.cSerScop">服务范围: {{item.cSerScop}}</p>
              <p class="fanwei" :title="item.fys">已使用法院: {{item.fys}}</p>
            </div>
            <div class="right"></div>
          </div>
        </li>
      </ul>
    </div>
    <div class="footer">
      <el-pagination
      style="text-align:center;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[9,18,27,36,45,54,63]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          v-if="total>9"
          >
        </el-pagination>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Vue from 'vue'
import {getCatalogList,getCatalogInfo,getInstructions,applicationCatalog,queryCatalog} from '@/api/getdata'
import {Loading,Message,Table,TableColumn,pagination,Form,FormItem,Input,Button,Select,Option,DatePicker,TimePicker,Col,} from 'element-ui'
import Router from 'vue-router'
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(pagination)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Col)
Vue.use(Select)
export default {
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
      } else if (type === 'doc'|| type === 'docx' || type === 'pdf') {
        callback()
      } else {
        callback(new Error('文件格式有误！'))
      }
    }
    return {
      searchClick:false,
      searchvalue:'',//搜索值
      isSearch:true,//是否是搜索
      scurrentPage: 1, // 搜索的当前页数
      spagesize: 9, //搜索的每一页显示条数
      currentPage: 1, // 当前页数
      pagesize: 9, //每一页显示条数
      total: 1, //总条数
      indentSTY:{},//点击转换i样式
      totleSTY:{},//点击转换totle样式
      shenSTY:{},//申请form样式
      fullscreenLoading:true,//初始化loading
      fullscreenLoadingSQ:false,//申请loading
      serviceData:{},//服务列表
      tableData: [{
         date: '服务名称',
            name: ' ',
          },{
            date: '服务期限',
            name: ' ',
          },{
            date: '更新频率',
            name: ' ',
          },{
            date: '数据范围',
            name: ' ',
          },{
            date: '使用说明',
            name: ' ',
          },{
            date: '接入对象量',
            name: '',
          },{
            date: '服务方式',
            name: '',
          },{
            date: '信息资源类型',
            name:  '',
          },{
            date: '服务类型',
            name: ' ',
        } ],
      shenFormSt:'',//申请表单样式
      treeid:'',//详情id
      url:'',//下载文件地址
      formTitle:'',//表单标题
      form: {//申请表单
        cTreeid:'',                 //服务id	
        cSysName:'',                // 接入系统名字
        cDept:'',                   //申请部门
        cLeadName:'',               //负责人
        cTelNum:'',                 //联系电话
        cEndDate:'',                //使用截止日期
        cCallTimes:'',              //平均每日调用次数
        cScope:'',                  //适用范围
        cSpectacle:'',              //使用场景
        cQeqdate:'',                //请求时间段
        cQeqip :'',                 //请求ip
        bDocument:''                // 文件证明  文件格式只支持pdf、jpg、png
      },
      serverName:'',//表单要显示的服务名称
       rules: {
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
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        cScope: [
          { required: true, message: '请输入适用范围！', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        cSpectacle: [
          { required: true, message: '请输入使用场景！', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        cQeqdate: [
          { required: false, message: '', trigger: 'blur' },
        ],
        cQeqip : [
          { required: true, message: "请输入请求IP！", trigger: "blur" },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        bDocument: [
          { required: true,  trigger: 'blur',validator: validfile },
        ],
      },
    };
  },
  watch: {
     'searchClick': {
      handler (val, oldVal) {
        let wd = ''
        let bt = ''
        if(val==false){
          wd = 'rotate(0deg)'
          bt = '2px solid #ffffff00'
        }else{
          wd = 'rotate(90deg)'
          bt = '2px solid #4a577bfc'
        }
        let BTsty = {
          transform:wd,
          transition: 'all .3s'
        }
        this.indentSTY = BTsty
        let Tsty = {
          borderBottom:bt,
          transition: 'all .3s'
        }
        this.totleSTY = Tsty
      },
      deep:true,
      immediate: true
    }
  },
  created () {
    this.getAlllist()
    
  },
  mounted() {
  },
  methods: {
    //电话正则
    isvalidPhone(str) {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
      return reg.test(str)
    },
    // 获取服务列表
    getAlllist(){
      this.isSearch = false
      this.fullscreenLoading = true
      getCatalogList(this.currentPage, this.pagesize).then((response) => {
        this.serviceData = response.data.rows
        this.fullscreenLoading = false
        this.total = response.data.total
        this.serviceData.forEach(function (value, index, array) {
          if ( value.dUpdate !== '' &&  value.dUpdate !== null) {
            value.dUpdate = new Date( value.dUpdate)
            value.dUpdate =  value.dUpdate.getFullYear() + "-"
            + ( value.dUpdate.getMonth() + 1) + "-" 
            +  value.dUpdate.getDate() + " " 
            +  value.dUpdate.getHours() + ":"
            +  value.dUpdate.getMinutes() + ":"
            +  value.dUpdate.getSeconds()
          }
          let fys = []
          if ( value.fyList != []) {
            value.fyList.forEach(function (value, index, array) {
              fys.push(value.CFYNAME)
            })
          }
          value.fys = fys.toString()
        })
        
      })
        .catch((response) => {
          this.fullscreenLoading = false
          Message.error('服务异常')
        })
        .then(() => {
        })
    },
    //点击展开详情单
    shenBox(e){
      this.formTitle="详细信息"
      this.treeid = e.target.title
      let wd = 'block'
      let top = e.clientY
      let right = e.clientX
      let BTsty = {
        left: '25%',
        top:100+ 'px',
        display:wd,
      }
      this.shenSTY = BTsty
      this.getInfo()
    },
    //申请表单展开
    shenQbox(e){
      this.serverName = e.target.parentElement.childNodes[2].firstChild.innerText
      this.formTitle="申请信息"
      this.treeid = e.target.title
      this.treeid = e.target.title
      let wd = 'block'
      let top = e.clientY
      let right = e.clientX
      let BTsty = {
        left: '25%',
        top:100+ 'px',
        display:wd,
      }
      this.shenSTY = BTsty
    },
    //获取详情数据
    getInfo(){
      this.tableData= [{
          date: '服务名称',
            name: ' ',
          },{
            date: '服务期限',
            name: ' ',
          },{
            date: '更新频率',
            name: ' ',
          },{
            date: '数据范围',
            name: ' ',
          },{
            date: '使用说明',
            name: ' ',
          },{
            date: '接入对象量',
            name: '',
          },{
            date: '服务方式',
            name: '',
          },{
            date: '信息资源类型',
            name:  '',
          },{
            date: '服务类型',
            name: ' ',
        } ],
      getCatalogInfo(this.treeid).then((response) => {
        let data = response.data
        //if (data.nPublishType == 1) {
          this. tableData= [{
            date: '服务名称',
            name: data.cName,
          },{
            date: '服务期限',
            name: data.cSerTerm,
          },{
            date: '更新频率',
            name: data.cSerUpdRate,
          },{
            date: '数据范围',
            name: data.cDataScop,
          },{
            date: '使用说明',
            name: '点击下载',
          },{
            date: '接入对象量',
            name: data.nObjNum,
          },{
            date: '服务方式',
            name: data.nPublishType == 0?'数据目录':'接口',
          },{
            date: '信息资源类型',
            name: data.cInfoType,
          },{
            date: '服务类型',
            name: data.cSerType,
          }]
       // } else {
        //   this. tableData= [{
        //     date: '服务名称',
        //     name: data.cName,
        //   },{
        //     date: '服务期限',
        //     name: data.cSerTerm,
        //   },{
        //     date: '更新频率',
        //     name: data.cSerUpdRate,
        //   },{
        //     date: '数据范围',
        //     name: data.cDataScop,
        //   },{
        //     date: '接入对象量',
        //     name: data.nObjNum,
        //   },{
        //     date: '服务方式',
        //     name: data.nPublishType == 0?'数据目录':'接口',
        //   },{
        //     date: '信息资源类型',
        //     name: data.cInfoType,
        //   },{
        //     date: '服务类型',
        //     name: data.cSerType,
        //   }]
        // }

      })
        .catch((response) => {
          this.fullscreenLoading = false
          Message.error('服务异常')
        })
        .then(() => {
        })
    },
    //关闭详情列表
    closeShen(){
      let BTsty = {
        display:'none',
      }
      this.shenSTY = BTsty
      if (this.formTitle == '申请信息') {
        this.$refs['form'].resetFields()
        this.form={//申请表单清空
          cTreeid:'',                 //服务id	
          cSysName:'',                // 接入系统名字
          cDept:'',                   //申请部门
          cLeadName:'',               //负责人
          cTelNum:'',                 //联系电话
          cEndDate:'',                //使用截止日期
          cCallTimes:'',              //平均每日调用次数
          cScope:'',                  //适用范围
          cSpectacle:'',              //使用场景
          cQeqdate:'',                //请求时间段
          cQeqip :'',                 //请求ip
          bDocument:''                // 文件证明  文件格式只支持pdf、jpg、png
        }
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
        let ip = this.$refs.input.$refs.input
        let date = this.form.cEndDate.getFullYear() + 
            '-' +( (this.form.cEndDate.getMonth() + 1)<10?'0'+(this.form.cEndDate.getMonth() + 1):(this.form.cEndDate.getMonth() + 1) )+ 
            '-' +( (this.form.cEndDate.getDate())<10?'0'+(this.form.cEndDate.getDate()):(this.form.cEndDate.getDate()) )
        let formdata = new FormData()
        formdata.append("bDocument", ip.files[0])
        formdata.append("cTreeid", this.treeid)
        formdata.append("cSysName",  this.form.cSysName)
        formdata.append("cDept",  this.form.cDept)
        formdata.append("cLeadName",  this.form.cLeadName)
        formdata.append("cTelNum",  this.form.cTelNum)
        formdata.append("cEndDate",  date)
        formdata.append("cCallTimes",  this.form.cCallTimes)
        formdata.append("cScope",  this.form.cScope)
        formdata.append("cSpectacle",  this.form.cSpectacle)
        formdata.append("cQeqip",  this.form.cQeqip)
        formdata.append("cQeqdate",  this.form.cQeqdate)
        let that = this
          this.$axios
            .post(applicationCatalog(), formdata, {
                  headers: { "Content-Type": "multipart/form-data" }
            })
            .then(res => {
                  that.fullscreenLoadingSQ = false
                  if (res.data.status == 'success') {
                       Message.success(res.data.msg)
                       that.closeShen()
                       that.getAlllist()
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
    //下载说明
    handleClick(row) {
      this.url = getInstructions(this.treeid)
    },
    //模糊搜索
    search(){
      this.isSearch = true
      this.fullscreenLoading = true
     queryCatalog(this.scurrentPage, this.spagesize,this.searchvalue).then((response) => {
        this.serviceData = response.data.rows
        this.fullscreenLoading = false
        this.total = response.data.total
        this.serviceData.forEach(function (value, index, array) {
          if ( value.dUpdate !== '' &&  value.dUpdate !== null) {
            value.dUpdate = new Date( value.dUpdate)
            value.dUpdate =  value.dUpdate.getFullYear() + "-"
            + ( value.dUpdate.getMonth() + 1) + "-" 
            +  value.dUpdate.getDate() + " " 
            +  value.dUpdate.getHours() + ":"
            +  value.dUpdate.getMinutes() + ":"
            +  value.dUpdate.getSeconds()
          }
          let fys = []
          if ( value.fyList != []) {
            value.fyList.forEach(function (value, index, array) {
              fys.push(value.CFYNAME)
            })
          }
          value.fys = fys.toString()
        })
      })
        .catch((response) => {
          this.fullscreenLoading = false
          Message.error('服务异常')
        })
        .then(() => {
        })
    },
    //改变每一页显示多少条
    handleSizeChange(val) {
      if (this.isSearch == true) {
        this.spagesize = val
        this.search()
      } else {
        this.pagesize = val
        this.getAlllist()
      }
    },
    //改变当前页数
    handleCurrentChange(val) {
       if (this.isSearch == true) {
        this.scurrentPage = val
        this.search()
      } else {
        this.currentPage = val
        this.getAlllist()
      }
    }
  }
}

</script>
<style lang='scss' scoped>
.serviceShar{
  width: 100%;
  height: 100%;
  //background: #4a577b38;
  border-radius: 20px;
  padding:0px 10px 10px 10px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  .shenForm{
    padding: 0px;
    box-sizing: border-box;
    display: none;
    position: absolute;
    background: #fff;
    overflow: hidden;
    border: 10px double #9096a4;
    height: 76%;
    width:500px;
    z-index: 99;
    .message{
      width: 100%;
      height: 7%;
      text-align: center;
      line-height: 30px;
      color: #fff;
      background: #9096a4;
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
  .totls{
    width: 100%;
    float: left;
    margin-bottom: 10px;
    input {
      padding: 0 10px;
      font-size: 12px;
      color: #9198a8;
      width: 200px;
      float: left;
      height: 28px;
      outline: none;
      border-radius: 4px;
      border: 1px solid #afafb4;
      margin-right: 5px;
    }
    button {
      width: 70px;
      height: 28px;
      float: left;
      margin-right: 10px;
      border-radius: 4px;
      border: 1px solid #afafb4;
      outline: none;
      color: #fff;
      i {
        padding-right: 5px;
      }
    }
    .search {
      background: #87d78e;
      cursor: pointer;
      &:hover {
        background: #66de72;
      }
    }
  }
  .main{
    float: left;
    width: 100%;
    height:88% ;
    overflow: scroll;
    ul{
      float: left;
      width: 100%;
      height: auto;
      margin: 0px;
      padding: 0px;
      // li:nth-child(3n){
      //   padding-left: 0px;
      // }
      li:nth-child(1){
        padding-left: 0px;
        padding-right: 20px;
      }
      li:nth-child(4){
        padding-left: 0px;
        padding-right: 20px;
      }
      li:nth-child(7){
        padding-left: 0px;
        padding-right: 20px;
      }
      li:nth-child(3){
        padding-right: 2px;
        padding-left: 20px;
      }
      li:nth-child(6){
        padding-right: 2px;
        padding-left: 20px;
      }
      li:nth-child(9){
        padding-right: 2px;
        padding-left: 20px;
      }
      li{
        padding:2px 10px 30px;
        width: 33.3%;
        height: 235px;
        float: left;
        list-style: none;
        box-sizing: border-box;
        .mess{
          width: 100%;
          height: 100%;
          border-radius: 5px;
          background: #fff;
          padding: 5px;
          overflow: hidden;
          box-sizing: border-box;
          border:5px solid #fff;
          transition: all .3s;
          &:hover{
           // border:5px solid #4a577bfc;
           box-shadow: 9px 12px 10px #9096a4;
          }
          .mess_top{
             width: 100%;
             height: 50px;
             overflow: hidden;
            // background: red;
              .left{
                float: right;
                width: 20%;
                height: 25px;
                line-height: 25px;
                color: #fff;
                background: #87d78e !important;
                border-radius: 5px;
                text-align: center;
                font-size: 12px;
                cursor: pointer;
              }
              .left_2{
                float: right;
                margin-right: 10px;
                width: 20%;
                height: 25px;
                line-height: 25px;
                color: #fff;
                background: #93a2bf !important;
                border-radius: 5px;
                text-align: center;
                font-size: 12px;
                cursor: pointer;
              }
              .right{
                float: left;
                width: 80%;
                height: 50px;
                //background: red;
                padding: 0 10px;
                box-sizing: border-box;
                .title{
                  color: #3883bc;
                  font-weight: 700;
                  float: left;
                  width: 100%;
                  overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
                  margin: 0px;
                  line-height: 30px;
                  font-family:Microsoft YaHei;
                }
                .UpdateTime{
                  float: left;
                  width: 100%;
                  margin: 0px;
                  font-size: 12px;
                  font-family:Microsoft YaHei;
                  line-height: 12px;
                  color: #3b85bd;
                  i{
                    font-size: 20px;
                    position: relative;
                    top:2px;
                    left: -4px;
                  }
                }
              }
          }
          .mess_down{
             width: 100%;
             height: 125px;
             p{
               width: 100%;
               height: 27px;
               overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
               margin: 7px 0px 0 0;
               font-size: 13px;
               color: #606266;
             }
          }
        }
      }
    }
  }
  .footer{
    float: left;
    width: 100%;
    height:7% ;
    //background: red;
  }
}
</style>
<style>
.serviceShar .el-pagination {
  background: #fff;
}
.serviceShar .el-pagination .el-select .el-input .el-input__inner{
    border: 1px solid #fff;
    background: #fff9f900;
}
.serviceShar .el-pagination button:disabled{
  border: 1px solid #fff;
  background: #fff9f900;
}
.serviceShar .el-pagination .btn-next, .el-pagination .btn-prev{
  border: 1px solid #fff;
  background: #fff9f900;
}
.serviceShar .el-pager {
  border: 1px solid #fff;
}
.serviceShar .el-pager li{
  background: #fff9f900;
  height: 26px;
  line-height: 26px;
}
.serviceShar .el-pagination .el-input__inner{
  border: 1px solid #fff;
  background: #fff9f900;
}
.serviceShar .el-date-editor.el-input, .el-date-editor.el-input__inner{
  width:100% !important;
}
.serviceShar .el-select{
  width: 100% !important;
}
.serviceShar  .el-form-item__label{
  line-height: 20px !important;
}
</style>
