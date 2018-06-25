import axios from 'axios';

//配置一(不携带Token,主要用于登陆)
//axios.defaults.withCredentials=true; //让ajax携带cookie

export const http_login = axios.create({
})

//配置二(携带Token,主要用于用于后续请求)
export const http = axios.create({
  headers:{
     //Authorization: cookies.get('Authorization')
     Authorization: localStorage.getItem('Authorization')
  },
})

//验证http返回数据
export const checkResData = function(res){
  if(res.data.code !== 10000){
    let errMessage = "";
    for (const key in res.data.errors) {
      errMessage += res.data.errors[key]
    }
    errMessage += res.data.msg;
    //console.log(res);
    console.log(errMessage);
    throw errMessage
  }
}

//在需要使用的时导入不同的axios实例
//import { instance, instance2} from './*/http'
