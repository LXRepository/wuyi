<template>
  <div id="app"  style="height:100%;width:100%;"
 >
      <loginPage v-if="!isLogin" @introduce="loginin"></loginPage>
      <AppView v-if="isLogin"  @introduce="logout"></AppView>
      <!-- <AppView  @introduce="logout"></AppView> -->
  </div>
</template>

<script>
import $ from 'jquery'
 import loginPage from '@/pages/loginPageDD'
 import AppView from '@/pages/AppView'
export default {
  name: 'App',
  data () {
    return {
       isLogin:  sessionStorage.getItem('islogin') === 'islogin',
    }
  },
  watch: {
     $route(to,from){
        if (to.name == 'loginpage') {
          this.$router.push({path: '/'})
        }
        if (this.isLogin == false) {
          this.$router.push({path: '/'})
        }
     }
  },
  // created() {
  //   window.addEventListener("beforeunload", () => {
  //      alert('0')
  //     sessionStorage.setItem("menu", JSON.stringify(this.$route.path))
  //   })
  // },
  methods: {
    loginin (opt) {
      this.isLogin = opt.isLogin
    },
    logout (opt) {
      this.isLogin = opt.isLogin
    },
  },
  components: {
    loginPage,
    AppView
  }
}
</script>

<style  lang='scss' scoped>
#app{
 
}
</style>
