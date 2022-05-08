// 所有 action 的类型
import * as types from '../actionTypes'
// 导入网络请求模块
import request from '@/utils/http'
// 导入保存 token 方法 
import { setTokne as setTokenToStorage, removeToken } from '@/utils/auth'

// action creator，创建登录保存token的 action 对象
export const setToken = payload => ({ type: types.SET_TOKEN, payload })
// 创建异步action 实现用户登录
export const loginAction = (loginForm) => {
  return async (dispatch) => {
    // 调用登录接口，获取 token
    const { data: { token } } = await request({
      url: '/v1_0/authorizations',
      method: 'post',
      data: loginForm
    })
    // 保存 token 到本地缓存
    setTokenToStorage(token)
    // 分发 action 保存 token 到 redux 中
    dispatch(setToken(token))
  }
}

// 定义设置用户信息到 redux 中的 action
export const updateUserInfo = payload => ({ type: types.UPDATE_USERINFO, payload })
// 定义获取用户信息的 thunk action（异步action）
export const updateUserInfoAction = () => {
  return async (dispatch, getState) => {
    try {
      // 获取用户信息
      const { data } = await request({
        url: '/v1_0/user/profile',
        method: 'get'
      })
      // 保存用户信息到 redux 中
      dispatch(updateUserInfo(data))
    } catch (err) { }
  }
}

// 登出 action
export const logoutAction = () => {
  return (dispatch) => {
    // 清除本地 token
    removeToken()
    // 清除 redux 中的用户信息
    dispatch(setToken(''))
    dispatch(updateUserInfo({}))
  }
}



