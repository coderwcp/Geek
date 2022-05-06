import ReactDOM from 'react-dom/client'
import './index.scss' // 全局样式

import App from '@/App' // 根组件

import store from '@/store' // 数据共享
import { Provider } from 'react-redux' // 导入链接 redux（数据） 和 view（视图） 之间的提供者（Provider）

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)