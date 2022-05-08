import ReactDOM from 'react-dom/client'
// 全局样式
import './index.scss'
// 根组件
import App from '@/App'
// 数据共享
import store from '@/store'
// 导入链接 redux（数据） 和 view（视图） 之间的提供者（Provider）
import { Provider } from 'react-redux'
// 为 antd 的组件 全局提供配置
import { ConfigProvider } from 'antd'
// antd 组件 中文包
import locale from 'antd/lib/locale/zh_CN'
// 创建容器并渲染组件
ReactDOM.createRoot(document.getElementById('root')).render(
  // 给所有组件提供 store 中的状态，用 store 属性 链接创建的 store
  <Provider store={store}>
    {/* ui组件统一提供配置 */}
    <ConfigProvider locale={locale}>
      {/* 根组件 */}
      <App />
    </ConfigProvider>
  </Provider>
)