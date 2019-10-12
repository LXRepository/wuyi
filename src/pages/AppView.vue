{C}<!-- style="background:url(/static/img/poster-about.jpg) no-repeat center;background-size: cover;" 
style="background:url(/static/img/poster-drop-animate2.png) repeat-x 0px 0px;background-size: cover;"-->
<template>
  <div class="satic-area" style="background: url(static/img/bbj.jpg) center center;">
		<div class="dynamic-area2" >
        <el-container>
          <el-header  style="background: #394561;height:50px;">
            <div class="header_left">
              <img src="static/img/hb.png" alt="">
              <p>数据资源目录</p>
            </div>
            <div class="header_right">
              <ul>
                <li title="退出" @click="centerDialogVisible = true"><i class="iconfont icon-out"></i></li>
                <!-- <li title="修改密码" @click="changPass">
                  <i class="el-icon-unlock" style="font-size: 30px;position: relative;top: 2px;"></i>
                </li> -->
                <!-- <li title="消息">
                  <el-badge is-dot class="item">
                    <i class="iconfont icon-mess"></i>
                  </el-badge>
                </li> -->
                <li>{{time}}</li>
              </ul>
            </div>
          </el-header>
          <el-container>
            <el-aside width="165px" style="background: url(static/img/hbj.jpg) center center;">
              <ul> 
                <router-link  class="router" :to="{ path: '/serviceSharing' }">
                  <li 
                  @click="activeNumber = 1 "
                  :class="activeNumber == 1 ? 'active':''">
                      <i class="iconfont icon-fuwu"></i>
                      <p>服 务 共 享</p>
                  </li>
                </router-link>
                <router-link  class="router" :to="{ path: '/dataSharing' }">
                  <li 
                  @click="activeNumber = 2 "
                  :class="activeNumber == 2 ? 'active':''">
                      <i class="iconfont icon-dz"></i>
                      <p>数 据 共 享</p>
                  </li>
                </router-link>
                <!-- <router-link  class="router" :to="{ path: '/personalManage/personalManage' }">
                  <li
                  @click="activeNumber = 3 " 
                  :class="activeNumber == 3 ? 'active':''">
                      <i class="iconfont icon-dz"></i>
                      <p>定 制 化 管 理</p>
                  </li>
                </router-link> -->
                <router-link  class="router" :to="{ path: '/applicationManage' }">
                  <li 
                  @click="activeNumber = 4 "
                  :class="activeNumber == 4 ? 'active':''">
                      <i class="iconfont icon-shengqing"></i>
                      <p>申 请 管 理</p>
                  </li>
                </router-link>
                <router-link  class="router" :to="{ path: '/dataDynamics' }">
                  <li 
                  @click="activeNumber = 5 "
                  :class="activeNumber == 5 ? 'active':''">
                      <i class="iconfont icon-dongtai"></i>
                      <p>数 据 动 态</p>
                  </li>
                </router-link>
                <router-link  class="router" :to="{ path: '/monitor' }">
                  <li 
                  @click="activeNumber = 6 "
                  :class="activeNumber == 6 ? 'active':''">
                      <i class="iconfont icon-mulujiankong"></i>
                      <p>目 录 监 控</p>
                  </li>
                </router-link>
                <router-link  class="router" :to="{ path: '/pipelineQuery' }">
                  <li 
                  @click="activeNumber = 7 "
                  :class="activeNumber == 7 ? 'active':''">
                      <i class="iconfont icon-liushuichaxun"></i>
                      <p>流 水 查 询</p>
                  </li>
                </router-link>
              </ul>
            </el-aside>
            <el-main>
              <!-- <transition :name="transitionName"> -->
                 <router-view></router-view>
              <!-- </transition> -->
            </el-main>
          </el-container>
        </el-container>
    </div>
      <el-dialog
        title="消息提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        >
        <span>是否确认退出？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="logout()">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="修改密码" :visible.sync="dialogFormVisible" class="changepass">
        <el-form :model="form">
          <el-form-item label="旧密码：" :label-width="formLabelWidth">
            <el-input v-model="form.pwd" autocomplete="off" :type="isShowPass == true?'text':'password'"></el-input>
            <i v-if="isShowPass == true" class="iconfont icon-eyek eyes" @click="isShowPass = false"></i>
            <i v-else class="iconfont icon-eyeb eyes" @click="isShowPass = true"></i>
          </el-form-item>
          <el-form-item label="新密码：" :label-width="formLabelWidth">
            <el-input v-model="form.newpwd" autocomplete="off" :type="isShowPassNew == true?'text':'password'"></el-input>
            <i v-if="isShowPassNew == true" class="iconfont icon-eyek eyes" @click="isShowPassNew = false"></i>
            <i v-else class="iconfont icon-eyeb eyes" @click="isShowPassNew = true"></i>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="postNewPass">确 定</el-button>
        </div>
      </el-dialog>
	</div>
