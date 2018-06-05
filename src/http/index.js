import axios from 'axios';

//配置一
const instance = axios.create({
  baseURL: "http://localhost:3000"
})
//配置二
const instance2 = axios.create({
  baseURL: "http://localhost:4000"
})
export default instance
export {instance2}


//在需要使用的时导入不同的axios实例
//import { instance, instance2} from './*/http'
