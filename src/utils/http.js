import axios from "axios";

const instance = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 5000
})

instance.interceptors.response.use(
  response => {
    return response ? response.data : response
  },
  err => Promise.reject(new Error(err))
)

export const request = (url, method = '', data) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: data
  })
}