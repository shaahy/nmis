
import axios from 'axios';
import cookies from 'vue-cookies' 

//配置一
//axios.defaults.withCredentials=true; //让ajax携带cookie

export const instance = axios.create({
  headers:{
    Authorization: cookies.get('Authorization')
  }
})

//验证http返回数据
export const checkResData = function(res){
  if(res.data.code !== 10000){
    let errMessage = "";
    for (const key in res.data.errors) {
      errMessage += res.data.errors[key]
    }
    throw errMessage
  }
}

//在需要使用的时导入不同的axios实例
//import { instance, instance2} from './*/http'
