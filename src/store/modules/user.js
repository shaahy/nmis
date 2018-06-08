import cookies from 'vue-cookies'       //引入cookie模块
const state = {
	isLogin: false,
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
	//暂时没有用到（在action里用）
	isLogin:state =>{
		if(cookies.get('isLogin') == 'true') 
			return true;
		else
			location.href="http://localhost:8080"
	},
	// 获取属性的状态 (注意！！！！这里需要重写，再抽一个函数 isLogin, 再在actions中写方法（先判断登陆状态，再取数据）)
	getStaff: state => {
		if(cookies.get('isLogin') == 'true'){
			state.staff = JSON.parse(localStorage.getItem('staff'));
			return state.staff;
		}else{
			location.href = "http://localhost:8080"
		}
	}
}
const mutations= {
	/* 
		用户登入：
		1、保存用户相关数据至state与LocalStorage
		2、保存用户token至cookie
		3、设置登陆状态为true	
	*/
	addLoginUser(state, data){
		localStorage.setItem('staff',JSON.stringify(data.staff))
		localStorage.setItem('user',JSON.stringify(data.user))		
		state.staff = data.staff;
		state.user = data.user;
		//保存token
		cookies.set("Authentication","Token "+ data.authtoken)
		//设置登陆状态
		cookies.set('isLogin', true)
		state.isLogin = true;
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