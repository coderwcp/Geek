import { Layout, Menu, Popconfirm, Button } from "antd";

import styles from "./index.module.scss";
import "./index.scss";
// import { removeToken } from "@/utils/auth";

import { Switch, Route, Link, Redirect, useLocation } from "react-router-dom";
import {
  PieChartOutlined,
  SolutionOutlined,
  FileWordOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import Dashboard from "../Dashboard";
import Article from "../Article";
import Publish from "../Publish";
import NotFound from "../NotFound";

const { Header, Sider, Content } = Layout;

export default function GeekLayout() {
  // 使用路由对象，来实现编程式导航
  // const history = useHistory();

  const { pathname } = useLocation();
  // 根据当前地址来判断左侧菜单的选中状态，因为 publish 有可能会带参数，需要单独判断
  let defaultKey = pathname.startsWith("/home/publish")
    ? "/home/publish"
    : pathname;

  // const logout = () => {
  //   removeToken();
  //   history.replace("/login");
  //   console.log("退出登录");
  // };

  const items = [
    {
      label: <Link to="/home/dashboard">数据面板</Link>,
      key: "/home/dashboard",
      icon: <PieChartOutlined />,
    },
    {
      label: <Link to="/home/article">内容管理</Link>,
      key: "/home/article",
      icon: <SolutionOutlined />,
    },
    {
      label: <Link to="/home/publish">发布文章</Link>,
      key: "/home/publish",
      icon: <FileWordOutlined />,
    },
  ];

  return (
    <Layout className={styles.root}>
      <Sider width={148}>
        <div className="logo">GEEK</div>
        <Menu
          selectedKeys={defaultKey}
          mode="inline"
          theme="dark"
          items={items}
        ></Menu>
      </Sider>
      <Layout>
        <Header>
          <span style={{ fontSize: 16 }}>极客园自媒体端</span>
          <div>
            <span>{123}</span>
            <Popconfirm
              placement="bottomRight"
              title="您确认退出极客园自媒体端吗？"
              okText="确认"
              cancelText="取消"
            >
              <Button type="link" icon={<LogoutOutlined />}>
                退出
              </Button>
            </Popconfirm>
          </div>
        </Header>
        <Content>
          <Switch>
            <Route
              path="/home"
              exact
              render={() => <Redirect to="/home/dashboard"></Redirect>}
            ></Route>
            <Route path="/home/dashboard" component={Dashboard}></Route>
            <Route path="/home/article" component={Article}></Route>
            <Route path="/home/publish/:id?" component={Publish}></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}
