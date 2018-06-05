import axios from 'axios';

//配置一
const instance = axios.create({
  baseURL: "http://localhost:3000"
})

const instance2 = axios.create({
  baseURL: "http://localhost:4000"
})
export default instance
export {instance2}

