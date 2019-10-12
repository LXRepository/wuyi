{C}<!--  -->
<template>
  <div class="Manage"
  v-loading.fullscreen.lock="fullscreenLoading" 
  element-loading-text="wait..."
  element-loading-spinner="el-icon-loading"
  element-loading-background="rgba(0, 0, 0, 0.5)">
    <div class="totle" >
      <el-radio-group v-model="radio" @change = 'changeStatus'>
        <el-radio-button :label="0">全部</el-radio-button>
        <el-radio-button :label="1">已提交未审核</el-radio-button>
        <el-radio-button :label="2">已提交未发布</el-radio-button>
        <el-radio-button :label="3">已发布</el-radio-button>
        <el-radio-button :label="4">已拒绝</el-radio-button>
      </el-radio-group>
    </div>
    <div class="main">
      <div v-if="manageData.length == 0" class="noData">暂无数据</div>
      <ul v-if="manageData.length != 0">
        <li v-for="item in manageData" :key="item.cTreeid">
          <div class="mess">
            <div class="mess_top">
                <div 
                    class="left" 
                    :id="item.ROW_ID" >
                      {{item.NSTATUS == 1 ? '已提交未审核':item.NSTATUS == 2 ?'已提交未发布':item.NSTATUS == 3 ?'已发布':'已拒绝'}}
                </div>
            </div>
            <div class="mess_down">
              <p class="message" :title="item.CNAME">申请服务:  {{item.CNAME}}</p>
              <p class="message" :title="item.CENDDATE">申请时间:  {{item.CENDDATE}}</p>
              <p class="message" :title="item.CDEPT">申请部门: {{item.CDEPT}}</p>
              <p class="message" :title="item.CSYSNAME">接入系统: {{item.CSYSNAME}}</p>
              <p class="message" :title="item.CSCOPE">使用范围:  {{item.CSCOPE}}</p>
              <p class="message" :title="item.CSPECTACLE">使用场景:  {{item.CSPECTACLE}}</p>
              <p class="message" :title="item.CLEADNAME">负责人: {{item.CLEADNAME}}</p>
              <p class="message" :title="item.CTELNUM">联系电话: {{item.CTELNUM}}</p>
            </div>
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
        :page-sizes="[6,12,18,24,30,36,42]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        v-if="total>=6"
        >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Vue from 'vue'
import {getSelfCatalogList,getSelfCatalogListByStatus} from '@/api/getdata'
import {Loading,RadioGroup,RadioButton,Message,Table,TableColumn,pagination,Form,FormItem,Input,Button,Select,Option,DatePicker,TimePicker,Col,} from 'element-ui'
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
Vue.use(RadioGroup)
Vue.use(RadioButton)
export default {
  data () {
    return {
      currentPage: 1, // 当前页数
      pagesize: 6, //每一页显示条数
      total: 1, //总条数
      radio:0,//状态
      fullscreenLoading:true,//初始化loading
      fullscreenLoadingSQ:false,//申请loading
      manageData:{},//服务列表
      url:'',//下载文件地址
    };
  },
  watch: {
  },
  created () {
    this.getAlllist()
    
  },
  mounted() {
  },
  methods: {
    // 获取服务列表
    getAlllist(){
      this.fullscreenLoading = true
      getSelfCatalogList(this.currentPage, this.pagesize).then((response) => {
        this.manageData = response.data.rows
         this.fullscreenLoading = false
         this.total = response.data.total
      })
        .catch((response) => {
          this.fullscreenLoading = false
          Message.error('服务异常')
        })
        .then(() => {
        })
    },
    //改变状态
    changeStatus(label){
      this.fullscreenLoading = true
      if (label == 0) {
        this.getAlllist()
      } else {
        getSelfCatalogListByStatus(this.currentPage, this.pagesize,label).then((response) => {
          this.manageData = response.data.rows
          this.fullscreenLoading = false
          this.total = response.data.total
        })
          .catch((response) => {
            this.fullscreenLoading = false
            Message.error('服务异常')
          })
          .then(() => {
          })
      }
      
    },
    //下载说明
    handleClick(row) {
      this.url = getInstructions(this.treeid)
    },
    //改变每一页显示多少条
    handleSizeChange(val) {
        this.pagesize = val
        this.getAlllist()
    },
    //改变当前页数
    handleCurrentChange(val) {
        this.currentPage = val
        this.getAlllist()
    }
  }
}

