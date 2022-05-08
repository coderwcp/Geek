// 导入路由的组件
import { Route, Redirect } from "react-router-dom";
// 导入获取本地 token 方法
import { getToken } from "@/utils/auth";

// 鉴权组件 （接收使用组件时传递的参数）第一个参数表示要渲染的组件，第二个参数接收其他所有属性
export default function AuthRoute({ component: Component, ...rest }) {
  // 获取到 token
  const token = getToken();
  return (
    <Route
      // 统一传递给 路由组件
      {...rest}
      // 渲染的组件（jsx），接收一个函数，函数的参数是当前路由信息
      render={(prop) => {
        // console.log(prop); // 当前路由信息
        if (token) {
          // 如果有 token 则渲染传递过来的组件
          return <Component></Component>;
        }
        // 没有 token 则重定向到登录页面
        return (
          <Redirect
            to={{
              // 需要重定向到的路径
              pathname: "/login",
              // 当需要访问需要 token 的页面而没有访问权限，跳转到登录页之前，而保存需要访问的页面，以便于登录后能返回之前需要访问的页面
              state: { from: prop.location.pathname },
            }}
          ></Redirect>
        );
      }}
    ></Route>
  );
}
