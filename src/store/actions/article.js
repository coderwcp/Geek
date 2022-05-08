import * as types from '../actionTypes'

import request from "@/utils/http"


export const setChannels = (payload) => ({ type: types.SET_CHANNELS, payload })

export const getChannelsAction = () => {
  return async dispatch => {
    const { data } = await request({
      url: '/v1_0/channels',
      method: 'get'
    })
    dispatch(setChannels(data))
  }
}

export const setArticle = (payload) => ({ type: types.SET_ARTICLES, payload })

export const getArticleAction = (params) => {
  return async dispatch => {
    // 获取文章列表
    const { data } = await request({
      url: "/v1_0/mp/articles",
      method: "get",
      params
    })
    dispatch(setArticle(data))
  }
}