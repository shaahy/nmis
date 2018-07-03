const state = {
    
    project:{},//当前操作的项目
    notAssignedCount:'', //待分配的项目数量

}

const getters= {
    getProjectData: state => {
        state.project = JSON.parse(localStorage.getItem('project'));
        return state.project;        
    }
}

const mutations= {
    //保存当前操作的项目
    setProjectData(state, project){
        localStorage.setItem('project',JSON.stringify(project));
        state.project = project;
    },
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