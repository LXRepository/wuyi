{C}<!--  -->
<template>
  <div class="satic-area" style="background:url(/static/img/poster-about.jpg) no-repeat center;background-size: cover;">
		<div class="dynamic-area2" style="background:url(/static/img/poster-drop-animate2.png) repeat-x 0px 0px;background-size: cover;">
            <div class='login'>
           <p class="system"><img src="static/img/hb.png" alt="">数 据 资 源 目 录 
            </p>
            <div class="loginForm">
                <!-- <input type="text" class="name" 
                onfocus="this.value = '';" 
                onblur="if (this.value == '') {this.value = '用户名';}" 
                required> -->
                <input type="text" class="name" :value="username" 
                disabled>
                <input type="password" class="pass"  v-model="password"
                required>
                <input class="button" type="submit" @click="login()" value="登录">
                <!-- <button class="login">登录</button> -->
            </div>
           <div class="aboutUs">
                <h5>版权所有：四川省高级人民法院 /</h5>
                <h5>建议浏览器：360、谷歌、Firefox /</h5>
                <h5>技术支持：四川智诚汇通信息技术有限公司</h5>
            </div>
            </div>
    </div>
	</div>
</template>

<script>
import Vue from 'vue'
import {Login,updatePwd} from '@/api/getdata'
import {Loading, Message} from 'element-ui'
export default {
    name: 'loginPage',
    data () {
        return {
        activeNumber:1,
        username:'',
        password:'',
        }
    },
  watch: {
  },
   mounted() {
  },
  methods:{
    // 重置
    resetit(){
      //this.username = '',
      this.password = ''
    },
    // 登录
    login(){
        // sessionStorage.setItem('islogin', 'islogin')
        //  this.$emit('introduce', {isLogin: true})
      if (this.password == '') {
        Message.error("请填写完整信息！")
      } else{
        Login(this.password,this.username).then((response) => {
            if (response.data.status == 'success') {
                this.$emit('introduce', {isLogin: true})
                sessionStorage.setItem('islogin', 'islogin')
                this.password = ''
            }
            else if (response.data.status == 'error'){
                Message.error(response.data.msg)
            } 
        })
            .catch((response) => {
                Message.error('系统故障！')
            })
            .then(() => {
            })
      }
    }
  }
}

</script>
<style lang="scss" scoped>
.login{
    width: 100%;
    height: 100%;
    //background:linear-gradient(0deg, #1a208ee8, #cdebe9);
    //padding: 80px 40px;
    box-sizing: border-box;
    text-align: center;
    position: relative;
    .system{
        width: 100%;
        height: 123px;
        overflow: hidden;
        color: #6270b2;
        //margin: 10px 0;
        font-size: 50px;
        font-weight: bolder;
        font-family:Microsoft YaHei;
        position: absolute;
        box-sizing: border-box;
        img{
            width: 94px;
            height: 90px;
            position: relative;
            left: -15px;
            top: 22px;
        }
    }
     .aboutUs{
        width: 100%;
        position: absolute;
        bottom: 0px;
        h5{
           display: inline-block;
            margin: 0px;
            color: #6270b2;
            font-weight: normal;
        }
    }
    .loginForm{
        border-radius: 10px;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 54%);
        width: 550px;
        height: 50%;
        //background: #fff;
        box-sizing: border-box;
        input{
            border-radius: 5px;
            text-align: center;
            width: 100%;
            height: 40px;
            margin:20px 0;
            outline: none;
            border: 1px solid #FFF;
            background: #ffffff59;
            font-size: 1em;
            font-weight: bold;
            color: #6270b2;
        }
        .button{
            margin-top: 20px;
            width: 100%;
            height: 45px;
            border-radius: 5px;
            cursor: pointer;
            background: #fff;
        }
        .button:hover{
            background: #ffffff59;
        }
    }
}
</style>
<style lang='scss'>
</style>
<style >
.satic-area {
  position: relative;
  width: 100%;
  height: 100%;
  /* background: url(/static/img/poster-about.jpg) no-repeat center;
  background-size: cover; */
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
</style>
