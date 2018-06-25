import cookies from 'vue-cookies'      						 //引入cookie模块
const state = {
	//员工属性
	staff:{
/* 		
    "id": 20161013  #staff_id,
		"organ_id": 20111001  #员工所属医疗机构id, 若员工无归属机构, 则该字段为空,
		"organ_name": "东都第一人民医院"  #员工所属医疗机构名称,
		"dept_id": 20112312  #所属科室id,
		"dept_name": "信息科"  #部门名称,
		"staff_name": "周传雄"  #职员姓名,
		"title": "信息科主任"  #职员岗位名称,
		"contact": "13628038741"  #联系电话,
		"email": "zcx@nmis.com"  #email地址,
		"created_time": "2017-02-08 16:03:52",
		"user_id": 20101212  #用户ID,
		"username": "yulaishini"  #用户名,
		"group_id": 4001  #权限组id,
		"group_name": " 项目分配人"  #权限组名称,
		"group_cate": "GPA"  #权限组类别, GPA: 项目分配者权限, GNS: 普通员工,
		"is_admin": true  #是否为医疗机构管理员	 
*/	
	},
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