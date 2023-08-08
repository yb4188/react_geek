import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Home from "pages/Home";
import ArtList from "pages/ArtList";
import ArtPublish from "pages/ArtPublish";
import styles from "./index.module.scss";
import {
  LogoutOutlined,
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Popconfirm, message } from "antd";
import { removeToken } from "utils/storage";
const { Header, Content, Sider } = Layout;

export default class LayoutComponent extends Component {
  //退出回调
  confirm = () => {
    //localStorage.removeItem("r_token");
    removeToken();
    this.props.history.push("/login");
    message.success("您已经退出登录", 1);
  };
  render() {
    return (
      <div className={styles.layout}>
        {/* 布局容器 */}
        <Layout>
          <Header className="header">
            <div className="logo" />
            <div className="profile">
              <span>用户名</span>
              <span>
                <LogoutOutlined />{" "}
                <Popconfirm
                  title="确定退出登录?"
                  okText="确定"
                  cancelText="取消"
                  onConfirm={this.confirm}
                >
                  退出登录
                </Popconfirm>
              </span>
            </div>
          </Header>
          <Layout>
            <Sider width={200} className="site-layout-background">
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[this.props.location.pathname]}
                defaultOpenKeys={["sub1"]}
                style={{
                  height: "100%",
                  borderRight: 0,
                }}
                // items={items2}
              >
                <Menu.Item key="/home" icon={<HomeOutlined />}>
                  <Link to="/home">数据概览</Link>
                </Menu.Item>
                <Menu.Item key="/home/artlist" icon={<DiffOutlined />}>
                  <Link to="/home/artlist"> 内容管理</Link>
                </Menu.Item>
                <Menu.Item key="/home/artpublish" icon={<EditOutlined />}>
                  <Link to="/home/artpublish">发布文章</Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout
              style={{
                padding: "24px",
              }}
            >
              <Content className="site-layout-background">
                {/* 子路由出口 */}
                <Switch>
                  <Route exact path="/home" component={Home}></Route>
                  <Route path="/home/artlist" component={ArtList}></Route>
                  <Route path="/home/artpublish" component={ArtPublish}></Route>
                </Switch>
                {/* 子路由出口 */}
              </Content>
            </Layout>
          </Layout>
        </Layout>
        {/* 布局容器 */}
      </div>
    );
  }
}
