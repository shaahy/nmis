 
const state = {
    // 设置属性
    userName:"zhang",
}

const getters= {
    // 获取属性的状态
    getUserName: state=> state.userName
}

const mutations= {
    // 改变属性的状态
    setUserName(state, data){
      state.userName = data;
    } 
}
const actions= {

}
export default {
  namespaced:true,
  state,
  getters,
  actions,
  mutations
}