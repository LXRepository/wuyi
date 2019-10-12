{C}<!--  -->
<template>
  <div class="personal"
  v-loading.fullscreen.lock="fullscreenLoading" 
  element-loading-text="wait..."
  element-loading-spinner="el-icon-loading"
  element-loading-background="rgba(0, 0, 0, 0.5)">
    <div class="main">
      <div class="main_left">
        <ul>
          <li v-for="(item,index) in serviceData" :key="index">
            <div class="top">
              <p class="name"><i class="el-icon-edit-outline"></i>    {{item.name}}</p>
            </div>
            <div class="down">
              <p class="time"><i class="iconfont icon-shijian"></i>   {{item.time}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="main_right"></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {getYjml,} from '@/api/getdata'
import {Loading,Message,Table,TableColumn,pagination,Form,FormItem,Input,Button,Tree} from 'element-ui'
import Router from 'vue-router'
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(pagination)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Tree)
Vue.use(Loading)
export default {
  data () {
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
      fullscreenLoading:false,//初始化loading
      fullscreenLoadingSQ:false,//申请loading
      serviceData:[
        {
          name:'铁汉生态技术条件阿尔好人',
          time:'2019-04-18 17:13'
        },
        {
          name:'铁汉生态技术条件阿尔好人',
          time:'2019-04-18 17:13'
        },
        {
          name:'铁汉生态技术条件阿尔好人',
          time:'2019-04-18 17:13'
        },
        {
          name:'铁汉生态技术条件阿尔好人',
          time:'2019-04-18 17:13'
        },
        {
          name:'铁汉生态技术条件阿尔好人',
          time:'2019-04-18 17:13'
        },
        {
          name:'铁汉生态技术条件阿尔好人',
          time:'2019-04-18 17:13'
        },
        {
          name:'铁汉生态技术条件阿尔好人',
          time:'2019-04-18 17:13'
        },
        {
          name:'铁汉生态技术条件阿尔好人',
          time:'2019-04-18 17:13'
        },
        {
          name:'铁汉生态技术条件阿尔好人',
          time:'2019-04-18 17:13'
        },
        {
          name:'铁汉生态技术条件阿尔好人',
          time:'2019-04-18 17:13'
        },
      ],//服务列表
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
  methods: {
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
.personal{
  width: 100%;
  height: 100%;
 // background: #4a577b38;
  border: 4px solid #4a577b38;
  border-radius: 7px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  .main{
    width: 100%;
    height:100% ;
    overflow: scroll;
    .main_left{
      float: left;
      width: 40%;
      height:100% ;
      overflow: scroll;
      ul{
        padding: 3px;
        box-sizing: border-box;
        margin: 0px;
        float: left;
        width: 100%;
        height: auto;
        li{
          background: radial-gradient(ellipse at top left, #818db1 28%, #d1deed 71%);
          height: 80px;
          list-style: none;
          margin: 0px 2px 20px 0px;
          padding:0px 20px;
          border-radius: 7px;
          overflow: hidden;
          //border: 5px solid #4a577b38;
          box-shadow: 10px 10px 10px #fffff000;
          transition: all .3s;
          box-shadow: 1px 5px 5px #4c597d;
          cursor: pointer;
          &:hover{
            //border:5px solid ghostwhite;
            box-shadow: 10px 10px 10px #4c597d;
            transition: all .3s;
          }
          .top{
            width: 100%;
            height: 50%;
            p{
              margin: 0px;
              height: 40px;
              line-height: 40px;
              color:#d7dee6;
              font-size: 17px;
            }
          }
          .down{
            width: 100%;
            height: 50%;
            p{
              margin: 0px;
              height: 40px;
              line-height: 40px;
              color:#4c597d;
              font-size: 17px;
            }
            .time{
              i{
                font-size: 20px;
              }
            }
          }
        }
      }
    }
    .main_right{
      float: left;
      width: 60%;
      height:100% ;
      overflow: scroll;
      background: #b5c5d866;
    }
  } 
}
</style>
<style>
.el-pagination .el-select .el-input .el-input__inner{
    border: 1px solid #fff;
    background: #fff9f900;
}
.el-pagination button:disabled{
  border: 1px solid #fff;
  background: #fff9f900;
}
.el-pagination .btn-next, .el-pagination .btn-prev{
  border: 1px solid #fff;
  background: #fff9f900;
}
.el-pager {
  border: 1px solid #fff;
}
.el-pager li{
  background: #fff9f900;
  height: 26px;
  line-height: 26px;
}
.el-pagination .el-input__inner{
  border: 1px solid #fff;
  background: #fff9f900;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width:100% !important;
}
.serviceShar .el-select{
  width: 100% !important;
}
.serviceShar  .el-form-item__label{
  line-height: 20px !important;
}
</style>