</script>
<style lang='scss' scoped>
.Manage{
  width: 100%;
  height: 100%;
  //background: #4a577b38;
  border-radius: 5px;
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
    border: 10px double #1772B5;
    width: 45%;
    height: 76%;
    z-index: 99;
    .message{
      width: 100%;
      height: 7%;
      text-align: center;
      line-height: 30px;
      color: #fff;
      background: #1772B5;
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
  .totle{
    width: 100%;
    height: auto;
    overflow: hidden;
    float: left;
    border-radius: 4px;
  }
  .main{
    float: left;
    width: 100%;
    overflow: scroll;
    .noData{
      width: 100%;
      height: 100px;
      line-height: 100px;
      text-align: center;
      color: #777f90;
    }
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
        padding: 15px 10px 15px;
        width: 33.3%;
        height: 240px;
        float: left;
        list-style: none;
        -webkit-box-sizing: border-box;
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
            //border:5px solid #4a577bfc;
           box-shadow: 9px 12px 10px #2a4f6fa3;
          }
          .mess_top{
             width: 100%;
             overflow: hidden;
            // background: red;
              .left{
                float: left;
                width: 100%;
                height: 35px;
                line-height: 35px;
                color: #fff;
                background: #70a9daa6 !important;
                //background: radial-gradient(ellipse at top left, #1772B5 0%, #b6e1ff  57%);
                border-radius: 2px;
                text-align: left;
                font-size: 22px;
                padding: 0 0 0 10px;
                box-sizing: border-box;
                cursor: pointer;
              }
              .left_2{
                float: left;
                width: 15%;
                height: 50px;
                line-height: 48px;
                color: #fff;
                background: radial-gradient(ellipse at top left, #ffffff 0%, #25BED5 57%);
                border-radius: 5px;
                text-align: center;
                font-size: 40px;
                cursor: pointer;
              }
              .right{
                float: left;
                width: 85%;
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
             height: 165px;
             overflow: scroll;
             p{
               width: 50%;
               float: left;
               height: 26px;
               overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
               margin: 13px 0px 0 0;
               font-size: 14px;
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
    position: absolute;
    bottom: 0px;
    //background: red;
  }
}
</style>
<style>
.Manage .el-pagination .el-select .el-input .el-input__inner{
    border: 0px solid #fff;
    background: #fff9f900;
}
.Manage .el-pagination button:disabled{
  border: 0px solid #fff;
  background: #fff9f900;
}
.Manage .el-pagination .btn-next, .el-pagination .btn-prev{
  border: 0px solid #fff;
  background: #fff9f900;
}
.Manage .el-pager {
  border: 0px solid #fff;
}
.Manage .el-pager li{
  background: #fff9f900;
  height: 26px;
  line-height: 26px;
}
.Manage .el-pagination .el-input__inner{
  border: 0px solid #fff;
  background: #fff9f900;
}
.Manage .el-date-editor.el-input, .el-date-editor.el-input__inner{
  width:100% !important;
}
.Manage .el-select{
  width: 100% !important;
}
.Manage  .el-form-item__label{
  line-height: 20px !important;
}
.Manage .el-radio-group{
  width: 100% !important;
}
.Manage .el-radio-button, .el-radio-button__inner {
    width: 20% !important;
}
.Manage .el-radio-button__inner{
  width: 100% !important;
  color: #fff !important;
  background: #8f95a3 !important;
  border-color: #fff !important;
}
.Manage .el-radio-button__orig-radio:checked+.el-radio-button__inner {
    color: #8E94A2 !important;
    background: #fff !important;
    /* background: radial-gradient(ellipse at top left, #1772B5 0%, #b6e1ff 57%) !important; */
    border-color: #fff !important;
    -webkit-box-shadow: -1px 0 0 0 #fff;
    box-shadow: -1px 0 0 0 #fff;
}
</style>
