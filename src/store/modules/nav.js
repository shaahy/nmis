/* 导航状态管理 */

const state = {
	//顶部导航状态
	isActive:{
		project: false,
		dev: false,
		repos: false,
		manage: false,
	}
}

const getters= {
	getNavStatus: state => {
		return state.isActive;
	}
}
const mutations= {
	setProjectActive: state=>{
		state.isActive.project = true;
		state.isActive.dev = false;
		state.isActive.repos = false;
		state.isActive.manage = false;
	},
	setDevActive: state=>{
		state.isActive.project = false;
		state.isActive.dev = true;
		state.isActive.repos = false;
		state.isActive.manage = false;
	},
	setReposActive: state=>{
		state.isActive.project = false;
		state.isActive.dev = false;
		state.isActive.repos = true;
		state.isActive.manage = false;
	},
	setManageActive: state=>{
		state.isActive.project = false;
		state.isActive.dev = false;
		state.isActive.repos = false;
		state.isActive.manage = true;
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