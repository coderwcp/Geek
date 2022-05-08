// app样式
import "./App.css";
// 导入 路由组件
import { Router, Route, Switch, Redirect } from "react-router-dom";
// 导入自定义路由对象
import customHistory from "./utils/customHistory";
// 路由鉴权组件 校验（判断用户是否登录，来实现跳转登录页面）
import AuthRoute from "./components/AuthRoute";
// 引入 路由懒加载方法 和 占位组件（当组件还未展示时，占位提示作用）
import { lazy, Suspense } from "react";
// 普通导入组件
// import Layout from "./pages/Layout";
// import Login from "./pages/Login";

// 路由懒加载
const Layout = lazy(() => import("@/pages/Layout"));
const Login = lazy(() => import("@/pages/Login"));

export default function App() {
  return (
    // 路由包裹整个app，实现全局管理路由，并使用自定义路由对象
    <Router history={customHistory}>
      {/* 使用路由懒加载占位组件，fallback 要展示的 jsx */}
      <Suspense fallback={<div className="loading"> Loading...</div>}>
        {/* 路由规则默认会匹配多个，Switch开启仅匹配一个路由规则 */}
        <Switch>
          {/* 登录页面路由规则 */}
          <Route path="/login" component={Login} />
          {/* 首页组件，封装路由规则组件来实现路由鉴权 */}
          <AuthRoute path="/home" component={Layout} />
          {/* 默认根地址 重定向到首页 */}
          <Redirect exact path="/" to="/home" />
        </Switch>
      </Suspense>
    </Router>
  );
}
