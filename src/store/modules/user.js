import cookies from 'vue-cookies'      						 //引入cookie模块
const state = {
	//员工属性
	staff:{
		id: '',							//staff_id
		user: '',						//user_id
		organ_id: '',				//员工所属医疗机构id, 若员工无归属机构, 则该字段为空
		dept: '',						//所属科室id
		name: '',						//职员姓名
		title: '',					//职员岗位名称
		contact: '',				//联系电话
		email: '',					//email地址
		created_time:'',	  //创建时间
		group: '',					//权限组id
		group_name: '',		  //权限组名称
		group_cate: '',			//权限组类别, GPA: 项目分配者权限, GNS: 普通员工
		is_admin:'' 				//是否为医疗机构管理员
	},
	//登陆相关属性
	user:{
		id: '',  					  //用户id,
		username:'',				//user_id
		email: '',					//电子邮件
		phone: '',  	  		//电话号码,
		gender: '',  				//性别: U-未知, M-男, F-女,
		acct_type: '',  		//账号类别, E-显式注册, I-邀请注册, O-第3方登录注册,
		login_count: '',  	//登录次数		
	}
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
		cookies.set("Authorization","Token "+ data.authtoken)
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