import cookies from 'vue-cookies'      						 //引入cookie模块
const state = {
	//员工属性
	staff:{},
	//登陆相关属性
	user:{},
}

const getters= {
	/*
		获取员工信息
	*/
	getStaff: state => {
			state.staff = JSON.parse(localStorage.getItem('staff'));
			return state.staff;
	}
}
const mutations= {
	/* 
		用户登入：
		1、保存用户相关数据至state与LocalStorage
		2、保存用户token至cookie
	*/
	addLoginUser(state, data){
		localStorage.setItem('staff',JSON.stringify(data.staff))
		localStorage.setItem('user',JSON.stringify(data.user))		
		state.staff = data.staff;
		state.user = data.user;
		//保存token
		//cookies.set("Authorization","Token "+ data.authtoken)
		localStorage.setItem('Authorization',"Token "+ data.authtoken)
		localStorage.setItem('isLogin','true') //只能存储字符串
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