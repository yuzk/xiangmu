import axios from 'axios'
import {ElMessage} from 'element-plus'
if(process.env.NODE_ENV=='development'){
  axios.defaults.baseURL = 'http://localhost:3001'
}else{
  // axios.defaults.baseURL = 'http://192.168.9.106:3001'
  axios.defaults.baseURL = 'http://localhost:3001'

}

// axios.defaults.baseURL = 'http://192.168.9.106:3001'||'http://localhost:8080'

//验证Authorization 访问所有api接口 必须有token值 有token值表示通过验证 才可以继续访问接口 
axios.interceptors.request.use(config => {
    // console.log(config)
    config.headers.Authorization = `Bearer ${window.sessionStorage.getItem('token')}`
    // 在最后必须 return config
    return config
  })
axios.interceptors.response.use(config=>{
  if(config.status ==='401') ElMessage(
    {
      showClose: true,
      message: "发生错误!",
      type: "error",
    }
  )
   return config
})

export default axios