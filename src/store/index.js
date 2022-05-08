// 导入创建 store 方法
import { legacy_createStore as createStore, applyMiddleware } from "redux";
// 导入根 reducer （合并了所有的 reducer，统一提供给 store ）
import reducers from "@/store/reducers";
// 导入中间件 支持异步action（函数action）来实现网络请求等
import thunk from "redux-thunk";
// 创建 store 仓库
const store = createStore(reducers, applyMiddleware(thunk))
// 监听 store 的变化
store.subscribe(() => {
  // 获取 store 中的状态
  store.getState()
})
// 默认导出 store
export default store