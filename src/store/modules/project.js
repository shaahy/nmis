const state = {
    //当时操作的项目
    project:{},
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