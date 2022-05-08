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

// 根据 id 删除文章
export const delArticle = (id) => {
  return async dispatch => {
    await request({
      url: `/v1_0/mp/articles/${id}`,
      method: 'delete'
    })
  }
}

// 添加文章
export const addArticle = (data, draft = false) => {
  return async dispatch => {
    await request({
      url: `/v1_0/mp/articles?draft=${draft}`,
      method: 'post',
      data
    })
  }
}

// 修改文章
export const editArticle = (data, draft = false) => {
  return async dispatch => {
    await request.put(`/v1_0/mp/articles/${data.id}?draft=${draft}`, data)
  }
}

// 获取文章详情
export const getArticle = id => {
  return async dispatch => {
    const data = await request.get('/v1_0/mp/articles/' + id)
    return data
  }
}