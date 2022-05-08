// 导入定义的所有 action 类型
import * as types from '../actionTypes'
// 导入网络请求工具
import request from "@/utils/http"

// 定义设置频道分类数据到 redux 中的 action
export const setChannels = (payload) => ({ type: types.SET_CHANNELS, payload })
// 定义获取频道分类的 thunk action（异步action）
export const getChannelsAction = () => {
  return async dispatch => {
    // 获取频道分类
    const { data } = await request({
      url: '/v1_0/channels',
      method: 'get'
    })
    // 设置频道分类数据到 redux 中
    dispatch(setChannels(data))
  }
}

// 定义设置文章列表数据到 redux 中的 action
export const setArticle = (payload) => ({ type: types.SET_ARTICLES, payload })
// 定义获取文章列表数据的 thunk action（异步action）
export const getArticleAction = (params) => {
  return async dispatch => {
    // 获取文章列表
    const { data } = await request({
      url: "/v1_0/mp/articles",
      method: "get",
      params
    })
    // 设置文章列表数据到 redux 中
    dispatch(setArticle(data))
  }
}

// 根据 id 删除文章 （thunk action）
export const delArticle = (id) => {
  return async dispatch => {
    await request({
      url: `/v1_0/mp/articles/${id}`,
      method: 'delete'
    })
  }
}

// 添加文章 （thunk action）
export const addArticle = (data, draft = false) => {
  return async dispatch => {
    await request({
      url: `/v1_0/mp/articles?draft=${draft}`,
      method: 'post',
      data
    })
  }
}

// 修改文章 （thunk action）
export const editArticle = (data, draft = false) => {
  return async dispatch => {
    await request.put(`/v1_0/mp/articles/${data.id}?draft=${draft}`, data)
  }
}

// 获取文章详情 （thunk action）
export const getArticle = id => {
  return async dispatch => {
    const data = await request.get('/v1_0/mp/articles/' + id)
    return data
  }
}