// 导入所有 action 的类型
import * as types from '../actionTypes'
// 定义文章相关的初始化数据
const initialState = {
  channels: [],
  page: 1,
  per_page: 10,
  results: [],
  total_count: 0
}
// 定义导出 reducer（纯函数），需要接收两个参数，一个是状态（操作的数据），一个是action（如何操作），函数必须返回数据
export default function article(state = initialState, action) {
  switch (action.type) {
    case types.SET_CHANNELS:
      return { ...state, channels: action.payload }
    case types.SET_ARTICLES:
      return { ...state, ...action.payload }
    default:
      return state
  }
}