</template>

<script>
import Vue from 'vue'
import {updatePwd} from '@/api/getdata'
import {Container, Row,Col,Footer,Header, Aside, Main, Menu, Submenu, Badge ,MenuItem, Message,MenuItemGroup,Dialog, Button,Loading} from 'element-ui'
import Router from 'vue-router'
Vue.use(Router)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Badge)
Vue.use(Loading)
Vue.use(Row)
Vue.use(Col)
Vue.use(Footer)
export default {
  data () {
    return {
      transitionName:'',
      time:this.Nowtime(),
      centerDialogVisible:false,//退出
      dialogFormVisible:false,//修改
      activeNumber:1,
      formLabelWidth: '70px',
      form:{
        pwd:'',
        newpwd:''
      },
      isShowPass:false,
      isShowPassNew:false,
    }
  },
  watch: {//使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if(to.meta.index > from.meta.index){
        //设置动画名称
        this.transitionName = 'slide-left';
      }else{
        this.transitionName = 'slide-right';
      }
    }
  },
  created() {
    window.addEventListener("beforeunload", () => {
      let active = this.$route.path == "/serviceSharing" ? '1'
     :this.$route.path == '/dataSharing'? '2'
     :this.$route.path == '/applicationManage'? '4'
     :this.$route.path == '/dataDynamics'? '5'
     :this.$route.path == '/monitor'? '6':'7'
      sessionStorage.setItem("menu", active)
    })
  },
   mounted() {
     this.activeNumber = sessionStorage.getItem("menu")
    var _this = this //声明一个变量指向vue实例this,保证作用域一致
    this.timer = setInterval(function() {
      _this.Nowtime()//修改数据date
    }, 1000)
  },
  methods:{
    // 获取当前时间
    Nowtime:function () {
      //获取年月日
      var time=new Date()
      var year=time.getFullYear()
      var month=time.getMonth()+1
      var day=time.getDate()
      
      //获取时分秒
      var h=time.getHours()
      var m=time.getMinutes()
      var s=time.getSeconds()
      
      //检查是否小于10
      h=this.check(h)
      m=this.check(m)
      s=this.check(s)
      this.time = year+"年"+month+"月"+day+"日  "+h+" : "+m+" : "+s + "  星期" + "日一二三四五六".charAt(new Date().getDay())
    },
    // 检查是否小于10 
    check: function(i){
      var num
      i<10?num="0"+i:num=i
      return num
    },
    // 登出
    logout() {
      this.centerDialogVisible = false
      this.$emit('introduce', {isLogin: false})
      localStorage.clear()
      sessionStorage.clear()
      this.$router.push({path: ''})
    },
    //修改密码弹窗
    changPass(){
      this.form={
        pwd:'',
        newpwd:''
      }
      this.dialogFormVisible = true
    },
    //提交密码
    postNewPass(){
      updatePwd(this.form).then((response) => {
        if (response.data.status == 'success') {
          this.dialogFormVisible = false
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
              Message.error('系统故障！')
          })
          .then(() => {
          })
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)// 在Vue实例销毁前，清除定时器
    }
  }
}

