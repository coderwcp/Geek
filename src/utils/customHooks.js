// 自定义hook
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
    dispatch(getChannelsAction())
  }, [dispatch])
  return channels
}

export { useChannels }