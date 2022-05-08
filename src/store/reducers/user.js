// 全部 action 类型
import * as types from '../actionTypes'
// 获取本地 token
import { getToken } from '@/utils/auth'
// token 和用户信息的初始值
const initialState = {
  token: getToken(),
  userInfo: {}
}
// 默认导出 reducer（纯函数）：纯函数表示当一个函数调用多次传递同样的参数，无论如何返回的结果都是一样的结果
export default function user(state = initialState, action) {
  switch (action.type) {
    case types.SET_TOKEN:
      // 更新 token
      return { ...state, token: action.payload }
    case types.UPDATE_USERINFO:
      return { ...state, userInfo: action.payload }
    default:
      return state
  }
}