</script>
<style lang="scss" scoped>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all .5s;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-10%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(10%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(10%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-10%, 0, 0);
}
  .header_left{
    width: 40%;
    float: left;
    height: 100%;
    overflow: hidden;
    img{
      width: 41px;
      height: 37px;
      float: left;
      padding: 7px ;
    }
    p{
      float: left;
      margin: 0px;
      height: 50px;
      line-height: 50px;
      //text-shadow: 0px 1px 0px rgb(204, 204, 204), 0px 2px 0px rgb(201, 201, 201), 0px 3px 0px rgb(187, 187, 187), 0px 4px 0px rgb(185, 185, 185), 0px 5px 0px rgb(170, 170, 170), 0px 6px 1px rgba(0, 0, 0, 0.1), 0px 0px 5px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.3), 0px 3px 5px rgba(0, 0, 0, 0.2), 0px 5px 10px rgba(0, 0, 0, 0.25), 0px 0px 0px rgba(0, 0, 0, 0.15);
      color: #dddddf;
      font-family: 'League Gothic',Impact,sans-serif;
      letter-spacing: 0.02em;
      text-align: center;
      font-size: 25px;
    }
  }
  .header_right{
    width: 60%;
    height: 100%;
    float: left;
    ul{
      float: right;
      height: 100%;
      margin: 0px;
      li{
        float: right;
        list-style: none;
        padding: 0 20px;
        line-height: 50px;
        font-weight: normal;
        color: #dddddf;
        font-size: 16px;
        i{
          font-size: 25px;
          font-weight: normal;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
  .el-aside{
    display: flex;
    z-index: 9;
    justify-content:center;
    align-items:Center;
    box-sizing: border-box;
    .router{
      float: left;
      width: 100%;
      height: 16.6%;
      min-height: 100px;
    }
    ul{
      float: left;
      height: 100%;
      width: 100%;
      margin: 0px;
      padding:10px;
      box-sizing: border-box;
      .active{
        background: #f2f2f3;
        box-shadow: inset 0px 0px 5px 1px #4f5c80;
      }
      li{
        border-radius:10px; 
        margin: 13px auto;
        list-style: none;
        width: 100%;
        height: 100px;
        position: relative;
        cursor: pointer;
        background: #ffffff00;
        transition: all .5s;
        -webkit-transform:all .5s;
        &:hover{ 
           background: #f2f2f3;
           box-shadow: inset 0px 0px 5px 1px #4f5c80;
        }
        i{
          font-size: 60px;
          margin-left: 26%;
          margin-top: 5px; 
          position: absolute;
          width: 60px;
          height: 60px;
          padding: 5px;
          border-radius: 10px;
          color: #4a577bfc;
          font-family:Microsoft YaHei;
          border: 1px solid #4a577b38;
        }
        p{
          margin: 0px;
          position: absolute;
          bottom: 2px;
          width: 100%;
          height: 20px;
          color: #4a577bfc;
          font-size: 13px;
          text-align: center;
        }
      }
    }
  }
</style>
<style lang='scss'>
.el-container{
  width: 100%;
  height: 100%;
}
.el-header{
  overflow: hidden;
  padding: 0px;  
  .el-badge__content.is-fixed {
    position: absolute;
    top: 18px !important;
  }
}
.el-aside{
  height: 100%;
  overflow: auto;
}
.el-main{
  padding: 10px !important;
}
</style>
<style >
.el-cascader-menu{
  min-height: 35px !important;
}
.satic-area {
  position: relative;
  width: 100%;
  height: 100%;
  /* background: url(/static/img/poster-about.jpg) no-repeat center;
  background-size: cover; */
}
.satic-area .el-dialog{
  width: 30% !important;
}
.satic-area .el-input {
    width: 100% !important;
}
.changepass i{
  cursor: pointer;
}
.dynamic-area2   {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  /* background: url(/static/img/poster-drop-animate1.png) repeat-x 0px 0px;
  background-size: cover; */
  animation: posterDrop2 8000s linear infinite;
}

@keyframes posterDrop2 {
  from { background-position: 0 0; }
  to { background-position: 20000% 0; }
}
  ::-webkit-scrollbar {
  width: 7px;
  height: 8px;
  background:rgba(0, 0, 0, 0);
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
  border-radius: 7px;
  background-color: #4a577bfc;
  }
  ::-webkit-scrollbar-corner {
    background: #ff000000;
  }
</style>
