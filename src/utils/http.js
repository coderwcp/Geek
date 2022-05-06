// 导入 axios
import axios from "axios";

// 导入 store
import store from "@/store";

// 导入登出action
import { logoutAction } from "@/store/actions/user";

// 导入自定义路由历史
import customHistory from "./customHistory";

// 创建 axios 实例对象
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 5000
})

// 配置请求拦截器
request.interceptors.request.use(
  config => {
    const { user: { token } } = store.getState()
    token && (config.headers.Authorization = 'Bearer ' + token)
    return config
  }
  , err => Promise.reject(new Error(err))
)



request.interceptors.response.use(
  response => {
    return response ? response.data : response
  },
  err => {
    if (err.response.status === 401) {
      // token 过期，调用退出的action清除token 和用户信息
      store.dispatch(logoutAction())
      // 跳转到登录页，这里不能用useHistory，hook只能再函数式组件和自定义hook中使用，需要自己封装一个customHistory
      customHistory.push({
        pathname: '/login', // 跳转到登录页
        state: { from: customHistory.location.pathname } // 记录当前访问的页面路径，再次登录回到当前页面
      })
    }
    return Promise.reject(new Error(err))
  }
)

export default request