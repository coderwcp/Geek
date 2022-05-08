// 导入合并多个 reducer 的方法
import { combineReducers } from "redux";
// 导入所有 reducer
import user from './user'
import article from "./article";
// 默认导出合并好的根reducer，参数是一个对象，对象的属性名则作为 store 中的数据属性名
export default combineReducers({
  user,
  article
})