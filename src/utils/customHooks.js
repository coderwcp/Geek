// 自定义hook
// 导入需要使用到的 hook
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getChannelsAction } from "@/store/actions/article"


// 获取 频道分类列表
const useChannels = () => {
  // 从 redux 中获取数据
  const channels = useSelector(state => state.article.channels)
  // 实例化 dispatch 方法
  const dispatch = useDispatch()
  // 页面第一次渲染 和 dispatch 发生变化更新页面
  useEffect(() => {
    // 获取频道分类数据
    dispatch(getChannelsAction())
  }, [dispatch])
  // 返回获取到的频道分来数据
  return channels
}

export { useChannels }