// 全部 action 类型
import * as types from '../actionTypes'

// 获取本地 token
import { getToken } from '@/utils/auth'

// token 初始值
const initialState = {
  token: getToken(),
  userInfo: {}
}

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