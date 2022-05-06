// 所有 action 的类型
import * as types from '../actionTypes'

// 导入网络请求模块
import { request } from '@/utils/http'

// 
import { setTokne as setTokenToStorage } from '@/utils/auth'

const login = payload => ({ type: types.SET_TOKEN, payload })

export const setToken = payload => ({ type: types.SET_TOKEN, payload })

export const loginAction = (loginForm) => {
  return async (dispatch) => {
    const { data } = await request('/v1_0/authorizations', 'post', loginForm)
    setTokenToStorage(data)
    dispatch(login(data))
  }
}

