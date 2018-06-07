import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state:{
    // 设置属性
    isLogin:false,
    userName:"",
    password:""
  },
  getters:{
    // 获取属性的状态
    getUserName: state=> state.userName
  },
  mutations:{
    // 改变属性的状态
    setUserName(state, data){
      state.userName = data;
    } 
  },
  actions:{
    // 应用mutations
  }
})