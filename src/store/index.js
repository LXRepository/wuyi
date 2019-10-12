
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    roles: JSON.parse(sessionStorage.getItem('store'))?JSON.parse(sessionStorage.getItem('store')):[],
    b: [{ name: '首页', path: 'homepage' }],
    isHere: 0,
    tableindex: 999,
    isLogin: 0,
    token:'',
    refresh:'',
    locktoken:false,
    needloading:true,
    warnform:JSON.parse(sessionStorage.getItem('warnform'))?
    JSON.parse(sessionStorage.getItem('warnform')):
    {fydm:'',logGrade:''}
  },
  getters: {
    personInfo (state) {
      return state.roles + 1
    }
  },
  mutations: {
    SET (state, data) {
      state.b = data
    },
    DELETE (state, data) {
      for (let index = 0; index < state.b.length; index++) {
        if (state.b[index].name == data.name) {
          state.b.splice(index, 1)
          localStorage.setItem('TAB', JSON.stringify(state.b))
        }
      }
    },
    ADDROLES (state, data) {
      state.roles = data
    },
    SETTABLEINDEX (state, data) {
      state.tableindex = data
    },
    SETLOGINSTATUS (state, data) {
      state.isLogin = data
    },
    SETTOKEN(state, data) {
      state.token = data
    },
    FRESHTOKEN(state, data) {
      state.refresh = data
    },
    LOCKTOKEN(state, data) {
      state.locktoken = data
    },
    LOADINGNEED(state, data) {
      state.needloading = data
    },
    SETWARN(state, data) {
      state.warnform = {
        fydm:data.fydm,
        logGrade:data.netstatus==undefined?data.logGrade:data.netstatus
      }
    },
  },
  actions: {
    SET_fun (context, data) {
      context.commit('SET', data)
    },
    DELETE_fun (context, data) {
      context.commit('DELETE', data)
    },
    ADD_roles (context, data) {
      context.commit('ADDROLES', data)
    },
    SET_TABLEINDEX (context, data) {
      context.commit('SETTABLEINDEX', data)
    },
    SET_LOGINSTATUS (context, data) {
      context.commit('SETLOGINSTATUS', data)
    },
    SET_TOKEN (context, data) {
      context.commit('SETTOKEN', data)
    },
    FRESH_TOKEN(context, data) {
      context.commit('FRESHTOKEN', data)
    },
    LOCK_TOKEN(context, data) {
      context.commit('LOCKTOKEN', data)
    },
    LOADING_NEED(context, data) {
      context.commit('LOADINGNEED', data)
    },
    SET_WARN(context, data) {
      context.commit('SETWARN', data)
    },
  }
})

export default store
