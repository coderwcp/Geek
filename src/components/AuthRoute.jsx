// 鉴权组件

import { Route, Redirect } from "react-router-dom";
import { getToken } from "@/utils/auth";

export default function AuthRoute({ component: Component, ...rest }) {
  const token = getToken();
  return (
    <Route
      {...rest}
      render={(prop) => {
        if (token) {
          return <Component></Component>;
        }
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: prop.location.pathname },
            }}
          ></Redirect>
        );
      }}
    ></Route>
  );
}
